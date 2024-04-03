import React from "react";
import { Circle, Rhombus, Square, Triangle } from "@/Components/svg/Shape";

const ChoiceInput = ({
    choiceValue,
    choiceChar,
    correctAnswer,
    valueCount,
    onChange,
}) => {
    return (
        <div
            className={`rounded flex relative self-start items-center h-[19vh] py-2 drop-shadow-md ${
                choiceValue.length == 0
                    ? "bg-slate-100"
                    : choiceChar == "A"
                    ? "bg-red-700 "
                    : choiceChar == "B"
                    ? " bg-sky-600 "
                    : choiceChar == "C"
                    ? "bg-amber-600 "
                    : choiceChar == "D"
                    ? "bg-green-600 "
                    : null
            }`}
        >
            <p className="font-semibold text-white absolute top-0 right-0 py-2 px-3">
                {valueCount}
            </p>
            <div
                className={`rounded self-stretch flex items-center mx-2 
                ${
                    choiceChar == "A"
                        ? "bg-red-700 "
                        : choiceChar == "B"
                        ? " bg-sky-600 "
                        : choiceChar == "C"
                        ? "bg-amber-600 "
                        : choiceChar == "D"
                        ? "bg-green-600 "
                        : null
                }`}
            >
                {choiceChar == "A" ? (
                    <Triangle className="p-1 h-10 fill-white" />
                ) : choiceChar == "B" ? (
                    <Rhombus className="p-1 h-10 fill-white" />
                ) : choiceChar == "C" ? (
                    <Circle className="p-1 h-10 fill-white" />
                ) : choiceChar == "D" ? (
                    <Square className="p-1 h-10 fill-white" />
                ) : null}
            </div>
            <input
                className={`border-transparent focus:border-transparent focus:ring-0 font-semibold w-full border-none ${
                    choiceValue.length == 0
                        ? null
                        : choiceChar == "A"
                        ? "bg-red-700 text-white"
                        : choiceChar == "B"
                        ? " bg-sky-600  text-white"
                        : choiceChar == "C"
                        ? "bg-amber-600  text-white"
                        : choiceChar == "D"
                        ? "bg-green-600  text-white"
                        : ""
                }`}
                maxLength={72}
                id={choiceChar}
                type="text"
                placeholder="Add Answer"
                onChange={onChange}
                value={choiceValue}
            />
            {choiceValue.length !== 0 ? (
                <input
                    className="h-5 w-5 m-3"
                    type="radio"
                    value={choiceChar}
                    name="correct_answer"
                    onChange={onChange}
                    checked={correctAnswer == choiceChar}
                />
            ) : null}
        </div>
    );
};

export default ChoiceInput;
