<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Favorite;
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

class FavoriteController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function submit($quizId)
    {
        if (!$quizId) return response()->json(['error' => true, 'data' => []], 404);
        $favorite = new Favorite();
        $favorite->quiz_detail_id = $quizId;
        $favorite->user_id = auth()->user()->id;
        $favorite->save();
        return response()->json([
            'status' => 200,
            'message' => 'Added to Favorite',
        ]);
    }
    public function delete($quizId)
    {
        if (!$quizId) return response()->json(['error' => true, 'data' => []], 404);
        Favorite::where('quiz_detail_id',  $quizId)->where('user_id', auth()->user()->id)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Removed from Favorite',
        ]);
    }

    public function getData(Request $request)
    {
        $orderBy = $request->input('orderBy');
        $offset = $request->input('offset');
        $limit = $request->input('limit');
        $search = $request->input('search');
        $favoritesData = Favorite::join('quiz_details', 'quiz_details.id', '=', 'favorites.quiz_detail_id')
            ->join('users', 'quiz_details.user_id', '=', 'users.id')
            ->where('favorites.user_id', auth()->user()->id)
            ->orderBy('quiz_details.' . $orderBy[0], $orderBy[1])
            ->offset($offset)
            ->limit($limit);

        if ($search != '') {
            $favoritesData = $favoritesData->where('quiz_details.quiz_title', 'LIKE',  '%' . $search . '%');
        }
        $queryResult = $favoritesData->get();
        return $queryResult;
    }
}
