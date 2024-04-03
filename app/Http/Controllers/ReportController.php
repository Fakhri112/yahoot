<?php

namespace App\Http\Controllers;

use App\Models\PlayerLog;
use App\Models\PlayerSummaryResult;
use App\Models\QuizDetailForReport;
use App\Models\QuizQuestionForReport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function reportListPage()
    {
        return Inertia::render('Report/ReportsList/Index', ['pageTitle'=> 'Reports']);
    }

    public function getReportsList(Request $request)
    {
        $orderBy = $request->input('orderBy');
        $quizReport = DB::table('quiz_detail_for_reports')
            ->select('id', 'quiz_title', 'total_players', 'created_at')
            ->where('user_id', auth()->user()->id)->orderBy($orderBy[0], $orderBy[1])->get();

        return $quizReport;
    }

    public function renameReport(Request $request)
    {
        $id = $request->input('id');
        $name = $request->input('name');
        QuizDetailForReport::where('id', $id)
            ->update([
                'quiz_title' => $name,
                'updated_at' => Carbon::now()
            ]);
        return response()->json([
            'status' => 200,
            'message' => 'Success',
        ]);
    }

    public function deleteReport(Request $request)
    {
        $ids =  $request->input('selectedQuizReports');

        foreach ($ids as $id) {
            $playerLogs = QuizDetailForReport
                ::join(
                    'quiz_question_for_reports',
                    'quiz_detail_for_reports.id',
                    '=',
                    'quiz_question_for_reports.quiz_detail_for_report_id'
                )
                ->join('player_logs', "quiz_question_for_reports.id", "=", "player_logs.quiz_question_for_report_id")
                ->where('quiz_detail_for_reports.id', "=", $id)
                ->select('player_logs.player_summary_result_id')
                ->get()->unique("player_summary_result_id")->all();
            $questionReports = DB::table('quiz_question_for_reports')->where('quiz_detail_for_report_id',  $id)->get();

            foreach ($questionReports as $questionReport) {
                PlayerLog::where('quiz_question_for_report_id',  $questionReport->id)->delete();
            }
            foreach ($playerLogs as $playerLog) {
                PlayerSummaryResult::findOrFail($playerLog["player_summary_result_id"]);
            }
            QuizQuestionForReport::where('quiz_detail_for_report_id',  $id)->delete();
            $quiz = QuizDetailForReport::findOrFail($id);
            $quiz->delete();
            preg_match(
                '/\/report_quiz\/' .  $quiz->user_id . '\/(\w+)\/thumbnail\.jpg/',
                $quiz->thumbnail,
                $thumbnail
            );
            $sourceFolder = public_path() . '/report_quiz/'  . $quiz->user_id . '/' . $thumbnail[1];
            $this->deleteImageFolder($sourceFolder);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Success',
        ]);
    }

    public function summary($id)
    {

        $getDBData = $this->dbData($id);
        $playerLogs = $getDBData['playerLogs'];
        $quizQuestion = $playerLogs->unique("question_id");
        $quizReport = $getDBData["quizReport"];
        $getTotalFalseAnswer = count(array_filter($playerLogs->toArray(), function ($val) {
            return $val['correct_incorrect'] == false;
        }));
        $getTotalPlayerLogs = count($playerLogs->toArray());
        $getTotalPlayerPerQuestion = $getTotalPlayerLogs / count($quizQuestion->toArray());
        $summaryPercentage = floor((($getTotalPlayerLogs - $getTotalFalseAnswer) / $getTotalPlayerLogs) * 100);

        // DIFFICULT QUESTION
        $difficultQuestion = [];
        $difficultQuestionContainer = [];
        foreach ($playerLogs as $key => $playerLog) {
            $key = $key + 1;
            array_push($difficultQuestionContainer, $playerLog->toArray());
            if (count($difficultQuestionContainer) == $getTotalPlayerPerQuestion) {
                foreach ($difficultQuestionContainer as $index => $value) {
                    if (!$value['time']) {
                        $difficultQuestionContainer[$index]['time'] =  $playerLog->duration;
                    }
                }
                $getQuestionTotalFalseAnswer = count(array_filter($difficultQuestionContainer, function ($val) {
                    return $val['correct_incorrect'] != 1;
                }));
                $questionPercentage =  (($getTotalPlayerPerQuestion - $getQuestionTotalFalseAnswer)
                    / $getTotalPlayerPerQuestion) * 100;
                $averageTime = array_sum(array_column($difficultQuestionContainer, 'time')) / $getTotalPlayerPerQuestion;
                $getNullAnswer = count(array_filter($difficultQuestionContainer, function ($val) {
                    return $val['answered'] == '';
                }));

                $getAAnswer = count(array_filter($difficultQuestionContainer, function ($val) {
                    return $val['answered'] == 'A';
                }));
                $getBAnswer = count(array_filter($difficultQuestionContainer, function ($val) {
                    return $val['answered'] == 'B';
                }));
                $getCAnswer = count(array_filter($difficultQuestionContainer, function ($val) {
                    return $val['answered'] == 'C';
                }));
                $getDAnswer = count(array_filter($difficultQuestionContainer, function ($val) {
                    return $val['answered'] == 'D';
                }));
                if ($questionPercentage <= 33) {
                    error_log($averageTime);
                    $insertData = [
                        'question_id' => $playerLog->question_id,
                        'question_image' => $playerLog->question_image,
                        'question_title' => $key / $getTotalPlayerPerQuestion . $playerLog->question_title,
                        'question_percentage' => $questionPercentage,
                        'player_answered' => count($difficultQuestionContainer) - $getNullAnswer,
                        'question_avg_answer_time' => $averageTime,
                        'duration' => $playerLog->duration,
                        'answer_list'   => [
                            'A' =>         $playerLog->A,
                            'B' =>         $playerLog->B,
                            'C' =>         $playerLog->C,
                            'D' =>         $playerLog->D,
                        ],
                        'answer_total' => [
                            'A' =>         $getAAnswer,
                            'B' =>         $getBAnswer,
                            'C' =>         $getCAnswer,
                            'D' =>         $getDAnswer,
                            'no_answer' => $getNullAnswer,
                        ],
                        'columns' =>  [
                            [
                                "Header" => "Questions",
                                "accessor" => "question_title",
                            ],
                            [
                                "Header" => "Answered",
                                "accessor" => "answered",
                            ],
                            [
                                "Header" => "Correct/incorrect",
                                "accessor" => "correct_incorrect",
                            ],
                            [
                                "Header" => "Time",
                                "accessor" => "time",
                            ],
                            [
                                "Header" => "Points",
                                "accessor" => "points",
                            ],
                        ]
                    ];
                    $difficultQuestion[] = $insertData;
                }
                $difficultQuestionContainer = [];
            }
        }
        // DIDNT FINISH
        $didntFinishPlayerDatas = [];
        foreach ($playerLogs->sortBy("rank")->values()->all() as $key => $playerLog) {
            if (!$playerLog['answered'] && !in_array($playerLog['player_name'], array_column($didntFinishPlayerDatas, 'player_name'))) {
                $getQuestionTotalFalseAnswer = count(array_filter($playerLogs->toArray(), function ($val) use ($playerLog) {
                    return $val['correct_incorrect'] != 1 && $val['player_name'] == $playerLog['player_name'];
                }));
                $questionsDataPercentage =  ((count($quizQuestion) - $getQuestionTotalFalseAnswer)
                    / count($quizQuestion)) * 100;
                $unansweredCount = count(array_filter($playerLogs->toArray(), function ($val) use ($playerLog) {
                    return !$val['answered'] && $val['player_name'] == $playerLog['player_name'];
                }));
                $insertData = [
                    'unanswered' => $unansweredCount,
                    'final_score' => $playerLog['final_points'],
                    'correct_answer' => $questionsDataPercentage,
                    'rank' => $playerLog['rank'],
                    'player_count' => $getTotalPlayerPerQuestion,
                    'player_name' => $playerLog['player_name'],
                    'player_id' =>  $playerLog['player_id'],
                ];

                array_push($didntFinishPlayerDatas, $insertData);
            }
        }

        // return $quizReport;
        return Inertia::render('Report/ReportDetail/Summary', [
            'quizReportId' => $id,
            'difficultQuestion' => $difficultQuestion,
            'didntFinish' => $didntFinishPlayerDatas,
            'summaryPerentage' => $summaryPercentage,
            'quizTitle' => $quizReport->quiz_title,
            'originalQuizId' => $quizReport->original_quiz_detail_id,
            'dateEnd' => $quizReport->created_at,
            'time' =>  $quizReport->time,
            'hostedBy' => auth()->user()->name,
            'playersTotal' => $getTotalPlayerPerQuestion,
            'questionsTotal' => count($quizQuestion),
            'pageTitle'=> 'Reports'
        ]);
    }

    public function questionsList($id)
    {
        $getDBData = $this->dbData($id);
        $playerLogs = $getDBData['playerLogs'];
        $quizQuestion = $playerLogs->unique("question_id");
        $quizReport = $getDBData["quizReport"];


        $getTotalPlayerLogs = count($playerLogs->toArray());
        $getTotalPlayerPerQuestion = $getTotalPlayerLogs / count($quizQuestion->toArray());

        //GET QUESTION LIST PERCENTAGE
        $questionsDataList = [];
        $questionsDataContainer = [];
        foreach ($playerLogs as $key => $playerLog) {
            $key = $key + 1;
            array_push($questionsDataContainer, $playerLog->toArray());
            if (count($questionsDataContainer) == $getTotalPlayerPerQuestion) {
                foreach ($questionsDataContainer as $index => $value) {
                    if (!$value['time']) {
                        $questionsDataContainer[$index]['time'] =  $playerLog->duration;
                    }
                }

                $getQuestionTotalFalseAnswer = count(array_filter($questionsDataContainer, function ($val) {
                    return $val['correct_incorrect'] != 1;
                }));
                $questionsDataPercentage =  (($getTotalPlayerPerQuestion - $getQuestionTotalFalseAnswer)
                    / $getTotalPlayerPerQuestion) * 100;

                $averageAnswerTime = array_sum(array_column($questionsDataContainer, 'time')) / $getTotalPlayerPerQuestion;
                $getNullAnswer = count(array_filter($questionsDataContainer, function ($val) {
                    return $val['answered'] == '';
                }));

                $getAAnswer = count(array_filter($questionsDataContainer, function ($val) {
                    return $val['answered'] == 'A';
                }));
                $getBAnswer = count(array_filter($questionsDataContainer, function ($val) {
                    return $val['answered'] == 'B';
                }));
                $getCAnswer = count(array_filter($questionsDataContainer, function ($val) {
                    return $val['answered'] == 'C';
                }));
                $getDAnswer = count(array_filter($questionsDataContainer, function ($val) {
                    return $val['answered'] == 'D';
                }));

                $insertData = [
                    'question_id' => $playerLog->question_id,
                    'question_title' => $key / $getTotalPlayerPerQuestion . $playerLog->question_title,
                    'question_percentage' => $questionsDataPercentage,
                    'question_avg_answer_time' => $averageAnswerTime,
                    'player_answered' => count($questionsDataContainer) - $getNullAnswer,
                    'question_image' => $playerLog->question_image,
                    'duration' => $playerLog->duration,
                    'answer_list'   => [
                        'A' =>         $playerLog->A,
                        'B' =>         $playerLog->B,
                        'C' =>         $playerLog->C,
                        'D' =>         $playerLog->D,
                    ],
                    'answer_total' => [
                        'A' =>         $getAAnswer,
                        'B' =>         $getBAnswer,
                        'C' =>         $getCAnswer,
                        'D' =>         $getDAnswer,
                        'no_answer' => $getNullAnswer,
                    ]

                ];
                $questionsDataList[] = $insertData;
                $questionsDataContainer = [];
            }
        }

        return Inertia::render('Report/ReportDetail/QuestionsList', [
            'quizReportId' => $id,
            'quizTitle' => $quizReport->quiz_title,
            'dateEnd' => $quizReport->created_at,
            'originalQuizId' => $quizReport->original_quiz_detail_id,
            'time' =>  $quizReport->time,
            'hostedBy' => auth()->user()->name,
            'playersTotal' => $getTotalPlayerPerQuestion,
            'questionsTotal' => count($quizQuestion),
            'questionsDataList' => $questionsDataList,
            'columns' => [
                [
                    "Header" => "Question",
                    "accessor" => "question_title",
                ],
                [
                    "Header" => "Correct/Incorrect",
                    "accessor" => "question_percentage",
                ],
            ],
            'pageTitle'=> 'Reports'
        ]);
    }


    public function playersList($id)
    {

        $getDBData = $this->dbData($id);
        $playerLogs = $getDBData['playerLogs'];
        $quizQuestion = $playerLogs->unique("question_id");
        $quizReport = $getDBData["quizReport"];


        $getTotalPlayerLogs = count($playerLogs->toArray());
        $getTotalPlayerPerQuestion = $getTotalPlayerLogs / count($quizQuestion->toArray());

        $playersDataList = [];
        $playersListContainer = [];
        foreach ($playerLogs->sortBy("rank")->values()->all() as $key => $playerLog) {
            array_push($playersListContainer, $playerLog->toArray());
            if (count($playersListContainer) == count($quizQuestion)) {
                $getQuestionTotalFalseAnswer = count(array_filter($playersListContainer, function ($val) {
                    return $val['correct_incorrect'] != 1;
                }));

                $questionPercentage = ((count($quizQuestion) - $getQuestionTotalFalseAnswer) / count($quizQuestion)) * 100;
                $getNullAnswer = count(array_filter($playersListContainer, function ($val) use ($playerLog) {
                    return $val['answered'] == '';
                }));

                $insertData = [
                    'player_name' => $playerLog->player_name,
                    'rank' => $playerLog->rank,
                    'correct_answer' => $questionPercentage,
                    'unanswered' => $getNullAnswer,
                    'final_score' => $playerLog->final_points,
                    'player_id' =>  $playerLog->player_id,
                    'player_count' => $getTotalPlayerPerQuestion
                ];
                $playersDataList[] = $insertData;
                $playersListContainer = [];
            }
        }

        return Inertia::render('Report/ReportDetail/PlayersList', [
            'quizReportId' => $id,
            'quizTitle' => $quizReport->quiz_title,
            'dateEnd' => $quizReport->created_at,
            'originalQuizId' => $quizReport->original_quiz_detail_id,
            'time' =>  $quizReport->time,
            'hostedBy' => auth()->user()->name,
            'playersTotal' => $getTotalPlayerPerQuestion,
            'questionsTotal' => count($quizQuestion),
            'playersDataList' => $playersDataList,
            'columns' => [
                [
                    "Header" => "Nickname",
                    "accessor" => "player_name",
                ],
                [
                    "Header" => "Rank",
                    "accessor" => "rank",
                ],
                [
                    "Header" => "Correct Answer",
                    "accessor" => "correct_answer",
                ],
                [
                    "Header" => "Unanswered",
                    "accessor" => "unanswered",
                ],
                [
                    "Header" => "Final Score",
                    "accessor" => "final_score",
                ],
            ],
            'pageTitle'=> 'Reports'
        ]);
    }

    public function checkPlayerDetail(Request $request)
    {
        $playerSummaryId = $request->input('id');
        $playerData = PlayerSummaryResult
            ::join('player_logs', "player_summary_results.id", "=", "player_logs.player_summary_result_id")
            ->join("quiz_question_for_reports", "quiz_question_for_reports.id", "=", "player_logs.quiz_question_for_report_id")
            ->where("player_summary_results.id", "=", $playerSummaryId)
            ->select(
                'player_summary_results.id as player_id',
                'player_logs.answered',
                'player_logs.correct_incorrect',
                'player_logs.time',
                'player_logs.points',
                'quiz_question_for_reports.question_title',
                'quiz_question_for_reports.id',
                'quiz_question_for_reports.A',
                'quiz_question_for_reports.B',
                'quiz_question_for_reports.C',
                'quiz_question_for_reports.D',
            )
            ->orderBy('quiz_question_for_reports.id', 'asc')
            ->get()->values()->all();

        foreach ($playerData as $key => $data) {
            $data['question_title'] = $key + 1 . $data['question_title'];
        }

        return [
            'player_data' => $playerData,
            'columns' =>  [
                [
                    "Header" => "Questions",
                    "accessor" => "question_title",
                ],

                [
                    "Header" => "Answered",
                    "accessor" => "answered",
                ],
                [
                    "Header" => "Correct/incorrect",
                    "accessor" => "correct_incorrect",
                ],
                [
                    "Header" => "Time",
                    "accessor" => "time",
                ],
                [
                    "Header" => "Points",
                    "accessor" => "points",
                ],
            ]
        ];
    }

    public function checkQuestionDetail(Request $request)
    {
        $questionReportId = $request->input('questionId');

        $quizQuestionReport = QuizQuestionForReport::join('player_logs', "quiz_question_for_reports.id", "=", "player_logs.quiz_question_for_report_id")
            ->join('player_summary_results', "player_summary_results.id", "=", "player_logs.player_summary_result_id")
            ->where('quiz_question_for_reports.id', $questionReportId)->get()->values()->all();

        return [
            'question_data' =>  $quizQuestionReport,
            'columns' =>  [
                [
                    "Header" => "Nickname",
                    "accessor" => "player_name",
                ],
                [
                    "Header" => "Answered",
                    "accessor" => "answered",
                ],
                [
                    "Header" => "Correct/incorrect",
                    "accessor" => "correct_incorrect",
                ],
                [
                    "Header" => "Time",
                    "accessor" => "time",
                ],
                [
                    "Header" => "Points",
                    "accessor" => "points",
                ],
            ]
        ];
    }

    private function dbData($quizReportId)
    {
        $quizReport = DB::table('quiz_detail_for_reports')
            ->where('id',  $quizReportId)->where('user_id', auth()->user()->id)
            ->get()->first();

        $playerLogs = QuizDetailForReport
            ::join(
                'quiz_question_for_reports',
                'quiz_detail_for_reports.id',
                '=',
                'quiz_question_for_reports.quiz_detail_for_report_id'
            )
            ->join('player_logs', "quiz_question_for_reports.id", "=", "player_logs.quiz_question_for_report_id")
            ->join('player_summary_results', "player_summary_results.id", "=", "player_logs.player_summary_result_id")
            ->where('quiz_detail_for_reports.id', "=", $quizReportId)
            ->select(
                'player_summary_results.id as player_id',
                'player_summary_results.player_name',
                'player_summary_results.rank',
                'player_summary_results.final_points',
                'player_logs.answered',
                'player_logs.correct_incorrect',
                'player_logs.time',
                'player_logs.points',
                'quiz_question_for_reports.question_title',
                'quiz_question_for_reports.id as question_id',
                'quiz_question_for_reports.A',
                'quiz_question_for_reports.B',
                'quiz_question_for_reports.C',
                'quiz_question_for_reports.D',
                'quiz_question_for_reports.question_image',
                'quiz_question_for_reports.duration'
            )
            ->orderBy('question_id', 'asc')
            ->get();


        return [
            "quizReport" => $quizReport,
            "playerLogs" => $playerLogs,

        ];
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
}
