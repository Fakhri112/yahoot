import {
    useHostDispatch,
    useHostState,
} from "@/Components/context/HostContext";
import { FullScreenIcon } from "@/Components/svg/FullScreenIcon";
import ImageIcon from "@/Components/svg/ImageIcon";
import React from "react";

export const InGameNavigationBottom = () => {
    const {
        gamePinLock,
        currentQuestionNumber,
        gamePin,
        questions,
        thumbnailBg,
    } = useHostState();
    const dispatch = useHostDispatch();

    return (
        <div className="w-full text-lg text-white  bg-black/50 p-2 z-40 flex justify-between">
            <p className="font-semibold">
                {currentQuestionNumber + 1 + "/" + questions.length}
            </p>
            <div className="flex gap-x-2">
                Game PIN:{" "}
                <div>
                    {gamePinLock ? (
                        <span>Locked</span>
                    ) : (
                        <>
                            <span className="pe-1">{gamePin.slice(0, 3)}</span>
                            <span className=" ps-1">{gamePin.slice(3, 7)}</span>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-x-2 ">
                <ImageIcon
                    className={"w-8 fill-white"}
                    status={thumbnailBg}
                    onClick={() => dispatch({ type: "TOGGLE_BACKGROUND" })}
                />
                <FullScreenIcon className="h-6 stroke-white" />
            </div>
        </div>
    );
};
