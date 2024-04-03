import { Spinner } from "@/Components/svg/Spinner";
import React from "react";
import {
    usePlayerDispatch,
    usePlayerState,
} from "@/Components/context/PlayerContext";
const QuizCountdown = () => {
    const { showCountdownPanel } = usePlayerState();

    return (
        <>
            {showCountdownPanel.quiz ? (
                <>
                    <div className="relative flex flex-col items-center justify-center gap-5 h-full">
                        <p className="text-4xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                            Get Ready!
                        </p>
                        <Spinner classname={"h-16 fill-white"} />
                        <p className="text-white text-xl font-semibold">
                            Loading...
                        </p>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default QuizCountdown;
