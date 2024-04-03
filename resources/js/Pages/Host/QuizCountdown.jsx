import {
    useHostDispatch,
    useHostState,
} from "@/Components/context/HostContext";
import useTimeCountdown from "@/Components/hook/TimeCountdown";
import { sleep } from "@/Lib/sleep";
import React, { useEffect, useState } from "react";
const DEFAULT_TIME = 3000;

const QuizCountdown = () => {
    const { time, SetTime, SetStartTime } = useTimeCountdown(DEFAULT_TIME);
    const [showTitle, SetShowTitle] = useState(false);
    const [showCountdown, SetShowCountdown] = useState(false);
    const { showCountdownPanel, quizDetail } = useHostState();
    const dispatch = useHostDispatch();

    useEffect(() => {
        const updateTime = async () => {
            SetShowTitle(true);
            await sleep(4000);
            SetShowTitle(false);
            await sleep(500);
            SetShowCountdown(true);
            await sleep(1000);
            SetStartTime(true);
        };

        if (!showCountdownPanel.quiz) return;
        dispatch({ type: "START_TIME_LAPSE" });
        updateTime();
    }, [showCountdownPanel.quiz]);

    useEffect(() => {
        if (time == 0) {
            dispatch({ type: "TOGGLE_SHOW_QUIZ_COUNTDOWN" });
            dispatch({ type: "TOGGLE_SHOW_QUESTION_COUNTDOWN" });
        }
    }, [time]);

    return (
        <>
            {showCountdownPanel.quiz ? (
                <div className="h-full overflow-hidden grid place-items-center">
                    <div
                        className={`${
                            showTitle ? "zoomIn" : "zoomOut"
                        } relative w-full 
                    bg-white py-12 text-center text-2xl font-semibold`}
                    >
                        {quizDetail.quiz_title}
                    </div>

                    <div
                        className={`${
                            showCountdown || time < DEFAULT_TIME ? "" : "hidden"
                        } relative grid place-items-center`}
                    >
                        <p
                            className={`${
                                time == 0 && !showCountdown
                                    ? "hidden"
                                    : time > 0 && showCountdown
                                    ? "zoomIn"
                                    : ""
                            } text-5xl absolute z-50`}
                        >
                            {Math.floor(time / 1000)}
                        </p>
                        <div
                            className={`${
                                time == DEFAULT_TIME && showCountdown
                                    ? "zoomIn"
                                    : time < DEFAULT_TIME &&
                                      showCountdown &&
                                      Math.floor(time / 1000) % 2 === 0
                                    ? "rotation45"
                                    : time < DEFAULT_TIME &&
                                      showCountdown &&
                                      Math.floor(time / 1000) % 2 !== 0
                                    ? "rotation90"
                                    : time == 0 && !showCountdown
                                    ? "hidden"
                                    : ""
                            } w-32 h-32 bg-white rounded-lg grid place-items-center`}
                        ></div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default QuizCountdown;
