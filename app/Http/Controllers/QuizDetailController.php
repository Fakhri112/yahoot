<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
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

class QuizDetailController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function getQuizDetailData(Request $request, $id)
    {

        $quiz = DB::table('quiz_details')->where('id', $id)->get();
        if (count($quiz) == 0) {
            return redirect('404');
        }

        $questions = DB::table('quiz_questions')->where('quiz_detail_id', $id)->get();

        // return dd();
        //  return 
        return Inertia::render('QuizDetail', [
            'title' => $quiz[0]->quiz_name,
            'quiz' => $quiz[0],
            'questions' => $questions
        ]);
    }
}
