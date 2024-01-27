<?php

use App\Http\Controllers\CreatorQuizController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\UserHomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizDetailController;
use App\Http\Controllers\WsController;
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

Route::get('/testws',  [WsController::class, 'test']);



Route::middleware('auth')->group(function () {
    Route::get('/browse', function () {
        return Inertia::render('Search', [
            'title' => 'Browse Games',
        ]);
    });


    Route::get('/detail/{id}', [QuizDetailController::class, 'page']);

    Route::get('/create',  [CreatorQuizController::class, 'page']);
    Route::post('/create',  [CreatorQuizController::class, 'submitCreateQuizdata'])->name('create.submit');
    Route::get('/edit/{id}',  [CreatorQuizController::class, 'editQuizPage']);
    Route::patch('/edit',  [CreatorQuizController::class, 'submitUpdateQuizData'])->name('create.update');


    Route::prefix('user')->group(function () {

        Route::get('',  [UserHomeController::class, 'page']);



        Route::get('/library', [LibraryController::class, 'page']);

        Route::get('/library/get-full-directory', [LibraryController::class, 'getFullDirectory']);
        Route::get('/library/recent', [LibraryController::class, 'pageRecent']);
        Route::get('/library/{id}', [LibraryController::class, 'pageWithId']);


        Route::post('/library/folders', [LibraryController::class, 'getFolders']);
        Route::post('/library/quizzes', [LibraryController::class, 'getQuizzes']);
        Route::post('/library/new-folder/', [LibraryController::class, 'addNewFolder'])->name('library.newfolder');
        Route::post('/library/move', [LibraryController::class, 'move'])->name('library.movefolder');
        Route::post('/library/rename', [LibraryController::class, 'rename'])->name('library.rename');
        Route::post('/library/duplicate/', [LibraryController::class, 'duplicate'])->name('library.duplicate');
        Route::post('/library/delete/', [LibraryController::class, 'delete'])->name('library.delete');


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
