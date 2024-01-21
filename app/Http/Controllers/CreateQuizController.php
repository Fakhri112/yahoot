<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\QuizDetail;
use App\Models\QuizQuestion;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\RedirectResponse as HttpFoundationRedirectResponse;

class CreateQuizController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function page()
    {

        $Folders = DB::table('folders')
            ->select('id', 'folder_name', 'parent_folder')
            ->where('user_id', auth()->user()->id)
            ->get();

        $quizzes = DB::table('quiz_details')
            ->select('id', 'quiz_name', 'folder_id')
            ->whereIn('folder_id', $Folders->pluck('id'))
            ->get();

        $formattedItems = $this->formatFolders($Folders);
        $file_result = count($quizzes) == 0 ? json_encode($formattedItems)
            : $this->assignFileToFolder($formattedItems, $quizzes);

        return Inertia::render('CreateQuiz/Index', [
            'userFolder' => $file_result,
            'pageTitle' => 'Create Quiz'
        ]);
    }

    public function submitCreateQuizData(Request $request)
    {

        $quiz_details = $request->input('quizSettingData');
        if (preg_match('/^data:image\/\w+;base64,/', $quiz_details['thumbnail']) === 0) {
            return back()->withErrors("Thumbnail required!");
        }

        $request->validate([
            $quiz_details['thumbnail'] => ['string'],
        ]);

        $base64thumbnail = $quiz_details['thumbnail'];
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64thumbnail));


        $directory_path = '/user_quiz/' .  bin2hex(random_bytes(8));
        File::makeDirectory(public_path() . $directory_path);
        $thumbnail = $directory_path . '/thumbnail.jpg';
        File::put(public_path() . $thumbnail, $imageData);

        $quiz_detail = new QuizDetail();


        $quiz_detail->quiz_name = $quiz_details['quiz_title'];
        $quiz_detail->visibility = $quiz_details['visibility'];
        $quiz_detail->quiz_description = $quiz_details['quiz_description'];
        $quiz_detail->thumbnail = $thumbnail;
        $quiz_detail->total_players = 0;
        $quiz_detail->user_id = $request->user()->id;
        $quiz_detail->folder_id = $quiz_details['path_id'];
        $quiz_detail->save();



        $questionDatas = $request->input('questionData');
        foreach ($questionDatas as $questionData) {
            if (preg_match('/^data:image\/\w+;base64,/', $questionData['image_file']) === 0) {
                return back()->withErrors("There is a question with no image. Check it First!");
            }
            Validator::make($questionData, [
                'question' => 'required',
                'duration' => 'required',
                'correct_answer' => 'required',
                'answer.A' => 'required',
                'answer.B' => 'required',
                'answer.C' => 'required',
                'answer.D' => 'required',
            ], [
                'question.required' => 'There is a question with no question title. Check it First!',
                'duration.required' => 'There is a question with no duration. Check it First!',
                'correct_answer.required' => 'There is a question with no selected correct answer title. Check it First!',
                'answer.A.required' => 'There is a question with no answer in option A. Check it First!',
                'answer.B.required' => 'There is a question with no answer in option B. Check it First!',
                'answer.C.required' => 'There is a question with no answer in option C. Check it First!',
                'answer.D.required' => 'There is a question with no answer in option D. Check it First!',
            ]);

            $base64QuestionImage = $questionData['image_file'];
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64QuestionImage));
            $question_image = $directory_path . '/' . $questionData['id'] . '.jpg';
            File::put(public_path() . $question_image, $imageData);

            $quiz_question = new QuizQuestion();


            $quiz_question->question_title = $questionData['question'];
            $quiz_question->question_image = $question_image;
            $quiz_question->A = $questionData['answer']['A'];
            $quiz_question->B = $questionData['answer']['B'];
            $quiz_question->C = $questionData['answer']['C'];
            $quiz_question->D = $questionData['answer']['D'];
            $quiz_question->correct_answer = $questionData['correct_answer'];
            $quiz_question->duration = $questionData['duration'];
            $quiz_question->quiz_detail_id = $quiz_detail->id;
            $quiz_question->save();
        }

        return Redirect::to('user');
    }

    private function formatFolders($items, $parentId = null)
    {
        $result = [];

        foreach ($items as $item) {
            if (optional($item)->parent_folder == $parentId || ($parentId === null && optional($item)->parent_folder === null)) {
                $formattedItem = [
                    'id' => optional($item)->id,
                    'name' => optional($item)->folder_name ?? optional($item)->quiz_name,
                    'type' => 'folder'
                ];


                if (isset(optional($item)->folder_name) && $items->where('parent_folder', optional($item)->id)->count() > 0) {
                    $formattedItem['children'] = $this->formatFolders($items, optional($item)->id);
                } else {
                    $formattedItem['children'] = [];
                }


                $result[] = $formattedItem;
            }
        }

        return $result;
    }

    private function assignFileToFolder($formattedFolders, $quizzes)
    {
        function Backtrack_Algorithm($folders, $quiz)
        {
            foreach ($folders as $folder) {
                $checkChildren = isset($folder['children']) ? count($folder['children']) : 0;
                if (isset($folder['children']) && $folder['id'] != $quiz->folder_id) {
                    $state = Backtrack_Algorithm($folder['children'], $quiz);
                    if (isset($state)) {
                        $getFoldersCount = count($folder['children']);
                        for ($i = 0; $i < $getFoldersCount; $i++) {
                            if ($folder['children'][$i]['id'] == optional($state)['id']) {
                                $folder['children'][$i] = $state;
                                break;
                            }
                        }
                        return $folder;
                    }
                } else if (
                    optional($folder)['id'] != $quiz->folder_id
                    && $checkChildren == 0
                ) {
                    return NULL;
                } else if ($folder['id'] == $quiz->folder_id) {
                    $insertData = [
                        'name' => optional($quiz)->quiz_name,
                        'type' => 'file'
                    ];
                    $folder['children'][] = $insertData;
                    $getFoldersCount = count($folders);
                    for ($i = 0; $i < $getFoldersCount; $i++) {
                        if ($folders[$i]['id'] == $folder['id']) {
                            $folders[$i] = $folder;
                            break;
                        }
                    }
                    return $folder;
                }
            }
        }

        $result = $formattedFolders;
        foreach ($quizzes as $quiz) {

            $assignQuiz[0] = Backtrack_Algorithm($result, $quiz);
            $result = $assignQuiz;
        }

        return json_encode($assignQuiz);
    }
}
