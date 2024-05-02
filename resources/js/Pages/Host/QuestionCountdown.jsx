import { ProgressBar } from "@/Components/ProgressBar";
import {
    useHostDispatch,
    useHostState,
} from "@/Components/context/HostContext";
import useTimeCountdown from "@/Components/hook/TimeCountdown";
import { sleep } from "@/Lib/sleep";
import React, { useEffect, useMemo, useState } from "react";
const DEFAULT_TIME = 4000;

const QuestionCountdown = () => {
    const { time, SetTime, SetStartTime } = useTimeCountdown(DEFAULT_TIME);
    const [showTitle, SetShowTitle] = useState(false);
    const [showProgressBar, SetShowProgressBar] = useState(false);
    const {
        show,
        showCountdownPanel,
        questions,
        currentQuestionNumber,
        playersList,
        catchPlayerData,
        thumbnailBg,
    } = useHostState();
    const selectedQuestion = useMemo(() => {
        return questions[currentQuestionNumber];
    }, [questions, currentQuestionNumber]);
    const dispatch = useHostDispatch();

    useEffect(() => {
        if (questions.length == 0 || !showCountdownPanel.question) return;
        for (let index = 0; index < playersList.length; index++) {
            let delay = (index + 1) * 10 + 10;
            setTimeout(() => {
                playersList[index].peerData.send({
                    type: "startGame",
                    status: "questionOnScreen",
                    data: questions[currentQuestionNumber],
                    questionNumber: currentQuestionNumber + 1,
                    timeoutAnswerSendDelay: delay,
                });
            }, 25);
        }
    }, [questions, currentQuestionNumber, showCountdownPanel.question]);

    useEffect(() => {
        const updateTime = async () => {
            await sleep(400);
            SetShowTitle(true);
            SetShowProgressBar(true);
            await sleep(580);
            return SetStartTime(true);
        };
        if (!showCountdownPanel.question) return;
        if (currentQuestionNumber >= 1) SetTime(DEFAULT_TIME);
        updateTime();
    }, [showCountdownPanel.question]);

    useEffect(() => {
        if (time == 0) {
            dispatch({ type: "TOGGLE_SHOW_QUESTION_COUNTDOWN" });
            dispatch({ type: "TOGGLE_SHOW_CURRENT_QUESTION" });
        }
    }, [time]);

    useEffect(() => {
        if (!catchPlayerData) return;
        let payload = {
            status: "proceedToQuestionCountdown",
            type: "connected",
            questionData: questions[currentQuestionNumber],
            questionNumber: currentQuestionNumber + 1,
            time,
        };
        if (!show.waitingRoom && showCountdownPanel.question) {
            catchPlayerData.peerData.send({
                type: "toggleThumbail",
                status: thumbnailBg,
            });
            catchPlayerData.peerData.send(payload);
        }
    }, [catchPlayerData]);

    return (
        <>
            {showCountdownPanel.question ? (
                <div className="h-full relative overflow-hidden grid grid-rows-3">
                    <div className="flex justify-end py-3 px-6">
                        <div className="relative grid place-items-center  self-start">
                            <p className="absolute text-2xl font-semibold  ">
                                {currentQuestionNumber + 1} of{" "}
                                {questions.length}
                            </p>
                            <div className=" bg-sky-600 w-32 h-14 rounded-lg"></div>
                        </div>
                    </div>
                    <div
                        className={`${
                            showTitle ? "scaleIn" : "hidden"
                        } w-full self-start
                    bg-white py-12 text-center text-2xl font-semibold col-span-1`}
                    >
                        {selectedQuestion.question_title}
                    </div>
                    <ProgressBar
                        className={`${
                            showProgressBar ? "scaleIn" : "hidden"
                        } col-span-1 !h-10 bg-purple-700`}
                        hideNumber={true}
                        progress={time}
                        progressTotal={DEFAULT_TIME}
                    />
                </div>
            ) : null}
        </>
    );
};

export default QuestionCountdown;
