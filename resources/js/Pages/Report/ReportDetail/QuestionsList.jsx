import React, { useState } from "react";
import Heading from "./Heading";
import { useTable, useSortBy } from "react-table";
import CircularBar from "@/Components/svg/CircularBar";
import QuestionDetail from "./modal/QuestionDetail";
import { Head } from "@inertiajs/react";

const QuestionsList = ({
    quizReportId,
    quizTitle,
    dateEnd,
    hostedBy,
    playersTotal,
    questionsTotal,
    questionsDataList,
    originalQuizId,
    columns,
    pageTitle,
}) => {
    const [openModal, SetOpenModal] = useState(false);
    const [questionId, SetQuestionId] = useState("");
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data: questionsDataList,
            },
            useSortBy
        );

    return (
        <Heading
            originalQuizId={originalQuizId}
            questionsTotal={questionsTotal}
            playersTotal={playersTotal}
            hostedBy={hostedBy}
            dateEnd={dateEnd}
            quizTitle={quizTitle}
            currentTab={"questions"}
            quizReportId={quizReportId}
        >
            <Head title={pageTitle + " - "} />
            <QuestionDetail
                open={openModal}
                questionId={questionId}
                SetClose={() => SetOpenModal(false)}
            />
            <div className="mt-4 pb-20 mb-2 md:pb-0 px-2  gap-y-6 md:grid-cols-12 md:grid-rows-3">
                <table
                    {...getTableProps()}
                    className="w-full border-2 border border-slate-300 rounded"
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        className={`
                                    ${
                                        column.id == "question_percentage"
                                            ? "text-end"
                                            : ""
                                    }
                                    border p-2 text-start border-b-slate-400 bg-zinc-100`}
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                    >
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? " 🔽"
                                                    : " 🔼"
                                                : ""}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    id={row.original.question_id}
                                    className="hover:bg-slate-100 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        sessionStorage.setItem(
                                            "question_summary_data",
                                            JSON.stringify(row.original)
                                        );
                                        SetQuestionId(e.currentTarget.id);
                                        SetOpenModal(true);
                                    }}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                className={`ps-2 text-xl p-2 ${
                                                    cell.column.id ==
                                                    "question_percentage"
                                                        ? "flex justify-end items-center gap-x-2"
                                                        : null
                                                }
                                            ${
                                                cell.column.id ==
                                                "question_title"
                                                    ? " font-semibold"
                                                    : "text-end"
                                            }`}
                                                {...cell.getCellProps()}
                                            >
                                                {cell.column.id ==
                                                "question_percentage" ? (
                                                    <>
                                                        <CircularBar
                                                            percentage={
                                                                cell.value
                                                            }
                                                            classNameSvg={"w-7"}
                                                            classNameText={
                                                                "hidden"
                                                            }
                                                        />
                                                        <p className="w-16">
                                                            {cell.value + " %"}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="me-4">
                                                            {cell.value[0]}
                                                        </span>
                                                        <span>
                                                            {cell.value.slice(
                                                                1
                                                            )}
                                                        </span>
                                                    </>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Heading>
    );
};

export default QuestionsList;
