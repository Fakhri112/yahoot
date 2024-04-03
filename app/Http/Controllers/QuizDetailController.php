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
    public function page(Request $request, $id)
    {

        try {
            $quiz = DB::table('quiz_details')->where('id', $id)->get();
            if (
                count($quiz) == 0 ||
                ($quiz[0]->visibility == 'private'
                    && $quiz[0]->user_id != auth()->user()->id)
            ) {

                return redirect('404');
            }
            $questions = DB::table('quiz_questions')->where('quiz_detail_id', $id)->get();
            $favorite = DB::table('favorites')->where('quiz_detail_id',  $id)->where('user_id', auth()->user()->id)->get();
            $user = DB::table('users')->where('id', $quiz[0]->user_id)->first();


            return Inertia::render('QuizDetail/Index', [
                'title' => $quiz[0]->quiz_title,
                'quiz' => $quiz[0],
                'questions' => $questions,
                'favorite' => count($favorite) != 0,
                'user' => $user
            ]);
        } catch (\Throwable $th) {
            error_log('catchme');
            return redirect('404');
        }
    }
}
