import React, { useEffect, useMemo, useState } from "react";
import { ProgressBar } from "@/Components/ProgressBar";
import {
    useHostDispatch,
    useHostState,
} from "@/Components/context/HostContext";
import { sleep } from "@/Lib/sleep";
import ChoiceOnScreen from "@/Components/choice/ChoiceOnScreen";
import QuestionImage from "./MiddleScreenQuiz/QuestionImage";
import useTimeCountdown from "@/Components/hook/TimeCountdown";
import AnswerResultGraph from "./MiddleScreenQuiz/AnswerResultGraph";
import { InGameNavigationBottom } from "./InGameNavigationBottom";
import { cloneDeep } from "lodash";

const QuestionOnScreen = () => {
    const {
        show,
        questions,
        playersList,
        playersResult,
        catchPlayerData,
        disconnectedPlayers,
        currentQuestionNumber,
        playersAnswerContainer,
    } = useHostState();
    const selectedQuestion = useMemo(() => {
        return questions[currentQuestionNumber];
    }, [questions, currentQuestionNumber]);
    const totalPlayersAnswer = useMemo(() => {
        return playersAnswerContainer.length - disconnectedPlayers.length;
    }, [playersAnswerContainer, disconnectedPlayers]);
    const [playersListTemp, SetPlayersListTemp] = useState([]);
    const [defaultTime, SetDefaultTime] = useState(null);
    const { time, SetClearTime, SetTime, SetStartTime } =
        useTimeCountdown(null);
    const dispatch = useHostDispatch();

    useEffect(() => {
        if (show.currentQuestion) {
        }
    }, [playersList]);

    useEffect(() => {
        if (questions.length == 0) return;
        SetTime(selectedQuestion.duration * 1000);
        SetDefaultTime(selectedQuestion.duration * 1000);
    }, [questions, currentQuestionNumber]);

    useEffect(() => {
        const updateTime = async () => {
            SetClearTime(false);
            await sleep(500);
            SetStartTime(true);
        };
        if (show.currentQuestion && defaultTime) updateTime();
    }, [show.currentQuestion, defaultTime]);

    useEffect(() => {
        if (time == 0) {
            let playerAnswerData = {
                time: null,
                score: 0,
                answer: null,
                correct_incorrect: false,
            };
            const filteredPlayer = playersList.filter((obj1) => {
                let foundMatch = false;
                for (const obj2 of playersAnswerContainer) {
                    if (obj1.name === obj2.name) {
                        foundMatch = true;
                        break;
                    }
                }
                return !foundMatch;
            });
            let arrayOfAnswers = [...playersAnswerContainer];
            for (let index = 0; index < filteredPlayer.length; index++) {
                setTimeout(() => {
                    filteredPlayer[index].peerData.send({
                        type: "timeScoreResult",
                        wrongAnswer: true,
                        data: {
                            time: playerAnswerData.time,
                            score: playerAnswerData.score,
                        },
                    });
                }, 40);
                let payload = {
                    ...playerAnswerData,
                    name: filteredPlayer[index].name,
                    peerData: filteredPlayer[index].peerData,
                };
                arrayOfAnswers.push(payload);
            }

            dispatch({
                type: "COLLECT_PLAYERS_ANSWER",
                payload: arrayOfAnswers,
            });
        }
    }, [time]);

    useEffect(() => {
        if (show.answerGraph) return;
        const update = async () => {
            if (
                playersAnswerContainer.length == playersList.length &&
                show.currentQuestion
            ) {
                SetClearTime(true);
                dispatch({ type: "TOGGLE_SHOW_ANSWER_GRAPH" });
                await sleep(900);
                for (let index = 0; index < playersList.length; index++) {
                    setTimeout(() => {
                        playersList[index].peerData.send({
                            type: "showAnswerResult",
                        });
                    }, 45);
                }
            }
        };
        update();
        return;
    }, [playersList, playersAnswerContainer, show.currentQuestion]);

    useEffect(() => {
        if (catchPlayerData?.type == "playerAnswerData") {
            let playerAnswerData = catchPlayerData?.data;
            if (catchPlayerData?.answerType == "correctAnswer") {
                playerAnswerData.time = ((defaultTime - time) / 1000).toFixed(
                    1
                );
                playerAnswerData.score = Math.floor(
                    (time / defaultTime) * 1000
                );
            }
            if (catchPlayerData?.answerType == "falseAnswer") {
                playerAnswerData.time = ((defaultTime - time) / 1000).toFixed(
                    1
                );
                playerAnswerData.score = 0;
            }

            catchPlayerData.peerData.send({
                type: "timeScoreResult",
                wrongAnswer:
                    catchPlayerData?.answerType == "correctAnswer"
                        ? false
                        : true,
                data: {
                    time: playerAnswerData.time,
                    score: playerAnswerData.score,
                },
            });
            return dispatch({
                type: "COLLECT_PLAYERS_ANSWER",
                payload: [
                    ...playersAnswerContainer,
                    {
                        ...playerAnswerData,
                        peerData: catchPlayerData.peerData,
                    },
                ],
            });
        }
    }, [catchPlayerData]);

    const handleProceedToScoreboard = async () => {
        dispatch({ type: "TOGGLE_SHOW_CURRENT_QUESTION" });
        SetStartTime(false);
        dispatch({ type: "TOGGLE_SHOW_ANSWER_GRAPH" });
        if (currentQuestionNumber == questions.length - 1) {
            const lookup = Object.fromEntries(
                playersAnswerContainer.map((item) => [
                    item.peerData.peer,
                    item.score,
                ])
            );
            const result = playersList.map((item) => ({
                ...item,
                totalScore: item.totalScore + lookup[item.peerData.peer],
            }));

            result.sort((a, b) => {
                return b.totalScore - a.totalScore;
            });

            playersList.forEach((player) => {
                player.peerData.send({
                    type: "showFinalPanel",
                });
            });

            await sleep(900);
            dispatch({ type: "UPDATE_PLAYERS_LIST", payload: result });
            dispatch({ type: "TOGGLE_SHOW_FINAL_RESULT" });

            const answerContainerCopy = cloneDeep(playersAnswerContainer);
            for (let i = 0; i < answerContainerCopy.length; i++) {
                delete answerContainerCopy[i].peerData;
            }
            dispatch({
                type: "UPDATE_PLAYERS_RESULT_DATA",
                payload: [...playersResult, answerContainerCopy],
            });
            return;
        }
        return dispatch({ type: "TOGGLE_SHOW_SCOREBOARD" });
    };

    return (
        <>
            {show.currentQuestion ? (
                <div className="h-screen relative grid grid-rows-12">
                    <div className="lg:m-5 relative mb-0 row-span-1 drop-shadow-lg border-none text-center h-fit ">
                        <p className=" font-semibold bg-white p-2 text-lg sm:text-2xl">
                            {selectedQuestion.question_title}
                        </p>
                        <div className="sm:hidden">
                            <ProgressBar
                                progress={time}
                                progressTotal={defaultTime}
                                className={"bg-purple-700"}
                            />
                        </div>
                    </div>

                    {show.answerGraph ? (
                        <AnswerResultGraph
                            onClick={handleProceedToScoreboard}
                            playersAnswerContainer={playersAnswerContainer}
                        />
                    ) : (
                        <QuestionImage
                            img={selectedQuestion.question_image}
                            time={Math.floor(time / 1000)}
                            totalAnswered={totalPlayersAnswer}
                        />
                    )}

                    <div className="row-span-5 p-5 self-stretch gap-2 grid grid-cols-2">
                        <ChoiceOnScreen
                            answerChar={"A"}
                            answer={selectedQuestion.A}
                            showResult={show.answerGraph}
                            correctAnswer={
                                selectedQuestion[
                                    selectedQuestion.correct_answer
                                ]
                            }
                        />
                        <ChoiceOnScreen
                            answerChar={"B"}
                            answer={selectedQuestion.B}
                            showResult={show.answerGraph}
                            correctAnswer={
                                selectedQuestion[
                                    selectedQuestion.correct_answer
                                ]
                            }
                        />
                        <ChoiceOnScreen
                            answerChar={"C"}
                            answer={selectedQuestion.C}
                            showResult={show.answerGraph}
                            correctAnswer={
                                selectedQuestion[
                                    selectedQuestion.correct_answer
                                ]
                            }
                        />
                        <ChoiceOnScreen
                            answerChar={"D"}
                            answer={selectedQuestion.D}
                            showResult={show.answerGraph}
                            correctAnswer={
                                selectedQuestion[
                                    selectedQuestion.correct_answer
                                ]
                            }
                        />
                    </div>
                    <InGameNavigationBottom />
                </div>
            ) : null}
        </>
    );
};

export default QuestionOnScreen;
