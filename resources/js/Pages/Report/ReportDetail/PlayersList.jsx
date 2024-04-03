import React, { useState } from "react";
import Heading from "./Heading";
import { useTable, useSortBy } from "react-table";
import CircularBar from "@/Components/svg/CircularBar";
import PlayerDetail from "./modal/PlayerDetail";
import { Head } from "@inertiajs/react";

const PlayersList = ({
    quizReportId,
    quizTitle,
    dateEnd,
    hostedBy,
    playersTotal,
    questionsTotal,
    playersDataList,
    columns,
    originalQuizId,
    pageTitle,
}) => {
    const [openModal, SetOpenModal] = useState(false);
    const [playerId, SetPlayerId] = useState("");
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data: playersDataList,
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
            currentTab={"players"}
            quizReportId={quizReportId}
        >
            <Head title={pageTitle + " - "} />
            <PlayerDetail
                open={openModal}
                playerId={playerId}
                SetClose={() => {
                    SetOpenModal(false);
                }}
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
                                        className={`${
                                            column.id == "player_name"
                                                ? "w-[20rem]"
                                                : column.id == "rank"
                                                ? "w-16"
                                                : column.id == "correct_answer"
                                                ? "w-[7rem]"
                                                : "w-[10rem]"
                                        }  
                                        ${
                                            column.id == "correct_answer" ||
                                            column.id == "unanswered"
                                                ? "max-[767px]:hidden"
                                                : ""
                                        }
                                        hover:bg-slate-200 border p-2 text-start border-b-slate-400 bg-zinc-100`}
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
                                    id={row.original.player_id}
                                    className="hover:bg-slate-100 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        sessionStorage.setItem(
                                            "player_summary_data",
                                            JSON.stringify(row.original)
                                        );
                                        SetPlayerId(e.currentTarget.id);
                                        SetOpenModal(true);
                                    }}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                className={`ps-2 text-xl p-2 ${
                                                    cell.column.id ==
                                                    "correct_answer"
                                                        ? "flex justify-end items-center gap-x-2"
                                                        : null
                                                }
                                                ${
                                                    cell.column.id ==
                                                    "player_name"
                                                        ? " font-semibold"
                                                        : "text-end"
                                                }

                                                ${
                                                    cell.column.id ==
                                                        "correct_answer" ||
                                                    cell.column.id ==
                                                        "unanswered"
                                                        ? "max-[767px]:hidden"
                                                        : ""
                                                }`}
                                                {...cell.getCellProps()}
                                            >
                                                {cell.column.id ==
                                                "correct_answer" ? (
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
                                                    cell.render("Cell")
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

export default PlayersList;
