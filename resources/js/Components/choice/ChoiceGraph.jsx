import React from "react";
import { Triangle, Rhombus, Circle, Square } from "@/Components/svg/Shape";

const ChoiceGraph = ({ height, count, answer }) => {
    return (
        <div className="flex flex-col h-full justify-end">
            <div
                style={{ height }}
                className={`${height}  md:w-20 w-16 ${
                    answer == "A"
                        ? "bg-red-700 "
                        : answer == "B"
                        ? " bg-sky-600 "
                        : answer == "C"
                        ? "bg-amber-700 "
                        : answer == "D"
                        ? "bg-green-700 "
                        : null
                } flex items-end`}
            ></div>
            <p
                className={`${
                    answer == "A"
                        ? "bg-red-600 "
                        : answer == "B"
                        ? " bg-sky-500 "
                        : answer == "C"
                        ? "bg-amber-600 "
                        : answer == "D"
                        ? "bg-green-600 "
                        : null
                } text-white w-full flex justify-center`}
            >
                {answer == "A" ? (
                    <Triangle className="px-1 fill-white w-6 rounded" />
                ) : answer == "B" ? (
                    <Rhombus className="px-1 fill-white w-6 rounded" />
                ) : answer == "C" ? (
                    <Circle className="px-1 fill-white w-6 rounded" />
                ) : answer == "D" ? (
                    <Square className="px-1 fill-white w-6 rounded" />
                ) : null}

                {count}
            </p>
        </div>
    );
};

export default ChoiceGraph;
