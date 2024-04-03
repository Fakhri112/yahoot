import React from "react";
import { Triangle, Rhombus, Circle, Square } from "@/Components/svg/Shape";

const ChoiceOnScreen = ({ showResult, answer, answerChar, correctAnswer }) => {
    return (
        <div
            className={`rounded flex justify-between items-center h-full py-2 drop-shadow-md
        ${
            answerChar == "A"
                ? "bg-red-700 "
                : answerChar == "B"
                ? " bg-sky-600 "
                : answerChar == "C"
                ? "bg-amber-600 "
                : answerChar == "D"
                ? "bg-green-600 "
                : null
        }
        
        `}
        >
            <div
                className={`absolute inset-0 bg-black opacity-50 ${
                    answer != correctAnswer && showResult ? "" : "hidden"
                }`}
            ></div>
            <div className="relative sm:static rounded self-stretch flex items-center w-full">
                {answerChar == "A" ? (
                    <Triangle className="absolute sm:static top-0 h-5 sm:h-10 left-2 sm:mx-2 fill-white rounded" />
                ) : answerChar == "B" ? (
                    <Rhombus className="absolute sm:static top-0 h-5 sm:h-10 left-2 sm:mx-2 fill-white rounded" />
                ) : answerChar == "C" ? (
                    <Circle className="absolute sm:static top-0 h-5 sm:h-10 left-2 sm:mx-2 fill-white rounded" />
                ) : answerChar == "D" ? (
                    <Square className="absolute sm:static top-0 h-5 sm:h-10 left-2 sm:mx-2 fill-white rounded" />
                ) : null}
                <p className="font-semibold w-full sm:text-start text-center text-white sm:text-xl">
                    {answer}
                </p>
            </div>
            <span
                className={`text-shadow-[0_0_white] text-transparent me-1 text-xl ${
                    showResult ? "" : "hidden"
                }`}
            >
                {answer == correctAnswer ? <> &#10004;</> : <>&#x2716;</>}
            </span>
        </div>
    );
};

export default ChoiceOnScreen;
