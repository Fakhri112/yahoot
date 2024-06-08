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

        if ($id == auth()->user()->id) {
            $totalQuizzes = $quizzes->where('user_id', auth()->user()->id)->count();
            $totalPlayersAllQuiz =  $quizzes->where('user_id', auth()->user()->id)->sum('total_players');
            $totalPlaysAllQuiz = $quizzes->where('user_id', auth()->user()->id)->sum('total_plays');
        } else {
            $totalQuizzes = $quizzes->where('user_id', $id)->where('visibility', 'public')->count();
            $totalPlayersAllQuiz =  $quizzes->where('user_id', $id)->where('visibility', 'public')->sum('total_players');
            $totalPlaysAllQuiz = $quizzes->where('user_id', $id)->where('visibility', 'public')->sum('total_plays');
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
                
            if ($id != auth()->user()->id) $quizzes = $quizzes->where('visibility', 'public');
          
            $queryResult = $quizzes->get();
            return $queryResult;
        
    }
}
