import React from "react";
import { Circle, Rhombus, Square, Triangle } from "@/Components/svg/Shape";
const ChoiceButton = ({ onClick, name, shape }) => {
    return (
        <button
            onClick={onClick}
            name={name}
            className={`btn-3d grid place-items-center 
        ${
            shape == "triangle"
                ? "bg-red-700 border-red-600"
                : shape == "rhombus"
                ? " bg-sky-600 border-sky-500"
                : shape == "circle"
                ? "bg-amber-600 border-amber-500"
                : shape == "square"
                ? "bg-green-600 border-green-500"
                : null
        }`}
        >
            {shape == "triangle" ? (
                <Triangle
                    className={"h-28 sm:h-40 fill-white pointer-events-none"}
                />
            ) : shape == "rhombus" ? (
                <Rhombus
                    className={"h-28 sm:h-40 fill-white pointer-events-none"}
                />
            ) : shape == "circle" ? (
                <Circle
                    className={"h-28 sm:h-40 fill-white pointer-events-none"}
                />
            ) : shape == "square" ? (
                <Square
                    className={"h-28 sm:h-40 fill-white pointer-events-none"}
                />
            ) : null}
        </button>
    );
};

export default ChoiceButton;
