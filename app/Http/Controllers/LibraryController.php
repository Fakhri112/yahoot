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

class LibraryController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function getLibraryData(Request $request)
    {

        $quizzes = DB::table('quiz_details')->where('user_id', $request->user()->id)->get();
        // return dd($quizzes);
        return Inertia::render(('Library/Index'), [
            'quizzesData' => $quizzes,
            'pageTitle' => 'My Library'
        ]);
    }
}
