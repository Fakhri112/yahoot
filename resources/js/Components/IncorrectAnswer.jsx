import { motivationalPhrases } from "@/Lib/motiavtionWords";
import React from "react";

const IncorrectAnswer = ({ timesUp, incorrect }) => {
    return (
        <>
            <p className="text-3xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                {timesUp ? "Time's up" : incorrect ? "Incorrect" : null}
            </p>
            <div className="grid place-items-center">
                <div className="bg-red-700 w-20 h-20 border border-white border-4 rounded-full"></div>
                <span className="text-shadow-[0_0_white] text-transparent absolute text-4xl">
                    &#x2716;
                </span>
            </div>
            <div className="grid place-items-center relative sm:max-w-96 max-w-80 ">
                <div className="absolute bg-black opacity-50 rounded-md w-full h-full"></div>
                <p className="text-center text-xl text-white font-bold p-3 z-10">
                    {motivationalPhrases[Math.floor(Math.random() * 32)]}
                </p>
            </div>
        </>
    );
};

export default IncorrectAnswer;
