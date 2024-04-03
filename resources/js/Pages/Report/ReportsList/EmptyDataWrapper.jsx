import { useReportsListState } from "@/Components/context/ReportsListContext";
import { Spinner } from "@/Components/svg/Spinner";
import React from "react";

const EmptyDataWrapper = ({ children }) => {
    const { fetchData, quizReportsData } = useReportsListState();

    return (
        <>
            {!fetchData & (quizReportsData.length == 0) ? (
                <div className="text-slate-500 text-lg grid place-items-center h-full">
                    Reports Data is Empty ☹
                </div>
            ) : !fetchData ? (
                <>{children}</>
            ) : (
                <div className="grid place-items-center h-full">
                    <Spinner />
                </div>
            )}
        </>
    );
};

export default EmptyDataWrapper;
