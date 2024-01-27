<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\QuizDetail;
use App\Models\QuizQuestion;
use Carbon\Carbon;
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

class CreatorQuizController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function page()
    {
        $RootFolderId = DB::table('folders')
            ->where('user_id', auth()->user()->id)
            ->whereNull('parent_folder')->first()->id;

        return Inertia::render('CreatorQuiz/Index', [
            'rootFolder' => $RootFolderId,
            'pageTitle' => 'Create Quiz'
        ]);
    }

    public function editQuizPage($id)
    {
        try {

            $quiz_detail = DB::table('quiz_details')
                ->where('id', $id)->where('user_id', auth()->user()->id)->get()->first();

            if (!$quiz_detail) {
                return redirect('404');
            }

            $quiz_questions = DB::table('quiz_questions')
                ->where('quiz_detail_id', $quiz_detail->id)->get();
            $path = (new LibraryController)
                ->getPathDirectory($quiz_detail->folder_id,  auth()->user()->id);
            $pathName = '';
            foreach ($path as $key => $value) {
                $pathName = $pathName . $value->folder_name . (optional($path)[$key + 1] ? '/' : '');
            }

            return Inertia::render('CreatorQuiz/Index', [
                'quizDetail' => $quiz_detail,
                'quizQuestions' => $quiz_questions,
                'pageTitle' => 'Edit Quiz',
                'path' => $pathName
            ]);
        } catch (\Throwable $th) {
            return redirect('404');
        }
    }

    public function submitCreateQuizData(Request $request)
    {

        $quiz_detail_data = $request->input('quizSettingData');
        $question_datas = $request->input('questionData');
        if (preg_match('/^data:image\/\w+;base64,/', $quiz_detail_data['thumbnail']) === 0) {
            return back()->withErrors("Thumbnail required!");
        }

        $Quiz_Validator = Validator::make(
            $quiz_detail_data,
            [
                'thumbnail' => 'string',
                'quiz_title' =>  'required|string|max:100',
                'quiz_description' => 'required|string|max:255',
            ],
        );

        if ($Quiz_Validator->fails()) {
            return redirect()->back()->withErrors($Quiz_Validator)->withInput();
        }

        foreach ($question_datas as $key => $question_data) {
            $Question_Validator = Validator::make($question_data, [
                'question' => 'required',
                'duration' => 'required',
                'correct_answer' => 'required',
                'answer.A' => 'required',
                'answer.B' => 'required',
                'answer.C' => 'required',
                'answer.D' => 'required',
                'image_file' => 'required'
            ], [
                'question.required' => 'Question number ' . $key + 1 . ' has no question title. Add it First!',
                'duration.required' => 'Question number ' . $key + 1 . ' has no duration. Add it First!',
                'correct_answer.required' => 'Question number ' . $key + 1 . ' has no selected correct answer title. Add it First!',
                'answer.A.required' => 'Question number ' . $key + 1 . ' has no answer in option A. Add it First!',
                'answer.B.required' => 'Question number ' . $key + 1 . ' has no answer in option B. Add it First!',
                'answer.C.required' => 'Question number ' . $key + 1 . ' has no answer in option C. Add it First!',
                'answer.D.required' => 'Question number ' . $key + 1 . ' has no answer in option D. Add it First!',
                'image_file.required' => "Question number " . $key + 1 . " has no image. Add it first!"
            ]);
            if ($Question_Validator->fails()) {
                return redirect()->back()->withErrors($Question_Validator)->withInput();
            }
        }

        $base64thumbnail = $quiz_detail_data['thumbnail'];
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64thumbnail));
        $directory_path = '/user_quiz/' .  bin2hex(random_bytes(8));
        File::makeDirectory(public_path() . $directory_path);
        $thumbnail = $directory_path . '/thumbnail.jpg';
        File::put(public_path() . $thumbnail, $imageData);

        $quiz_detail = new QuizDetail();
        $quiz_detail->quiz_name = $quiz_detail_data['quiz_title'];
        $quiz_detail->visibility = $quiz_detail_data['visibility'];
        $quiz_detail->quiz_description = $quiz_detail_data['quiz_description'];
        $quiz_detail->thumbnail = $thumbnail;
        $quiz_detail->total_players = 0;
        $quiz_detail->user_id = $request->user()->id;
        $quiz_detail->folder_id = $quiz_detail_data['path_id'];
        $quiz_detail->save();

        foreach ($question_datas as $question_data) {


            $base64QuestionImage = $question_data['image_file'];
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64QuestionImage));
            $question_image = $directory_path . '/' . $question_data['id'] . '.jpg';
            File::put(public_path() . $question_image, $imageData);

            $quiz_question = new QuizQuestion();


            $quiz_question->question_title = $question_data['question'];
            $quiz_question->question_image = $question_image;
            $quiz_question->A = $question_data['answer']['A'];
            $quiz_question->B = $question_data['answer']['B'];
            $quiz_question->C = $question_data['answer']['C'];
            $quiz_question->D = $question_data['answer']['D'];
            $quiz_question->correct_answer = $question_data['correct_answer'];
            $quiz_question->duration = $question_data['duration'];
            $quiz_question->quiz_detail_id = $quiz_detail->id;
            $quiz_question->save();
        }

        return Redirect::to('user')->with('message', 'Quiz Created!');;
    }


    public function submitUpdateQuizData(Request $request)
    {

        $quiz_detail_data = $request->input('quizSettingData');
        $question_datas = $request->input('questionData');
        $unchanged_image = $request->input('unchangedImage');


        if ($quiz_detail_data['thumbnail'] == null) {
            return back()->withErrors("Thumbnail required!");
        }
        $Quiz_Validator = Validator::make(
            $quiz_detail_data,
            [
                'thumbnail' => 'string',
                'quiz_title' =>  'required|string|max:100',
                'quiz_description' => 'required|string|max:255',
            ],
        );

        if ($Quiz_Validator->fails()) {
            return redirect()->back()->withErrors($Quiz_Validator)->withInput();
        }

        foreach ($question_datas as $key => $question_data) {
            if ($question_data['image_file'] == null) {
                return back()->withErrors("There is a question with no image. Add it first!");
            }
            $Question_Validator = Validator::make($question_data, [
                'question' => 'required',
                'duration' => 'required',
                'correct_answer' => 'required',
                'answer.A' => 'required',
                'answer.B' => 'required',
                'answer.C' => 'required',
                'answer.D' => 'required',
                'image_file' => 'required'
            ], [
                'question.required' => 'There is a question with no question title. Check it First!',
                'duration.required' => 'There is a question with no duration. Check it First!',
                'correct_answer.required' => 'There is a question with no selected correct answer title. Check it First!',
                'answer.A.required' => 'There is a question with no answer in option A. Check it First!',
                'answer.B.required' => 'There is a question with no answer in option B. Check it First!',
                'answer.C.required' => 'There is a question with no answer in option C. Check it First!',
                'answer.D.required' => 'There is a question with no answer in option D. Check it First!',
                'image_file.required' => "There is a question with no image. Add it first!"
            ]);
            if ($Question_Validator->fails()) {
                return redirect()->back()->withErrors($Question_Validator)->withInput();
            }
        }
        $thumbnail = '';

        if (str_contains($quiz_detail_data['thumbnail'], '/user_quiz/')) {
            $thumbnail = $quiz_detail_data['thumbnail'];
        }


        if (preg_match('/^data:image\/\w+;base64,/', $quiz_detail_data['thumbnail']) != 0) {
            unlink(public_path() . $quiz_detail_data['prev_thumbnail']);

            $base64thumbnail = $quiz_detail_data['thumbnail'];
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64thumbnail));


            $thumbnail = $quiz_detail_data['prev_thumbnail'];
            File::put(public_path() . $thumbnail, $imageData);
        }

        $quiz_detail = QuizDetail::find($quiz_detail_data['id']);

        $quiz_detail->quiz_name = $quiz_detail_data['quiz_title'];
        $quiz_detail->visibility = $quiz_detail_data['visibility'];
        $quiz_detail->quiz_description = $quiz_detail_data['quiz_description'];
        $quiz_detail->thumbnail = $thumbnail;
        $quiz_detail->folder_id = $quiz_detail_data['path_id'];
        $quiz_detail->updated_at = Carbon::now();
        $quiz_detail->save();

        $get_current_quiz_questions = DB::table('quiz_questions')
            ->select('id', 'question_image')->where('quiz_detail_id', $quiz_detail_data['id'])->get();

        foreach ($get_current_quiz_questions as $key => $value) {
            if (!in_array($value->question_image, $unchanged_image)) {
                unlink(public_path() . $value->question_image);
            }
            QuizQuestion::find($value->id)->delete();
        }

        foreach ($question_datas as $key => $question_data) {


            preg_match("/\/user_quiz\/[a-f0-9]+\//", $quiz_detail_data['prev_thumbnail'], $get_image_folder_id);
            $question_image =  $get_image_folder_id[0] . $key + 1 . '.jpg';
            error_log($question_image);


            if (str_contains($question_data['image_file'], '/user_quiz/')) {
                rename(public_path() . $question_data['image_file'], public_path() . $question_image);
            }

            if (preg_match('/^data:image\/\w+;base64,/', $question_data['image_file']) != 0) {
                $base64QuestionImage = $question_data['image_file'];
                $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64QuestionImage));
                File::put(public_path() . $question_image, $imageData);
            }

            $quiz_question = new QuizQuestion();

            $quiz_question->question_title = $question_data['question'];
            $quiz_question->question_image = $question_image;
            $quiz_question->A = $question_data['answer']['A'];
            $quiz_question->B = $question_data['answer']['B'];
            $quiz_question->C = $question_data['answer']['C'];
            $quiz_question->D = $question_data['answer']['D'];
            $quiz_question->correct_answer = $question_data['correct_answer'];
            $quiz_question->duration = $question_data['duration'];
            $quiz_question->quiz_detail_id = $quiz_detail->id;
            $quiz_question->save();
        }
        return Redirect::to('user')->with('message', 'Quiz Updated!');;

        // dd($request->all());
    }
}
