import IncreaseCounter from "@/Components/IncreaseCounter";
import { usePlayerState } from "@/Components/context/PlayerContext";
import { sleep } from "@/Lib/sleep";
import React, { useEffect, useState } from "react";

const PlayerInformationBar = ({ children }) => {
    const { show, score, username, avatar, choosedAnswer } = usePlayerState();
    const [tempScore, SetTempScore] = useState(0);

    useEffect(() => {
        if (show.answerResult && choosedAnswer.answer) {
            SetTempScore(score);
        }
    }, [show.answerResult, choosedAnswer]);

    return (
        <>
            {show.playerInformationBar ? (
                <>
                    {children}
                    <div className={`relative inset-0 flex items-end`}>
                        <div className="bg-white w-full flex justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${avatar}`}
                                    alt="avatar"
                                    className="h-16"
                                />
                                <p className="text-xl font-bold">{username}</p>
                            </div>
                            <div className="bg-slate-800 self-center me-4 w-16 text-center text-white font-semibold p-2 rounded-md">
                                {choosedAnswer.answer && !show.answerResult ? (
                                    tempScore
                                ) : (
                                    <IncreaseCounter
                                        start={true}
                                        targetNumber={score}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default PlayerInformationBar;
