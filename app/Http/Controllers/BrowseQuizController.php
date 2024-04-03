<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class BrowseQuizController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function page(Request $request)
    {
        return Inertia::render(('BrowseQuiz/Index'), [
            'pageTitle' => 'Browse Quiz',
        ]);
    }

    public function getQuizzes(Request $request)
    {

        $orderBy = $request->input('orderBy');
        $offset = $request->input('offset');
        $limit = $request->input('limit');
        $search = $request->input('search');
        $quizzes = DB::table('quiz_details')->join('users', 'quiz_details.user_id', '=', 'users.id')
            ->select('quiz_details.id AS quiz_id', 'users.id AS user_id', 'profile_pic', 'thumbnail', 'total_players', 'name', 'quiz_title')
            ->where('visibility', 'public')
            ->orderBy($orderBy[0], $orderBy[1])
            ->offset($offset)
            ->limit($limit);



        if ($search != '') {
            $quizzes = $quizzes->where('quiz_title', 'iLIKE',  '%' . $search . '%');
        }
        $queryResult = $quizzes->get();
        return $queryResult;
    }
}
