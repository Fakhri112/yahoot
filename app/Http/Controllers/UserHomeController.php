<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
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
use Symfony\Component\HttpFoundation\RedirectResponse as HttpFoundationRedirectResponse;

class UserHomeController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function page($id)
    {
                // ABSTRAKSI INI WEH MASAK REDUNDAN

        $quizzes = DB::table('quiz_details');
        $totalQuizzes = DB::table('quiz_details');
        $totalPlayersAllQuiz = DB::table('quiz_details');
        $totalPlaysAllQuiz = DB::table('quiz_details');

        if ($id == auth()->user()->id) {
            $totalQuizzes = $totalQuizzes->where('user_id', auth()->user()->id)->count();
            $totalPlayersAllQuiz =  $totalPlayersAllQuiz->where('user_id', auth()->user()->id)->sum('total_players');
            $totalPlaysAllQuiz = $totalPlaysAllQuiz->where('user_id', auth()->user()->id)->sum('total_plays');
        } else {
            $totalQuizzes = $totalQuizzes->where('user_id', $id)->count();
            $totalPlayersAllQuiz =  $totalPlayersAllQuiz->where('user_id', $id)->sum('total_players');
            $totalPlaysAllQuiz = $totalPlaysAllQuiz->where('user_id', $id)->sum('total_plays');
        }

        $user = User::find($id);
        return Inertia::render(('UserHome'), [
            'totalQuizzes' => $totalQuizzes,
            'totalPlayersAllQuiz' => $totalPlayersAllQuiz,
            'totalPlaysAllQuiz' => $totalPlaysAllQuiz,
            'quizzesData' => $quizzes,
            'user' => $user,
            'pageTitle' => $user->name == auth()->user()->name ? 'My Profile' : $user->name 
        ]);
    }

    public function getQuizzes (Request $request, $id){
      
            $offset = $request->input('offset');
            $limit = $request->input('limit');
        
            $quizzes = DB::table('quiz_details')
                ->where('user_id', $id)
                ->orderBy('updated_at', 'desc')
                ->offset($offset)
                ->limit($limit);    
          
            $queryResult = $quizzes->get();
            return $queryResult;
        
    }
}
