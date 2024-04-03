import React from "react";
import ChoiceGraph from "@/Components/choice/ChoiceGraph";

const AnswerResultGraph = ({ playersAnswerContainer, onClick }) => {
    const countPlayerDatas = (playersData, choiceChar, getHeightPercentage) => {
        let count = playersData.filter(
            (data) => data.answer == choiceChar
        ).length;
        if (!getHeightPercentage) return count;
        return `${Math.floor((100 * count) / playersData.length)}%`;
    };

    return (
        <div className=" p-5 row-span-6 relative flex items-center justify-center w-full">
            <div className="h-40 flex sm:gap-x-10 gap-x-4 items-end">
                <ChoiceGraph
                    height={countPlayerDatas(playersAnswerContainer, "A", true)}
                    answer={"A"}
                    count={countPlayerDatas(playersAnswerContainer, "A")}
                />
                <ChoiceGraph
                    height={countPlayerDatas(playersAnswerContainer, "B", true)}
                    answer={"B"}
                    count={countPlayerDatas(playersAnswerContainer, "B")}
                />
                <ChoiceGraph
                    height={countPlayerDatas(playersAnswerContainer, "C", true)}
                    answer={"C"}
                    count={countPlayerDatas(playersAnswerContainer, "C")}
                />
                <ChoiceGraph
                    height={countPlayerDatas(playersAnswerContainer, "D", true)}
                    answer={"D"}
                    count={countPlayerDatas(playersAnswerContainer, "D")}
                />
            </div>
            <button
                onClick={onClick}
                className="absolute btn-3d py-2 px-4 top-2
                 right-0 m-5  border-b-slate-400 bg-slate-200 text-black"
            >
                Next &rarr;
            </button>
        </div>
    );
};

export default AnswerResultGraph;
