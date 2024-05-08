import {
    usePlayerDispatch,
    usePlayerState,
} from "@/Components/context/PlayerContext";
import useTimeCountdown from "@/Components/hook/TimeCountdown";
import { sleep } from "@/Lib/sleep";
import React, { useEffect, useState } from "react";

const DEFAULT_TIME = 4000;
const QuestionCountdown = () => {
    const { time, SetTime, SetStartTime } = useTimeCountdown(DEFAULT_TIME);
    const { showCountdownPanel, catchHostData, currentQuestion } =
        usePlayerState();
    const dispatch = usePlayerDispatch();

    useEffect(() => {
        if (!showCountdownPanel.question) return;

        const updateTime = async () => {
            SetTime(DEFAULT_TIME);
            await sleep(980);
            SetStartTime(true);
        };

        if (
            catchHostData?.type == "connected" &&
            catchHostData.status == "proceedToQuestionCountdown"
        ) {
            const updateTimeMiddleGame = () => {
                SetTime(catchHostData.time);
                SetStartTime(true);
            };
            return updateTimeMiddleGame();
        }

        updateTime();
    }, [showCountdownPanel.question]);

    useEffect(() => {}, [catchHostData]);

    useEffect(() => {
        if (time == 0) {
            dispatch({ type: "TOGGLE_SHOW_QUESTION_COUNTDOWN" });
            dispatch({ type: "TOGGLE_SHOW_CHOOSING_ANSWER" });
        }
    }, [time]);

    return (
        <>
            {showCountdownPanel.question ? (
                <div className="relative flex flex-col items-center gap-5 h-full justify-center">
                    <p className="text-4xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                        Question {currentQuestion?.questionNumber ?? ""}
                    </p>

                    <div className="relative grid place-items-center">
                        <p className="z-10 absolute text-3xl font-bold">
                            {Math.floor(time / 1000)}
                        </p>
                        <div
                            className={`h-20 w-20 -z-1 rounded-full grid place-items-center  ${
                                time == DEFAULT_TIME
                                    ? "zoomIn"
                                    : time < DEFAULT_TIME &&
                                      Math.floor(time / 1000) % 2 === 0
                                    ? "rotation180"
                                    : time < DEFAULT_TIME &&
                                      Math.floor(time / 1000) % 2 !== 0
                                    ? "rotation360"
                                    : time == 0
                                    ? "hidden"
                                    : ""
                            }
                        bg-[linear-gradient(to_left,#ffffff_50%,#ffffff_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_100%)]`}
                        ></div>
                    </div>
                    <p className="text-white text-xl font-semibold">
                        Loading...
                    </p>
                </div>
            ) : null}
        </>
    );
};

export default QuestionCountdown;
