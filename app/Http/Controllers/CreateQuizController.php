<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;

class CreateQuizController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function getQuizData()
    {

        $Folders = DB::table('folders')
            ->select('id', 'folder_name', 'parent_folder')
            ->where('user_id', auth()->user()->id)
            ->get();

        $quizzes = DB::table('quiz_details')
            ->select('id', 'quiz_name', 'folder_id')
            ->whereIn('folder_id', $Folders->pluck('id'))
            ->get();

        $formattedItems = $this->formatFolders($Folders);
        $file_result = count($quizzes) == 0 ? json_encode($formattedItems)
            : $this->assignFileToFolder($formattedItems, $quizzes);

        return Inertia::render('CreateQuiz/Index', [
            'userFolder' => $file_result,
            'pageTitle' => 'Create Quiz'
        ]);
    }

    public function submitCreateQuizData()
    {
    }

    private function formatFolders($items, $parentId = null)
    {
        $result = [];

        foreach ($items as $item) {
            if (optional($item)->parent_folder == $parentId || ($parentId === null && optional($item)->parent_folder === null)) {
                $formattedItem = [
                    'id' => optional($item)->id,
                    'name' => optional($item)->folder_name ?? optional($item)->quiz_name,
                    'type' => 'folder'
                ];

                // Check if it's a folder and has children
                if (isset(optional($item)->folder_name) && $items->where('parent_folder', optional($item)->id)->count() > 0) {
                    // Recursively format children
                    $formattedItem['children'] = $this->formatFolders($items, optional($item)->id);
                } else {
                    // Add an empty array for folders without children
                    $formattedItem['children'] = [];
                }


                $result[] = $formattedItem;
            }
        }

        return $result;
    }

    private function assignFileToFolder($formattedFolders, $quizzes)
    {
        function Backtrack_Algorithm($folders, $quiz)
        {
            foreach ($folders as $folder) {
                $checkChildren = isset($folder['children']) ? count($folder['children']) : 0;
                if (isset($folder['children']) && $folder['id'] != $quiz->folder_id) {
                    $state = Backtrack_Algorithm($folder['children'], $quiz);
                    if (isset($state)) {
                        $getFoldersCount = count($folder['children']);
                        for ($i = 0; $i < $getFoldersCount; $i++) {
                            if ($folder['children'][$i]['id'] == optional($state)['id']) {
                                $folder['children'][$i] = $state;
                                break;
                            }
                        }
                        return $folder;
                    }
                } else if (
                    optional($folder)['id'] != $quiz->folder_id
                    && $checkChildren == 0
                ) {
                    return NULL;
                } else if ($folder['id'] == $quiz->folder_id) {
                    $insertData = [
                        'name' => optional($quiz)->quiz_name,
                        'type' => 'file'
                    ];
                    $folder['children'][] = $insertData;
                    $getFoldersCount = count($folders);
                    for ($i = 0; $i < $getFoldersCount; $i++) {
                        if ($folders[$i]['id'] == $folder['id']) {
                            $folders[$i] = $folder;
                            break;
                        }
                    }
                    return $folder;
                }
            }
        }

        $result = $formattedFolders;
        foreach ($quizzes as $quiz) {

            $assignQuiz[0] = Backtrack_Algorithm($result, $quiz);
            $result = $assignQuiz;
        }

        return json_encode($assignQuiz);
    }

    // Helper function to find a folder by its id
}
