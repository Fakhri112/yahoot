import {
    useReportsListDispatch,
    useReportsListState,
} from "@/Components/context/ReportsListContext";
import React, { useState } from "react";

const ReportNav = () => {
    const { quizReportsData, selectedQuizReports, bulkSelect, modal, orderBy } =
        useReportsListState();
    const dispatch = useReportsListDispatch();

    const handleSelectAll = (e) => {
        let allCheckboxIds = [];
        if (e.target.checked) {
            dispatch({ type: "UPDATE_BULK_SELECT", payload: true });
            allCheckboxIds = quizReportsData.map((item) => item.id);
        }

        if (allCheckboxIds.length == 0)
            dispatch({ type: "UPDATE_BULK_SELECT", payload: false });

        return dispatch({
            type: "UPDATE_SELECTED_QUIZ_REPORTS_DATA",
            payload: allCheckboxIds,
        });
    };

    const handleDelete = () => {
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                deletion: !modal.deletion,
            },
        });
    };

    const handleSortBy = (e) => {
        switch (e.target.value) {
            case "oldest":
                dispatch({
                    type: "UPDATE_ORDER_BY",
                    payload: {
                        query: ["created_at", "asc"],
                        sortName: e.target.value,
                    },
                });

                break;
            case "latest":
                dispatch({
                    type: "UPDATE_ORDER_BY",
                    payload: {
                        query: ["created_at", "desc"],
                        sortName: e.target.value,
                    },
                });

                break;
            case "players":
                dispatch({
                    type: "UPDATE_ORDER_BY",
                    payload: {
                        query: ["total_players", "desc"],
                        sortName: e.target.value,
                    },
                });

                break;
            case "name":
                dispatch({
                    type: "UPDATE_ORDER_BY",
                    payload: {
                        query: ["quiz_title", "asc"],
                        sortName: e.target.value,
                    },
                });

                break;

            default:
                break;
        }
        dispatch({
            type: "UPDATE_FETCH_DATA",
            payload: true,
        });
        dispatch({ type: "RELOAD_QUIZ_REPORTS_DATA" });
    };

    return (
        <>
            {quizReportsData.length != 0 ? (
                <div
                    className={`${
                        selectedQuizReports.length != 0 &&
                        bulkSelect &&
                        Array.isArray(selectedQuizReports)
                            ? "bg-sky-600"
                            : "bg-slate-200"
                    } drop-shadow-md p-2 mb-2 items-center flex justify-between`}
                >
                    <div>
                        <input
                            checked={
                                selectedQuizReports.length ==
                                quizReportsData.length
                            }
                            onChange={handleSelectAll}
                            type="checkbox"
                            name="selectAll"
                            id="selectAll"
                        />
                        <label
                            htmlFor="selectAll"
                            className={`ms-4 font-semibold ${
                                selectedQuizReports.length != 0 &&
                                bulkSelect &&
                                Array.isArray(selectedQuizReports)
                                    ? "text-white"
                                    : "text-slate-900"
                            }`}
                        >
                            Select All
                        </label>
                    </div>

                    {selectedQuizReports.length != 0 &&
                    bulkSelect &&
                    Array.isArray(selectedQuizReports) ? (
                        <button
                            onClick={handleDelete}
                            className="btn-secondary py-2 px-3 bg-white"
                        >
                            Delete
                        </button>
                    ) : (
                        <div className="flex items-center">
                            <label
                                className="bg-white md:text-md text-sm p-2 border border-r-0 rounded-l-md border-slate-300"
                                htmlFor="cars"
                            >
                                Sort By :
                            </label>
                            <select
                                value={orderBy.sortName}
                                id="cars"
                                onChange={handleSortBy}
                                className="md:text-md text-sm cursor-pointer border-slate-300 rounded-r-md font-semibold border-l-0"
                            >
                                <option
                                    value="name"
                                    className="md:text-md text-sm "
                                >
                                    Name
                                </option>
                                <option
                                    value="oldest"
                                    className="md:text-md text-sm "
                                >
                                    Date Oldest
                                </option>
                                <option
                                    value="latest"
                                    className="md:text-md text-sm "
                                >
                                    Date Latest
                                </option>
                                <option
                                    value="players"
                                    className="md:text-md text-sm "
                                >
                                    Most Players
                                </option>
                            </select>
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default ReportNav;
