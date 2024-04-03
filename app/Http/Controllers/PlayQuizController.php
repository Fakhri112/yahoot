<?php

namespace App\Http\Controllers;

use App\Events\QuizWebsocket;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Host;
use App\Models\Player;
use App\Models\PlayerLog;
use App\Models\PlayerSummaryResult;
use App\Models\QuizDetail;
use App\Models\QuizQuestion;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\RedirectResponse as HttpFoundationRedirectResponse;

class PlayQuizController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function waitingRoom($quizId)
    {
        try {

            $quiz = DB::table('quiz_details')->where('id', $quizId)->get();
            if (count($quiz) == 0) {
                return redirect('404');
            }
            $host = new Host();
            $host->quiz_detail_id = $quizId;
            $host->save();

            $gamePin = str_pad($host->game_pin, 7, "0", STR_PAD_LEFT);

            Cache::put($gamePin, 'unlock');

            $questions = DB::table('quiz_questions')->where('quiz_detail_id', $quizId)->get();
            return Inertia::render('Host/Index', [
                'pin' =>  $gamePin,
                'quiz' => $quiz[0],
                'questions' => $questions
            ]);
        } catch (\Throwable $th) {
            return redirect('404');
        }
    }

    public function deletePin($gamePin)
    {
        error_log($gamePin);
        $host = Host::find($gamePin);
        $host->delete();
        Cache::forget($gamePin);
        return true;
    }

    public function checkPin(Request $request)
    {
        $gamePin = $request->input('gamePin');

        $results = Host::join('quiz_details', 'quiz_details.id', '=', 'hosts.quiz_detail_id')
            ->select('thumbnail', 'game_pin')
            ->where('game_pin', $gamePin)
            ->get();

        if (isset($results[0]) && Cache::get($gamePin) == 'unlock') {
            return $results[0];
        }
        return false;
    }

    public function submitPlayersData(Request $request)
    {
        $quizId = $request->input('quizId');
        $date = $request->input('date');
        $playersFinalResult = $request->input('playersFinalResult');
        $gamePin = $request->input('gamePin');
        $timeLapse = $request->input('timeLapse');
        $playerSummaryResult = $request->input('playerSummaryResult');


        $host = Host::find($gamePin);
        $host->delete();
        Cache::forget($gamePin);

        $quiz_detail_uuid = Str::uuid();
        $quiz = DB::table('quiz_details')->select('total_plays', 'total_players')->where('id', $quizId)->get();
        if (count($quiz) == 0) {
            return Redirect::to('user')->with('error', 'Unable to save. Quiz has been deleted by owner');
        }

        $quizDetailInsert = QuizDetail::find($quizId);
        $quizDetailInsert->total_players = $quiz[0]->total_plays + count($playersFinalResult[0]);
        $quizDetailInsert->total_plays = $quiz[0]->total_players + 1;
        $quizDetailInsert->save();

        preg_match(
            '/\/user_quiz\/' .  $quizDetailInsert->user_id . '\/(\w+)\/thumbnail\.jpg/',
            $quizDetailInsert->thumbnail,
            $thumbnail
        );

        $directory_path = '/report_quiz/' . auth()->user()->id . '/' .   bin2hex(random_bytes(8));
        $sourceFolder = public_path() . '/user_quiz/' . $quizDetailInsert->user_id  . '/' . $thumbnail[1];
        $destinationFolder = public_path() . $directory_path;

        File::makeDirectory($destinationFolder);
        $this->duplicateUserQuizImage($sourceFolder, $destinationFolder);

        QuizDetail::select("*")
            ->where('id', $quizId)
            ->each(function ($data) use ($quizId, $date, $timeLapse, $directory_path, $quiz_detail_uuid, $playersFinalResult) {
                $dataReport = $data->replicate();
                $dataReport->setTable('quiz_detail_for_reports');
                $dataReport->id =  $quiz_detail_uuid;
                $dataReport->thumbnail =  $directory_path . '/thumbnail.jpg';
                $dataReport->total_players = count($playersFinalResult[0]);
                $dataReport->user_id = auth()->user()->id;
                $dataReport->time = round($timeLapse / 1000);
                $dataReport->original_quiz_detail_id = $quizId;
                $dataReport->created_at =  $date;
                $dataReport->updated_at =  Carbon::now();
                $dataReport->save();
            });


        $questionId = [];

        QuizQuestion::select(
            'duration',
            'question_image',
            'question_title',
            'A',
            'B',
            'C',
            'D',
            'correct_answer'
        )
            ->where('quiz_detail_id', $quizId)
            ->each(function ($datas, $key) use ($directory_path, $quiz_detail_uuid, &$questionId) {
                $dataReport = $datas->replicate();
                $dataReport->question_image = $directory_path . '/' . $key + 1 . '.jpg';
                $dataReport->created_at =  Carbon::now();
                $dataReport->updated_at =  Carbon::now();
                $dataReport->setTable('quiz_question_for_reports');
                $dataReport->quiz_detail_for_report_id = $quiz_detail_uuid;
                $dataReport->save();
                array_push($questionId, $dataReport->id);
            });


        $playerNameCollection = [];
        foreach ($playerSummaryResult as $key => $playerResult) {
            $playerSummary = new PlayerSummaryResult();
            $playerSummary->player_name = $playerResult['name'];
            $playerSummary->rank = $key + 1;
            $playerSummary->final_points = $playerResult['totalScore'];
            $playerSummary->save();
            $insertData = [
                'name' => $playerResult['name'],
                'id' =>  $playerSummary->id
            ];
            $playerNameCollection[] = $insertData;
        }

        foreach ($playersFinalResult as $questionNumber => $playersResult) {
            foreach ($playersResult as $key => $playerResult) {
                $playerLog = new PlayerLog();
                $playerLog->quiz_question_for_report_id = $questionId[$questionNumber];
                $playerLog->time = $playerResult['time'];
                $playerLog->correct_incorrect = $playerResult['correct_incorrect'];
                $playerLog->answered = $playerResult['answer'];
                $playerLog->points = $playerResult['score'];
                $playerLog->player_summary_result_id =  $playerNameCollection[array_search(
                    $playerResult['name'],
                    array_column($playerNameCollection, 'name')
                )]['id'];

                $playerLog->save();
            }
        }

        return Redirect::to('/user/' . auth()->user()->id);
    }

    public function toggleLock(Request $request)
    {
        $gamePin = $request->input('gamePin');
        if (Cache::get($gamePin) == 'unlock') {
            Cache::put($gamePin, 'lock');
            return 'lock';
        }
        Cache::put($gamePin, 'unlock');
        return 'unlock';
    }

    private function duplicateUserQuizImage($sourceFolder, $destinationFolder)
    {
        // Get the list of files in the source folder
        $files = scandir($sourceFolder);

        // Remove . and .. from the list
        $files = array_diff($files, array('..', '.'));

        // Loop through the files and copy them to the destination folder
        foreach ($files as $file) {
            $sourcePath = $sourceFolder . '/' . $file;
            $destinationPath = $destinationFolder . '/' . $file;

            // Use copy function to copy the file
            if (is_file($sourcePath)) {
                copy($sourcePath, $destinationPath);
            }
        }
    }
}
