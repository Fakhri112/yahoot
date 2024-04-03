import React from "react";

const CorrectAnswer = ({ score = 0 }) => {
    return (
        <>
            <p className="text-3xl font-bold text-white [text-shadow:0px_0px_3px_#000000]">
                Correct
            </p>
            <div className="grid place-items-center">
                <div className="bg-green-600 w-20 h-20 border border-white border-4 rounded-full"></div>
                <p className="text-shadow-[0_0_white] text-transparent absolute text-5xl">
                    &#10004;
                </p>
            </div>
            <div className="grid place-items-center relative sm:max-w-96 max-w-80 ">
                <div className="absolute bg-black opacity-50 rounded-md min-w-40 w-full h-full"></div>
                <p className="text-center text-xl text-white font-bold p-3 z-10">
                    + {score}
                </p>
            </div>
        </>
    );
};

export default CorrectAnswer;
