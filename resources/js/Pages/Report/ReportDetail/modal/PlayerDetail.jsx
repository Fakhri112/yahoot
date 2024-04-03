import ChoiceReport from "@/Components/choice/ChoiceResult";
import CircularBar from "@/Components/svg/CircularBar";
import { ReportGraph } from "@/Components/svg/ProfileSidebarIcon";
import {
    Badge,
    PersonIcon,
    QuestionMark,
} from "@/Components/svg/QuizReportIcon";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSortBy, useTable } from "react-table";

const PlayerDetail = ({ open, playerId, SetClose }) => {
    const [playerDetailData, SetPlayerDetailData] = useState([]);
    const [columns, SetColumns] = useState([]);
    const [summaryData, SetSummaryData] = useState({});
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data: playerDetailData,
            },
            useSortBy
        );

    const handleClose = () => {
        SetClose(true);
        SetPlayerDetailData([]);
    };

    useEffect(() => {
        if (!open) return;
        SetSummaryData(
            JSON.parse(sessionStorage.getItem("player_summary_data"))
        );
        let url = window.location.href;
        if (url.search("summary")) {
            url = url.replace("summary", "players");
        }
        axios.post(url + "/" + "detail", { id: playerId }).then((res) => {
            SetColumns(res.data.columns);
            SetPlayerDetailData(res.data.player_data);
        });
    }, [open]);

    return (
        <ReactModal
            isOpen={open}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleClose}
            appElement={document.getElementById("app")}
            className="overflow-y-auto relative rounded md:w-[90%] w-[95%] min-w-[320px] h-[92%] bg-white flex flex-col"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            <div className="md:text-2xl text-md font-semibold border border-slate-400 p-2 flex justify-between">
                <div className="flex gap-x-2">
                    <PersonIcon className={"h-20 stroke-zinc-700"} />
                    <p>{summaryData.player_name}</p>
                </div>
                <button onClick={handleClose}>&#10005;</button>
            </div>
            <div className="">
                <div className="p-7 flex justify-between items-center">
                    <div className="flex  max-[639px]:hidden items-center min-w-32 lg:flex-row flex-col">
                        <CircularBar
                            percentage={summaryData.correct_answer}
                            classNameSvg={"h-28"}
                            classNameText={"hidden"}
                        />
                        <div className="text-slate-800 text-center">
                            <p className="text-2xl font-extrabold">
                                {summaryData.correct_answer}%
                            </p>
                            <p className="font-semibold  text-xl">Correct</p>
                        </div>
                    </div>
                    <div className="sm:max-w-96 min-w-72 sm:w-[60%] w-full px-7">
                        <div>
                            <div className=" sm:hidden block mb-4 flex justify-between border-transparent border border-b-slate-400">
                                <p>Correct</p>
                                <div className="flex items-center gap-x-2 ">
                                    <CircularBar
                                        percentage={summaryData.correct_answer}
                                        classNameSvg={"h-5"}
                                        classNameText={"hidden"}
                                    />
                                    <p className="font-bold">
                                        {summaryData.rank} of{" "}
                                        {summaryData.player_count}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4 flex justify-between border-transparent border border-b-slate-400">
                                <p>Rank</p>
                                <div className="flex items-center gap-x-2 ">
                                    <ReportGraph
                                        className={"w-5 fill-violet-700"}
                                    />
                                    <p className="font-bold">
                                        {summaryData.rank} of{" "}
                                        {summaryData.player_count}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex mb-4 justify-between border-transparent border border-b-slate-400">
                                <p>Final Score</p>
                                <div className="flex items-center gap-x-2 ">
                                    <Badge className={"w-5 fill-teal-600"} />
                                    <p className="font-bold">
                                        {summaryData.final_score}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex  md:hidden justify-between border-transparent border border-b-slate-400">
                            <p>Questions Answered</p>
                            <div className="flex items-center gap-x-2 ">
                                <QuestionMark className={"w-5 fill-blue-600"} />
                                <p className="font-bold">
                                    {playerDetailData.length -
                                        summaryData.unanswered}{" "}
                                    of {playerDetailData.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:block hidden max-w-80">
                        <div>
                            <div className="flex  justify-between border-transparent border border-b-slate-400">
                                <p>Questions Answered</p>
                                <div className="flex items-center gap-x-2 ">
                                    <QuestionMark
                                        className={"w-5 fill-blue-600"}
                                    />
                                    <p className="font-bold">
                                        {playerDetailData.length -
                                            summaryData.unanswered}{" "}
                                        of {playerDetailData.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 mb-2 overflow-auto border-black">
                    <table
                        {...getTableProps()}
                        className="w-full text-md table-auto md:table-fixed border-2 border border-slate-300 rounded"
                    >
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            className={`
                                    oveflow-auto
                                    ${
                                        column.id == "answered" ||
                                        column.id == "time" ||
                                        column.id == "points"
                                            ? "max-[767px]:hidden"
                                            : ""
                                    }  
                                    ${
                                        column.id == "player_name"
                                            ? "w-[20rem] min"
                                            : column.id == "time" ||
                                              column.id == "points"
                                            ? "w-10"
                                            : column.id ==
                                                  "correct_incorrect" ||
                                              column.id == "answered"
                                            ? "w-[5rem]"
                                            : "w-[10rem]"
                                    }  
                                        hover:bg-slate-200 border p-2 text-start border-b-slate-400 bg-zinc-100`}
                                            {...column.getHeaderProps(
                                                column.getSortByToggleProps()
                                            )}
                                        >
                                            <span>
                                                {column.render("Header")}
                                            </span>
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
                                // console.log(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    className={`ps-2 max-[767px]:text-sm p-2 ${
                                                        cell.column.id ==
                                                        "answered"
                                                            ? "flex items-center gap-x-2"
                                                            : ""
                                                    }
                                                ${
                                                    cell.column.id ==
                                                    "question_title"
                                                        ? "font-semibold truncate"
                                                        : ""
                                                }
                                                ${
                                                    cell.column.id ==
                                                        "answered" ||
                                                    cell.column.id == "time" ||
                                                    cell.column.id == "points"
                                                        ? "max-[767px]:hidden"
                                                        : ""
                                                }  
                                                `}
                                                    {...cell.getCellProps()}
                                                >
                                                    {cell.column.id ==
                                                    "correct_answer" ? (
                                                        <>
                                                            <CircularBar
                                                                percentage={
                                                                    cell.value
                                                                }
                                                                classNameSvg={
                                                                    "w-7"
                                                                }
                                                                classNameText={
                                                                    "hidden"
                                                                }
                                                            />
                                                            <p className="w-16">
                                                                {cell.value +
                                                                    " %"}
                                                            </p>
                                                        </>
                                                    ) : cell.column.id ==
                                                      "question_title" ? (
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
                                                    ) : cell.column.id ==
                                                      "correct_incorrect" ? (
                                                        <>
                                                            {cell.value ==
                                                            true ? (
                                                                <span className="me-4">
                                                                    <span className="text-green-700 font-semibold">
                                                                        &#x2713;
                                                                    </span>{" "}
                                                                    Correct
                                                                </span>
                                                            ) : (
                                                                <span className="me-4">
                                                                    <span className="text-red-700 font-semibold">
                                                                        &#10005;
                                                                    </span>{" "}
                                                                    Incorrect
                                                                </span>
                                                            )}
                                                        </>
                                                    ) : cell.column.id ==
                                                      "time" ? (
                                                        <>
                                                            {cell.value
                                                                ? cell.value +
                                                                  "s"
                                                                : "--"}
                                                        </>
                                                    ) : cell.column.id ==
                                                      "answered" ? (
                                                        cell.value ? (
                                                            <>
                                                                <span>
                                                                    <ChoiceReport
                                                                        option={
                                                                            cell.value
                                                                        }
                                                                    />
                                                                </span>
                                                                <span>
                                                                    {
                                                                        cell.row
                                                                            .original[
                                                                            cell
                                                                                .value
                                                                        ]
                                                                    }
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>
                                                                    <ChoiceReport />
                                                                </span>
                                                                <span>
                                                                    No Answer
                                                                </span>
                                                            </>
                                                        )
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
            </div>
        </ReactModal>
    );
};

export default PlayerDetail;
