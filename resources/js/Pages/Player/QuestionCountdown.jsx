import {
    usePlayerDispatch,
    usePlayerState,
} from "@/Components/context/PlayerContext";
import React, { useEffect, useState } from "react";

const DEFAULT_TIME = 4000;
const QuestionCountdown = () => {
    const [time, SetTime] = useState(DEFAULT_TIME);
    const { showCountdownPanel, catchHostData, currentQuestion } =
        usePlayerState();
    const dispatch = usePlayerDispatch();

    useEffect(() => {
        if (!showCountdownPanel.question || !catchHostData) return;
        SetTime(DEFAULT_TIME);
        if (catchHostData?.type == "questionCountdownTime")
            SetTime(catchHostData.data);
    }, [showCountdownPanel.question, catchHostData]);

    useEffect(() => {
        if (time == 0) {
            dispatch({ type: "TOGGLE_SHOW_QUESTION_COUNTDOWN" });
            dispatch({ type: "TOGGLE_SHOW_CHOOSING_ANSWER" });
        }
    }, [time]);

    //  console.log(currentQuestion);

    return (
        <>
            {showCountdownPanel.question ? (
                <div className="relative flex flex-col items-center gap-5 h-full justify-center">
                    <p className="text-4xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                        Question {currentQuestion?.questionNumber ?? null}
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
