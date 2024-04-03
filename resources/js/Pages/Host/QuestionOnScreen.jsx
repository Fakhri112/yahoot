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
    const [defaultTime, SetDefaultTime] = useState(null);
    const { time, SetClearTime, SetTime, SetStartTime } =
        useTimeCountdown(null);
    const dispatch = useHostDispatch();

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
        playersList.forEach((player) => {
            player.peerData.send({
                type: "questionOnScreenTime",
                data: time,
            });
        });
    }, [time]);

    useEffect(() => {
        if (show.answerGraph) return;
        if (
            playersAnswerContainer.length == playersList.length &&
            show.currentQuestion
        ) {
            SetClearTime(true);
            dispatch({ type: "TOGGLE_SHOW_ANSWER_GRAPH" });

            for (let index = 0; index < playersList.length; index++) {
                setTimeout(() => {
                    playersList[index].peerData.send({
                        type: "showAnswerResult",
                    });
                }, 25);
            }
        }
    }, [playersList, playersAnswerContainer, show.currentQuestion]);

    const handleProceedToScoreboard = () => {
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
            return playersList.forEach((player) => {
                player.peerData.send({
                    type: "showFinalPanel",
                });
            });
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
