<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Folder;
use App\Models\Host;
use App\Models\QuizDetail;
use App\Models\QuizQuestion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;


class LibraryController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function page(Request $request)
    {
        return Inertia::render(('Library/Index'), [
            'pageTitle' => 'My Library'
        ]);
    }
    public function pageWithId(Request $request, $id)
    {

        $path = $this->getPathDirectory($id, auth()->user()->id);

        return Inertia::render(('Library/Index'), [
            'pageTitle' => end($path)->folder_name,
            'folderId' => $id,
            'path' => $path,
        ]);
    }

    public function pageRecent()
    {
        return Inertia::render(('Library/Index'), [
            'pageTitle' => 'Recent',
            'recent' => true,
        ]);
    }

    public function pageFavorites()
    {

        return Inertia::render(('Library/Index'), [
            'pageTitle' => 'Favorites',
            'favorites' => true,
        ]);
    }


    public function getQuizzes(Request $request)
    {

        $orderBy = $request->input('orderBy');
        $offset = $request->input('offset');
        $folderId = $request->input('folderId');
        $limit = $request->input('limit');
        $isRecentQuiz = $request->input('isRecentQuiz');
        $search = $request->input('search');
        $quizzes = DB::table('quiz_details')
            ->where('user_id', $request->user()->id)
            ->orderBy($orderBy[0], $orderBy[1])
            ->offset($offset)
            ->limit($limit);

        if (!$isRecentQuiz) {
            $quizzes = $quizzes->where('folder_id',  !$folderId ?
                $this->getRootFolderId($request->user()->id) : $folderId);
        }

        if ($search != '') {
            $quizzes = $quizzes->where('quiz_title', 'iLIKE',  '%' . $search . '%');
        }
        $queryResult = $quizzes->get();
        return $queryResult;
    }
    public function getFolders(Request $request)
    {
        $folderId = $request->input('folderId');
        $orderBy = $request->input('orderBy');
        $folders = DB::table('folders')
            ->where('parent_folder', $folderId ? $folderId : $this->getRootFolderId($request->user()->id))
            ->orderBy($orderBy[0], $orderBy[1])
            ->get();
        return $folders;
    }

    public function getFullDirectory(Request $request)
    {
        $Folders = DB::table('folders')
            ->select('id', 'folder_name', 'parent_folder')
            ->where('user_id', auth()->user()->id)
            ->get();

        $quizzes = DB::table('quiz_details')
            ->select('id', 'quiz_title', 'folder_id')
            ->whereIn('folder_id', $Folders->pluck('id'))
            ->get();

        $formattedItems = $this->formatFolders($Folders);
        $file_result = count($quizzes) == 0 ? ($formattedItems)
            : $this->assignFileToFolder($formattedItems, $quizzes);


        return $file_result[0];
    }

    public function addNewFolder(Request $request)
    {
        $request->validate([
            'newFolder' => 'required'
        ]);

        $parent_id = $request->input('folderId');
        $folder = new Folder();
        $folder->folder_name = $request->input('newFolder');
        $folder->parent_folder = !$parent_id
            ? $this->getRootFolderId($request->input('user_id'))
            : $parent_id;
        $folder->user_id = $request->input('user_id');
        $folder->save();

        return response()->json([
            'status' => 200,
            'message' => 'New Folder has successfully created',
        ]);
    }
    public function move(Request $request)
    {
        $selectedQuizzes = $request->input('selectedQuizzes');
        $selectedFolder = $request->input('selectedFolder');
        $target_folder = $request->input('target_folder');
        if ($selectedQuizzes) {
            foreach ($selectedQuizzes as $selectedQuiz) {
                DB::table('quiz_details')->where('id', $selectedQuiz)
                    ->update([
                        'folder_id' => $target_folder,
                    ]);
            }
        }
        if ($selectedFolder) {
            Folder::where('id', $selectedFolder)
                ->update([
                    'parent_folder' => $target_folder,

                ]);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Success',
        ]);
    }

    public function rename(Request $request)
    {
        $type = $request->input('type');
        $id = $request->input('id');
        $name = $request->input('name');

        if ($type == 'quiz') {
            QuizDetail::where('id', $id)
                ->update([
                    'quiz_title' => $name,
                    'updated_at' => Carbon::now()
                ]);
        }
        if ($type == 'folder') {
            Folder::where('id', $id)
                ->update([
                    'folder_name' => $name,
                    'updated_at' => Carbon::now()
                ]);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Success',
        ]);
    }

    public function duplicate(Request $request)
    {

        $selectedQuizzes = $request->input('selectedQuizzes');
        $selectedFolder = $request->input('selectedFolder');
        $pathId = $request->input('target_folder');

        if ($selectedFolder) {
            $Folders = DB::table('folders')
                ->select('id', 'folder_name', 'parent_folder')
                ->where('user_id', auth()->user()->id)
                ->get();

            $quizzes = DB::table('quiz_details')
                ->whereIn('folder_id', $Folders->pluck('id'))
                ->get();

            $formattedItems = $this->formatFolders($Folders);
            $file_result = count($quizzes) == 0 ? ($formattedItems)
                : $this->assignFileToFolder($formattedItems, $quizzes);

            $folder_to_duplicate = [$this->getChildrenWithId($file_result, $selectedFolder)];

            $this->duplicateFolderAndQuiz($folder_to_duplicate, [], $pathId);
        }

        if ($selectedQuizzes) {
            $this->duplicateQuiz([], $pathId, $selectedQuizzes);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Success',
        ]);
    }

    public function delete(Request $request)
    {
        $selectedQuizzes = $request->input('selectedQuizzes');
        $selectedFolder = $request->input('selectedFolder');

        if ($selectedFolder) {
            $Folders = DB::table('folders')
                ->select('id', 'folder_name', 'parent_folder')
                ->where('user_id', auth()->user()->id)
                ->get();

            $formattedItems = $this->formatFolders($Folders);
            $folders_structure = [$this->getChildrenWithId($formattedItems, $selectedFolder)];
            $this->deleteFolderAndQuiz($folders_structure);
        }

        if ($selectedQuizzes) {
            foreach ($selectedQuizzes as $quiz_id) {
                $this->deleteQuiz(null,  $quiz_id);
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Success',
        ]);
    }

    public function getPathDirectory($folderId, $userId)
    {
        $path = DB::select(
            "WITH RECURSIVE FolderHierarchy AS (
            SELECT * FROM folders WHERE id = ? AND user_id = ?
            UNION ALL
            SELECT folders.* FROM folders
            JOIN FolderHierarchy ON CAST(folders.id AS text) = FolderHierarchy.parent_folder
          )
          SELECT id, folder_name FROM FolderHierarchy WHERE parent_folder IS NOT NULL
          UNION
          SELECT id, folder_name FROM FolderHierarchy 
          ORDER BY id",
            [
                $folderId,
                $userId
            ]
        );

        return $path;
    }

    private function duplicateQuiz($data = [], $pathId, $quiz_id)
    {

        if (count($data) == 0) {

            $quiz = DB::table('quiz_details')
                ->where('id', $quiz_id)
                ->get()->first();
            $data = json_decode(json_encode($quiz), true);
        }
        $quiz_questions_db = DB::table('quiz_questions')
            ->where('quiz_detail_id', $data['id'])->get();

        preg_match(
            '/\/user_quiz\/' . auth()->user()->id . '\/(\w+)\/thumbnail\.jpg/',
            $data['thumbnail'],
            $thumbnail
        );

        $directory_path = '/user_quiz/' . auth()->user()->id . '/' .  bin2hex(random_bytes(8));
        $sourceFolder = public_path() . '/user_quiz/' . auth()->user()->id . '/' . $thumbnail[1];
        $destinationFolder = public_path() . $directory_path;

        File::makeDirectory($destinationFolder);
        $this->duplicateUserQuizImage($sourceFolder, $destinationFolder);

        $quiz_title = $quiz_id ? 'Duplicate of ' . $data['quiz_title'] : $data['name'];

        $quiz_detail = new QuizDetail();
        $quiz_detail->quiz_title = $quiz_title;
        $quiz_detail->quiz_description = $data['quiz_description'];
        $quiz_detail->visibility = $data['visibility'];
        $quiz_detail->thumbnail = $directory_path . '/thumbnail.jpg';
        $quiz_detail->total_players = 0;
        $quiz_detail->total_plays = 0;
        $quiz_detail->user_id = auth()->user()->id;
        $quiz_detail->folder_id = $pathId;
        $quiz_detail->save();

        foreach ($quiz_questions_db as $index => $quiz_question_db) {
            $quiz_question = new QuizQuestion();
            $quiz_question->quiz_detail_id = $quiz_detail->id;
            $quiz_question->question_title = $quiz_question_db->question_title;
            $quiz_question->question_image = $directory_path . '/' . $index + 1 . '.jpg';
            $quiz_question->A = $quiz_question_db->A;
            $quiz_question->B = $quiz_question_db->B;
            $quiz_question->C = $quiz_question_db->C;
            $quiz_question->D = $quiz_question_db->D;
            $quiz_question->correct_answer = $quiz_question_db->correct_answer;
            $quiz_question->duration = $quiz_question_db->duration;
            $quiz_question->save();
        }

        return true;
    }

    private function deleteQuiz($folder_id,  $quiz_id)
    {

        if (($folder_id)) {
            $quizzes = DB::table('quiz_details')
                ->where('folder_id', $folder_id)
                ->get();
        }
        if ($quiz_id) {
            $quizzes = DB::table('quiz_details')
                ->where('id', $quiz_id)
                ->get();
        }
        $datas = json_decode(json_encode($quizzes), true);
        foreach ($datas as $data) {
            Favorite::where('quiz_detail_id',  $data['id'])->delete();
            Host::where('quiz_detail_id',  $data['id'])->delete();
            preg_match(
                '/\/user_quiz\/' . auth()->user()->id . '\/(\w+)\/thumbnail\.jpg/',
                $data['thumbnail'],
                $thumbnail
            );

            $sourceFolder = public_path() . '/user_quiz/' . auth()->user()->id . '/' . $thumbnail[1];
            $this->deleteImageFolder($sourceFolder);
            QuizQuestion::where('quiz_detail_id',  $data['id'])->delete();
            $quiz = QuizDetail::findOrFail($data['id']);
            $quiz->delete();
        }

        return true;
    }

    private  function duplicateFolderAndQuiz($folders_structure, $id = [], $pathId)
    {
        foreach ($folders_structure as $item) {
            $checkChildren = isset($item['children']) ? count($item['children']) : 0;
            if ($item['type'] == 'folder') {

                $folder = new Folder();
                $folder->folder_name = count($id) == 0 ? 'Duplicate of ' . $item['name'] : $item['name'];
                $folder->user_id = auth()->user()->id;
                $folder->parent_folder = count($id) == 0 ? $pathId : end($id);
                $folder->save();
                if ($checkChildren == 0) {
                    continue;
                }
                array_push($id, $folder->id);
                if ($this->duplicateFolderAndQuiz($item['children'], $id, $pathId)) {
                    array_pop($id);
                    continue;
                }
            }
            if ($item['type'] == 'quiz') {
                $this->duplicateQuiz($item, end($id), null);
                continue;
            }
        }
        return true;
    }

    private  function deleteFolderAndQuiz($folders_quizzes_data)
    {
        foreach ($folders_quizzes_data as $item) {
            $checkChildren = isset($item['children']) ? count($item['children']) : 0;
            if ($this->deleteQuiz($item['id'], null)) {
                $folder = Folder::findOrFail($item['id']);
                $folder->delete();
            }
            if ($checkChildren == 0)  continue;
            $this->deleteFolderAndQuiz($item['children']);
        }
        return true;
    }

    private function deleteImageFolder($folderPath)
    {
        if (!is_dir($folderPath)) {
            return false; // Not a directory, nothing to delete
        }

        $files = scandir($folderPath);
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $filePath = $folderPath . DIRECTORY_SEPARATOR . $file;

                if (is_dir($filePath)) {
                    // Recursive call to delete subfolder
                    $this->deleteImageFolder($filePath);
                } else {
                    unlink($filePath); // Delete file
                }
            }
        }

        rmdir($folderPath); // Delete the main folder after its contents are deleted
        return true;
    }

    private function duplicateUserQuizImage($sourceFolder, $destinationFolder)
    {
        // Get the list of files in the source folder
        $files = scandir($sourceFolder);

        // Remove . and .. from the list
        $files = array_diff($files, array('..', '.'));

        // Loop through the files and copy them to the destination folder
        foreach ($files as $file) {
            $sourcePath = $sourceFolder . '/' . $file;
            $destinationPath = $destinationFolder . '/' . $file;

            // Use copy function to copy the file
            if (is_file($sourcePath)) {
                copy($sourcePath, $destinationPath);
            }
        }
    }

    private function getChildrenWithId($folders, $id)
    {
        foreach ($folders as $folder) {
            $checkChildren = isset($folder['children']) ? count($folder['children']) : 0;

            if (isset($folder['children']) && $folder['id'] != $id) {

                $state = $this->getChildrenWithId($folder['children'], $id);
                if (isset($state)) {
                    return $state;
                }
            } else if (
                optional($folder)['id'] != $id
                && $checkChildren == 0
            ) {
                return NULL;
            } else if ($folder['id'] == $id) {
                return $folder;
            }
        }
    }

    private function getRootFolderId($userId)
    {
        $RootFolderId = DB::table('folders')
            ->where('user_id', $userId)
            ->whereNull('parent_folder')->first()->id;
        return $RootFolderId;
    }
    private function formatFolders($items, $parentId = null)
    {
        $result = [];

        foreach ($items as $item) {
            if (optional($item)->parent_folder == $parentId || ($parentId === null && optional($item)->parent_folder === null)) {
                $formattedItem = [
                    'id' => optional($item)->id,
                    'name' => optional($item)->folder_name ?? optional($item)->quiz_title,
                    'type' => 'folder'
                ];


                if (isset(optional($item)->folder_name) && $items->where('parent_folder', optional($item)->id)->count() > 0) {
                    $formattedItem['children'] = $this->formatFolders($items, optional($item)->id);
                } else {
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
                        'id' => optional($quiz)->id,
                        'name' => optional($quiz)->quiz_title,
                        'visibility' => optional($quiz)->visibility,
                        'quiz_description' => optional($quiz)->quiz_description,
                        'thumbnail' => optional($quiz)->thumbnail,
                        'type' => 'quiz'
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
        return ($assignQuiz);
    }
}
