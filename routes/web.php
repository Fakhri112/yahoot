<?php

use App\Http\Controllers\CreateQuizController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Termwind\Components\Raw;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'title' => 'Yahoot',
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/result', function () {
    return Inertia::render('FinalResult');
});


Route::get('/quiz-on-screen', function () {
    return Inertia::render('QuizOnScreen');
});


Route::get('/room', function () {
    return Inertia::render('WaitingRoom');
});

Route::get('/play', function () {
    return Inertia::render('EnterPin', [
        'title' => 'Play Yahoot',
    ]);
});

Route::get('/test', function () {
    return Inertia::render('Welcome_copy');
});

Route::middleware('auth')->group(function () {
    Route::get('/browse', function () {
        return Inertia::render('Search', [
            'title' => 'Browse Games',
        ]);
    });

    Route::get('/detail', function () {
        return Inertia::render('QuizDetail');
    });



    Route::get('/create',  [CreateQuizController::class, 'getFolders']);


    Route::prefix('user')->group(function () {
        Route::get('', function () {
            return Inertia::render('UserHome');
        });
        Route::get('/library', function () {
            return Inertia::render('Library');
        });
        Route::get('/reports', function () {
            return Inertia::render('Reports');
        });
        Route::get('/setting', function () {
            return Inertia::render('Setting');
        });
        Route::prefix('/reports/{id}')->group(function () {
            Route::get('', function () {
                return Inertia::render('QuizReport');
            });
            Route::get('players', function () {
                return Inertia::render('QuizReportPlayers');
            });
        });
    });
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
