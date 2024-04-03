<?php

use App\Events\QuizWebsocket;
use App\Http\Controllers\BrowseQuizController;
use App\Http\Controllers\CreateQuizController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\PlayQuizController;
use App\Http\Controllers\UserHomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizDetailController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\WsController;
use App\Models\Host;
use App\Models\QuizQuestion;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
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


Route::prefix('play')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Player/Index', [
            'title' => 'Play Yahoot',
        ]);
    });

    Route::post('/checkpin', [PlayQuizController::class, 'checkPin']);
});



Route::middleware('auth')->group(function () {

    Route::get('/detail/{id}', [QuizDetailController::class, 'page']);

    Route::prefix('/browse')->group(function () {
        Route::get('', [BrowseQuizController::class, 'page']);
        Route::post('', [BrowseQuizController::class, 'getQuizzes']);
    });
    Route::prefix('/play')->group(function () {
        Route::get('quizid={quiz_id}', [PlayQuizController::class, 'waitingRoom']);
        Route::post('submit-players-data', [PlayQuizController::class, 'submitPlayersData'])->name('players.data.submit');
        Route::patch('toggle-lock', [PlayQuizController::class, 'toggleLock']);
        Route::delete('delete-pin/{gamePin}', [PlayQuizController::class, 'deletePin']);
    
    });
    Route::prefix('/favorites')->group(function () {
        Route::post('',  [FavoriteController::class, 'getData']);
        Route::post('{quizId}',  [FavoriteController::class, 'submit'])->name('favorite.submit');
        Route::delete('{quizId}',  [FavoriteController::class, 'delete']);
    });
    Route::prefix('/create')->group(function () {
        Route::get('',  [CreateQuizController::class, 'page']);
        Route::post('',  [CreateQuizController::class, 'submitCreateQuizdata'])->name('create.submit');
    });
    Route::prefix('/edit')->group(function () {
        Route::get('{id}',  [CreateQuizController::class, 'editQuizPage']);
        Route::patch('edit',  [CreateQuizController::class, 'submitUpdateQuizData'])->name('create.update');
    });

    Route::prefix('user')->group(function () {

        Route::prefix('/library')->group(function () {
            Route::get('', [LibraryController::class, 'page']);
            Route::get('get-full-directory', [LibraryController::class, 'getFullDirectory']);
            Route::get('recent', [LibraryController::class, 'pageRecent']);
            Route::get('favorites', [LibraryController::class, 'pageFavorites']);
            Route::get('{id}', [LibraryController::class, 'pageWithId']);
    
            
            Route::post('folders', [LibraryController::class, 'getFolders']);
            Route::post('quizzes', [LibraryController::class, 'getQuizzes']);
            Route::post('new-folder/', [LibraryController::class, 'addNewFolder'])->name('library.newfolder');
            Route::patch('move', [LibraryController::class, 'move'])->name('library.movefolder');
            Route::patch('rename', [LibraryController::class, 'rename'])->name('library.rename');
            Route::post('duplicate/', [LibraryController::class, 'duplicate'])->name('library.duplicate');
            Route::put('delete/', [LibraryController::class, 'delete'])->name('library.delete');
    
        });
    
        Route::prefix('/reports')->group(function () {
            Route::get('', [ReportController::class, 'reportListPage']);
            Route::post('', [ReportController::class, 'getReportsList']);
            Route::patch('rename', [ReportController::class, 'renameReport']);
            Route::put('delete/', [ReportController::class, 'deleteReport']);
            Route::prefix('{id}')->group(function () {
                Route::get('summary', [ReportController::class, 'summary']);
                Route::get('players', [ReportController::class, 'playersList']);
                Route::post('players/detail', [ReportController::class, 'checkPlayerDetail']);
                Route::get('questions', [ReportController::class, 'questionsList']);
                Route::post('questions/detail', [ReportController::class, 'checkQuestionDetail']);
            });
        });

        Route::prefix('/profile')->group(function () {
            Route::get('', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::post('', [ProfileController::class, 'update'])->name('profile.update');
            Route::delete('', [ProfileController::class, 'destroy'])->name('profile.destroy');
        });

        Route::get('/setting', function () {
            return Inertia::render('Setting/Index', ['pageTitle'=>'Setting']);
        });

        Route::prefix('/{id}')->group(function () {
            Route::get('',  [UserHomeController::class, 'page']);
            Route::post('', [UserHomeController::class, 'getQuizzes']);
        });

       
    });
});

require __DIR__ . '/auth.php';
