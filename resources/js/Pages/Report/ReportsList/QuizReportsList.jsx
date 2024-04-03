import {
    useReportsListDispatch,
    useReportsListState,
} from "@/Components/context/ReportsListContext";
import { ReportsListDropdown } from "@/Components/dropdown/ReportListDropdown";
import { Link } from "@inertiajs/react";
import { cloneDeep } from "lodash";
import React from "react";

const QuizReportsList = () => {
    const { quizReportsData, selectedQuizReports, modal, rename } =
        useReportsListState();
    const dispatch = useReportsListDispatch();

    const handleCheck = (quiz_id) => {
        let selectedQuizCopy = cloneDeep(selectedQuizReports);
        if (selectedQuizCopy.includes(quiz_id)) {
            selectedQuizCopy.splice(selectedQuizCopy.indexOf(quiz_id), 1);
        } else {
            selectedQuizCopy.push(quiz_id);
            dispatch({ type: "UPDATE_BULK_SELECT", payload: true });
        }
        dispatch({
            type: "UPDATE_SELECTED_QUIZ_REPORTS_DATA",
            payload: selectedQuizCopy,
        });
        if (selectedQuizCopy.length == 0) {
            dispatch({ type: "UPDATE_BULK_SELECT", payload: false });
        }
    };

    const handleRename = (e) => {
        dispatch({
            type: "UPDATE_RENAME_DATA",
            payload: {
                ...rename,
                id: e.target.getAttribute("data-id"),
                name: e.target.getAttribute("data-name"),
            },
        });

        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                rename: !modal.rename,
            },
        });
    };

    const handleDeletion = (e) => {
        dispatch({
            type: "UPDATE_SELECTED_QUIZ_REPORTS_DATA",
            payload: [e.target.getAttribute("data-id")],
        });
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                deletion: !modal.deletion,
            },
        });
    };

    return (
        <>
            {quizReportsData.map((data, index) => (
                <div
                    key={index}
                    className={`shadow-md mb-2 flex bg-white  p-2 justify-between`}
                >
                    <div className=" flex items-center gap-x-2">
                        <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={selectedQuizReports.includes(data.id)}
                            onChange={() => handleCheck(data.id)}
                        />
                        <div className="flex flex-col">
                            <Link
                                href={"reports/" + data.id + "/summary"}
                                className="font-bold no-underline hover:underline"
                            >
                                {data.quiz_title}
                            </Link>
                            <p>Ended {data.created_at}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p>{data.total_players} Player</p>
                        <ReportsListDropdown
                            name={data.quiz_title}
                            id={data.id}
                            handleRename={handleRename}
                            handleDelete={handleDeletion}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default QuizReportsList;
