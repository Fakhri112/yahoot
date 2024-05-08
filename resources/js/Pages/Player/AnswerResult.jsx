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
    const { answer } = choosedAnswer;
    const dispatch = usePlayerDispatch();
    const [wrongAnswer, SetWrongAnswer] = useState(false);
    const [scoreOnScreen, SetScoreOnScreen] = useState(0);
    const [timeResult, SetTimeResult] = useState(null);

    useEffect(() => {
        const getAnswerResult = async () => {
            if (!answer) {
                SetWrongAnswer(false);
                SetScoreOnScreen(0);
                return;
            }
            await sleep(currentQuestion.timeoutAnswerSendDelay);
            if (answer == "timesup") return;
            if (currentQuestion.correct_answer != answer) {
                peer.connection.send({
                    type: "playerAnswerData",
                    answerType: "falseAnswer",
                    data: {
                        name: username,
                        answer,
                        correct_incorrect: false,
                    },
                });
                return;
            }

            peer.connection.send({
                type: "playerAnswerData",
                answerType: "correctAnswer",
                data: {
                    name: username,
                    answer,
                    correct_incorrect: true,
                },
            });
            return;
        };

        getAnswerResult();
    }, [choosedAnswer]);

    useEffect(() => {
        if (catchHostData?.type == "timeScoreResult") {
            SetScoreOnScreen(catchHostData.data.score);
            SetWrongAnswer(catchHostData.wrongAnswer);
            SetTimeResult(catchHostData.data.time);
            if (catchHostData.wrongAnswer && !catchHostData.data.time) {
                dispatch({ type: "TOGGLE_SHOW_CHOOSING_ANSWER" });
                dispatch({
                    type: "UPDATE_CHOOSED_ANSWER_DATA",
                    payload: {
                        answer: "timesup",
                    },
                });
            }
            dispatch({
                type: "INCREMENT_SCORE",
                payload: catchHostData.data.score,
            });
        }
    }, [catchHostData]);

    return (
        <>
            {answer ? (
                <>
                    {show.answerResult ? (
                        <div className="relative flex flex-col items-center justify-center gap-5 h-full">
                            {wrongAnswer && !timeResult ? (
                                <IncorrectAnswer timesUp={true} />
                            ) : wrongAnswer && timeResult != 0 ? (
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
