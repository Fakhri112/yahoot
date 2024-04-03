<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Favorite;
use App\Models\Folder;
use App\Models\Host;
use App\Models\PlayerLog;
use App\Models\PlayerSummaryResult;
use App\Models\QuizDetail;
use App\Models\QuizDetailForReport;
use App\Models\QuizQuestion;
use App\Models\QuizQuestionForReport;
use App\Models\User;
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
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        if ($request)
            $request->validate([
                'name' => 'required|string|max:255|alpha_dash|' .   Rule::unique('users')->ignore(auth()->user()->id),
                'email' => 'required|email|' .  Rule::unique('users')->ignore(auth()->user()->id),
            ]);
        if ($request->user()->isDirty('email'))    $request->user()->email_verified_at = null;
        if (preg_match('/^data:image\/\w+;base64,/', $request->input('profile_pic')) === 1) {

            $request->validate([
                'profile_pic' => [
                    'required',
                    'string',
                ],
            ]);

            $base64Image = $request->input('profile_pic');
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
            $filename = auth()->user()->id . '.jpg';
            $profile_pic_db_name = '/profile_pic/' . $filename;

            File::put(public_path() . $profile_pic_db_name, $imageData);
        } else if (preg_match('/\/profile_pic\//', $request->input('profile_pic')) === 1) {
            $profile_pic_db_name =  $request->input('profile_pic');
        } else {
            $profile_pic_db_name = '';
            $query = DB::select("SELECT profile_pic from users WHERE id = :userId", ['userId' => auth()->user()->id]);
            if (file_exists(public_path() . $query[0]->profile_pic) && $query[0]->profile_pic) {
                unlink(public_path() . $query[0]->profile_pic);
            }
        }


        $request->user()->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'profile_pic' => $profile_pic_db_name
        ]);

        return Redirect::to('user/setting')->with('message', 'Success!');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();
        $quizzes = QuizDetail::where('user_id', $user->id)->select('id')->get();
        $quizReports = QuizDetailForReport::where('user_id', $user->id)->get();

        foreach ($quizReports as $quizReport) {
            $playerLogs = QuizDetailForReport
                ::join(
                    'quiz_question_for_reports',
                    'quiz_detail_for_reports.id',
                    '=',
                    'quiz_question_for_reports.quiz_detail_for_report_id'
                )
                ->join('player_logs', "quiz_question_for_reports.id", "=", "player_logs.quiz_question_for_report_id")
                ->where('quiz_detail_for_reports.id', "=", $quizReport['id'])
                ->select('player_logs.player_summary_result_id')
                ->get()->unique("player_summary_result_id")->all();
            $questionReports = QuizQuestionForReport::where('quiz_detail_for_report_id',  $quizReport['id'])->get();

            foreach ($questionReports as $questionReport) {
                PlayerLog::where('quiz_question_for_report_id',  $questionReport->id)->delete();
            }
            foreach ($playerLogs as $playerLog) {
                PlayerSummaryResult::findOrFail($playerLog["player_summary_result_id"]);
            }
            QuizQuestionForReport::where('quiz_detail_for_report_id',  $quizReport['id'])->delete();
        }

        QuizDetailForReport::where('user_id', $user->id)->delete();

        foreach ($quizzes as $quiz) {
            Favorite::where('quiz_detail_id',  $quiz['id'])->delete();
            Host::where('quiz_detail_id',  $quiz['id'])->delete();
            QuizQuestion::where('quiz_detail_id',  $quiz['id'])->delete();
        }

        QuizDetail::where('user_id', $user->id)->delete();
        Folder::where('user_id', $user->id)->delete();
        $this->deleteImageFolder(public_path() . '/user_quiz/' . auth()->user()->id . '/');
        $this->deleteImageFolder(public_path() . '/report_quiz/' . auth()->user()->id . '/');
        if (file_exists(public_path() . $user->profile_pic) && $user->profile_pic) {
            unlink(public_path() . $user->profile_pic);
        }

        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    private function deleteImageFolder($folderPath)
    {
        if (!is_dir($folderPath)) {
            return false; // Not a directory, nothing to delete
        }

        $files = scandir($folderPath);
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $filePath = $folderPath . DIRECTORY_SEPARATOR . $file;

                if (is_dir($filePath)) {
                    // Recursive call to delete subfolder
                    $this->deleteImageFolder($filePath);
                } else {
                    unlink($filePath); // Delete file
                }
            }
        }

        rmdir($folderPath); // Delete the main folder after its contents are deleted
        return true;
    }
}
