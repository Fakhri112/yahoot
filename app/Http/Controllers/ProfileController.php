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

        $request->validate([
            'name' => 'required|string|max:255|alpha_dash',
            'email' => 'required|email',
        ]);
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if (preg_match('/^data:image\/\w+;base64,/', $request->input('profile_pic')) === 1) {

            $request->validate([
                'profile_pic' => [
                    'required',
                    'string',
                ],
            ]);

            $base64Image = $request->input('profile_pic');
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
            $filename = time() . '.jpg';
            $profile_pic_db_name = '/profile_pic/' . $filename;

            File::put(public_path() . $profile_pic_db_name, $imageData);
        } else if (preg_match('/\/profile_pic\//', $request->input('profile_pic')) === 1) {
            $profile_pic_db_name =  $request->input('profile_pic');
        } else {
            $profile_pic_db_name = '';
            $query = DB::select("SELECT profile_pic from users WHERE email = :userEmail", ['userEmail' => $request->user()->email]);
            if (file_exists(public_path() . $query[0]->profile_pic) && $query[0]->profile_pic) {
                unlink(public_path() . $query[0]->profile_pic);
            }
        }

        $request->user()->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'profile_pic' => $profile_pic_db_name
        ]);

        return Redirect::to('user/setting');
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

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
