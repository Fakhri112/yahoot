import React from "react";

const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const CircularBar = ({ percentage, classNameText, classNameSvg, summary }) => {
    const pct = cleanPercentage(percentage);
    let circle = 566 - (pct / 100) * 566;

    return (
        <div className="grid place-items-center relative">
            <div className={`absolute text-center ` + classNameText}>
                <p className={`font-semibold text-2xl `}>{pct + "%"}</p>
                <p className="font-semibold">Correct</p>
            </div>
            <svg
                className={classNameSvg}
                viewBox="-25 -25 250 250"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "rotate(-90deg)" }}
            >
                <circle
                    r={90}
                    cx={100}
                    cy={100}
                    fill="transparent"
                    stroke={summary ? "#e0e0e0" : "red"}
                    strokeWidth={25}
                    strokeDasharray={566}
                    strokeDashoffset={0}
                />
                <circle
                    r={90}
                    cx={100}
                    cy={100}
                    stroke="green"
                    strokeWidth={25}
                    strokeLinecap="round"
                    strokeDashoffset={circle}
                    fill="transparent"
                    strokeDasharray={565.48}
                />
            </svg>
        </div>
    );
};

export default CircularBar;
