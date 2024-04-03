import CorrectAnswer from "@/Components/CorrectAnswer";
import IncorrectAnswer from "@/Components/IncorrectAnswer";
import {
    usePlayerDispatch,
    usePlayerState,
} from "@/Components/context/PlayerContext";
import { Spinner } from "@/Components/svg/Spinner";
import { sleep } from "@/Lib/sleep";
import React, { useEffect, useState } from "react";

const AnswerResult = () => {
    const {
        show,
        currentQuestion,
        catchHostData,
        choosedAnswer,
        peer,
        username,
    } = usePlayerState();
    const { time, defaultTime, answer } = choosedAnswer;
    const dispatch = usePlayerDispatch();
    const [wrongAnswer, SetWrongAnswer] = useState(false);
    const [scoreOnScreen, SetScoreOnScreen] = useState(0);

    useEffect(() => {
        const getAnswerResult = async () => {
            if (!time && !defaultTime && !answer) {
                SetWrongAnswer(false);
                SetScoreOnScreen(0);
                return;
            }
            await sleep(1000);
            await sleep(currentQuestion.timeoutAnswerSendDelay);
            if (
                answer != "timesup" &&
                currentQuestion.correct_answer != answer
            ) {
                peer.connection.send({
                    type: "playerAnswerData",
                    data: {
                        name: username,
                        time: ((defaultTime - time) / 1000).toFixed(1),
                        score: 0,
                        answer,
                        correct_incorrect: false,
                    },
                });

                return SetWrongAnswer(true);
            }

            if (answer == "timesup" && time == 0) {
                peer.connection.send({
                    type: "playerAnswerData",
                    data: {
                        name: username,
                        time: null,
                        score: 0,
                        answer: null,
                        correct_incorrect: false,
                    },
                });

                return SetWrongAnswer(true);
            }

            let currentScore = Math.floor((time / defaultTime) * 1000);
            SetScoreOnScreen(currentScore);

            peer.connection.send({
                type: "playerAnswerData",
                data: {
                    name: username,
                    time: ((defaultTime - time) / 1000).toFixed(1),
                    score: currentScore,
                    answer,
                    correct_incorrect: true,
                },
            });
            return dispatch({
                type: "INCREMENT_SCORE",
                payload: currentScore,
            });
        };

        getAnswerResult();
    }, [choosedAnswer]);

    return (
        <>
            {answer ? (
                <>
                    {show.answerResult ? (
                        <div className="relative flex flex-col items-center justify-center gap-5 h-full">
                            {wrongAnswer && time == 0 ? (
                                <IncorrectAnswer timesUp={true} />
                            ) : wrongAnswer && time != 0 ? (
                                <IncorrectAnswer incorrect={true} />
                            ) : !wrongAnswer && scoreOnScreen > 0 ? (
                                <CorrectAnswer score={scoreOnScreen} />
                            ) : null}
                        </div>
                    ) : (
                        <div className="relative flex flex-col items-center justify-center gap-5 h-full">
                            <p className="text-center text-2xl md:text-4xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                                Preparing for something!
                            </p>
                            <Spinner classname={"h-16 fill-white"} />
                        </div>
                    )}
                </>
            ) : null}
        </>
    );
};

export default AnswerResult;
