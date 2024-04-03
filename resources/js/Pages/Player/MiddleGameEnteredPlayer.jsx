import { usePlayerState } from "@/Components/context/PlayerContext";
import PauseIcon from "@/Components/svg/PauseIcon";
import React from "react";

const MiddleGameEnteredPlayer = () => {
    const { enteredPlayer } = usePlayerState();
    return (
        <>
            {enteredPlayer.middleGame ? (
                <div className="relative flex flex-col items-center justify-center gap-5 h-full">
                    <p className="text-4xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                        Get Ready!
                    </p>
                    <PauseIcon className="w-[25%] fill-white" />
                    <p className="text-white text-2xl font-semibold">
                        You'll be able to join soon
                    </p>
                </div>
            ) : null}
        </>
    );
};

export default MiddleGameEnteredPlayer;
