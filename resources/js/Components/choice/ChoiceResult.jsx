import React from "react";
import { Circle, Rhombus, Square, Triangle } from "../svg/Shape";
const ChoiceReport = ({ option }) => {
    return (
        <>
            {option == "A" ? (
                <Triangle
                    className={"h-7 rounded-sm p-1 bg-red-700 fill-white"}
                />
            ) : option == "B" ? (
                <Rhombus
                    className={"h-7 rounded-sm p-1  bg-sky-600 fill-white"}
                />
            ) : option == "C" ? (
                <Circle
                    className={"h-7 rounded-sm p-1  bg-amber-600 fill-white"}
                />
            ) : option == "D" ? (
                <Square
                    className={"h-7 rounded-sm p-1  bg-green-600 fill-white"}
                />
            ) : (
                <div className="h-7 w-7 border-slate-400 rounded border bg-white"></div>
            )}
        </>
    );
};

export default ChoiceReport;
