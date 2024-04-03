import { ProgressBar } from "@/Components/ProgressBar";
import ChoiceReport from "@/Components/choice/ChoiceResult";
import CircularBar from "@/Components/svg/CircularBar";
import { Clock, PersonIcon } from "@/Components/svg/QuizReportIcon";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSortBy, useTable } from "react-table";

const QuestionDetail = ({ open, questionId, SetClose }) => {
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
            JSON.parse(sessionStorage.getItem("question_summary_data"))
        );
        let url = window.location.href;
        if (url.search("summary")) {
            url = url.replace("summary", "questions");
        }
        axios.post(url + "/" + "detail", { questionId }).then((res) => {
            SetColumns(res.data.columns);
            SetPlayerDetailData(res.data.question_data);
        });
    }, [open]);

    return (
        <ReactModal
            isOpen={open}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleClose}
            appElement={document.getElementById("app")}
            className=" relative rounded md:w-[90%] w-[95%] min-w-[320px] h-[92%] bg-white flex flex-col"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            {playerDetailData.length > 0 ? (
                <>
                    <div className=" bg-white border-b-slate-300 border-transparent border p-2 flex  justify-between ">
                        <div className="flex gap-x-2 items-center truncate">
                            <p className="w-16">
                                {summaryData.question_title[0]}-Quiz
                            </p>
                            <p className="text-md font-semibold w-[1000px] truncate">
                                {summaryData.question_title.slice(1)}
                            </p>
                        </div>
                        <button
                            className="md:text-2xl text-md ms-5"
                            onClick={handleClose}
                        >
                            &#10005;
                        </button>
                    </div>
                    <div className="overflow-scroll ">
                        <div className=" bg-gray-100 flex p-3 text-slate-800 gap-3">
                            <div className="flex max-w-80 flex-col gap-2">
                                <img
                                    className="sm:block hidden"
                                    src={summaryData.question_image}
                                    alt=""
                                />
                                <div className="flex justify-center items-center md:flex hidden gap-x-3">
                                    <Clock className={"h-7 fill-slate-500 "} />
                                    <p>{summaryData.duration}s time limit</p>
                                </div>
                            </div>
                            <div className="w-full flex-col flex gap-y-3">
                                <div className="border-b-slate-500 justify-between border-transparent border flex px-2 py-1">
                                    <div className="flex items-center gap-x-2 truncate me-3 w-full ">
                                        <ChoiceReport option={"A"} />
                                        <p>{summaryData.answer_list["A"]}</p>
                                    </div>
                                    <div className="flex w-7 lg:w-56  items-center justify-between">
                                        <div className="w-full flex items-center">
                                            <span className="text-green-700 font-semibold">
                                                &#x2713;
                                            </span>{" "}
                                            <ProgressBar
                                                progress={
                                                    summaryData.answer_total[
                                                        "A"
                                                    ]
                                                }
                                                progressTotal={
                                                    playerDetailData.length
                                                }
                                                className={
                                                    "bg-green-700 h-[7px] mx-2 transition-all rounded-full lg:block hidden"
                                                }
                                                hideNumber={true}
                                            />
                                        </div>
                                        <span className="text-end">
                                            {summaryData.answer_total["A"]}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-b-slate-500 border-transparent border justify-between flex px-2 py-1">
                                    <div className="flex items-center gap-x-2 truncate me-3 w-full ">
                                        <ChoiceReport option={"B"} />
                                        <p>{summaryData.answer_list["B"]}</p>
                                    </div>
                                    <div className="flex w-7 lg:w-56 items-center justiyf-between">
                                        <div className="w-full flex items-center">
                                            <span className="text-red-700 font-semibold">
                                                &#10005;
                                            </span>{" "}
                                            <ProgressBar
                                                progress={
                                                    summaryData.answer_total[
                                                        "B"
                                                    ]
                                                }
                                                progressTotal={
                                                    playerDetailData.length
                                                }
                                                className={
                                                    "bg-red-700 h-[7px] mx-2 transition-all rounded-full lg:block hidden"
                                                }
                                                hideNumber={true}
                                            />
                                        </div>
                                        <span className="text-end">
                                            {summaryData.answer_total["B"]}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-b-slate-500 border-transparent border justify-between flex px-2 py-1">
                                    <div className="flex items-center gap-x-2 truncate me-3 w-full ">
                                        <ChoiceReport option={"C"} />
                                        <p>{summaryData.answer_list["C"]}</p>
                                    </div>
                                    <div className="flex w-7 lg:w-56 items-center justiyf-between">
                                        <div className="w-full flex items-center">
                                            <span className="text-red-700 font-semibold">
                                                &#10005;
                                            </span>{" "}
                                            <ProgressBar
                                                progress={
                                                    summaryData.answer_total[
                                                        "C"
                                                    ]
                                                }
                                                progressTotal={
                                                    playerDetailData.length
                                                }
                                                className={
                                                    "bg-red-700 h-[7px] mx-2 transition-all rounded-full lg:block hidden"
                                                }
                                                hideNumber={true}
                                            />
                                        </div>
                                        <span className="text-end">
                                            {summaryData.answer_total["C"]}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-b-slate-500 border-transparent border justify-between flex px-2 py-1">
                                    <div className="flex items-center gap-x-2 truncate me-3 w-full ">
                                        <ChoiceReport option={"D"} />
                                        <p>{summaryData.answer_list["D"]}</p>
                                    </div>
                                    <div className="flex w-7 lg:w-56 items-center justiyf-between">
                                        <div className="w-full flex items-center">
                                            <span className="text-red-700 font-semibold">
                                                &#10005;
                                            </span>{" "}
                                            <ProgressBar
                                                progress={
                                                    summaryData.answer_total[
                                                        "D"
                                                    ]
                                                }
                                                progressTotal={
                                                    playerDetailData.length
                                                }
                                                className={
                                                    "bg-red-700 h-[7px] mx-2 transition-all rounded-full lg:block hidden"
                                                }
                                                hideNumber={true}
                                            />
                                        </div>
                                        <span className="text-end">
                                            {summaryData.answer_total["D"]}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-b-slate-500 border-transparent border justify-between flex px-2 py-1">
                                    <div className="flex items-center gap-x-2 truncate me-3 w-full ">
                                        <ChoiceReport />
                                        <p>No Answer</p>
                                    </div>
                                    <div className="flex w-7 lg:w-56 items-center justiyf-between">
                                        <div className="w-full flex items-center">
                                            <span className="text-red-700 font-semibold">
                                                &#10005;
                                            </span>{" "}
                                            <ProgressBar
                                                progress={
                                                    summaryData.answer_total[
                                                        "no_answer"
                                                    ]
                                                }
                                                progressTotal={
                                                    playerDetailData.length
                                                }
                                                className={
                                                    "bg-red-700 h-[7px] mx-2 transition-all rounded-full lg:block hidden"
                                                }
                                                hideNumber={true}
                                            />
                                        </div>
                                        <span className="text-end">
                                            {
                                                summaryData.answer_total[
                                                    "no_answer"
                                                ]
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-3 gap-x-10 px-5 flex-wrap">
                            <div className="pb-2 grow items-center justify-between flex border border-transparent border-b-slate-500">
                                <p className="text-zinc-900">Correct Answers</p>
                                <div className="flex items-center gap-x-2">
                                    <CircularBar
                                        classNameSvg={"h-6"}
                                        classNameText={"hidden"}
                                        percentage={
                                            summaryData.question_percentage
                                        }
                                    />
                                    <p className="font-bold">
                                        {summaryData.question_percentage}%
                                    </p>
                                </div>
                            </div>
                            <div className="pb-2 grow items-center justify-between flex border border-transparent border-b-slate-500">
                                <p className="text-zinc-900">
                                    Avg. answers time
                                </p>
                                <div className="flex items-center gap-x-2">
                                    <Clock className={"w-5 fill-slate-500 "} />
                                    <p className="font-bold">
                                        {summaryData.question_avg_answer_time.toFixed(
                                            2
                                        )}
                                        s
                                    </p>
                                </div>
                            </div>
                            <div className="pb-2 grow items-center justify-between flex border border-transparent border-b-slate-500">
                                <p className="text-zinc-900">Player answered</p>
                                <div className="flex items-center gap-x-2">
                                    <PersonIcon className="fill-purple-500" />
                                    <p className="font-bold">
                                        {summaryData.player_answered} of{" "}
                                        {playerDetailData.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 mb-2">
                            <table
                                {...getTableProps()}
                                className="w-full mt-5 table-fixed border-2 border border-slate-300 rounded"
                            >
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        className={`
                                                ${
                                                    column.id == "player_name"
                                                        ? "w-20"
                                                        : column.id == "time" ||
                                                          column.id == "points"
                                                        ? "w-10"
                                                        : column.id ==
                                                          "correct_incorrect"
                                                        ? "w-[7rem]"
                                                        : "w-[10rem]"
                                                }  
                                    ${
                                        column.id == "answered" ||
                                        column.id == "time" ||
                                        column.id == "points"
                                            ? "max-[767px]:hidden"
                                            : ""
                                    }  
                                        
                                        hover:bg-slate-200 border p-2 text-start border-b-slate-400 bg-zinc-100`}
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                    >
                                                        {column.render(
                                                            "Header"
                                                        )}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? " 🔽"
                                                                    : " 🔼"
                                                                : ""}
                                                        </span>
                                                    </th>
                                                )
                                            )}
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
                                                            className={`ps-2 lg:text-md p-2 ${
                                                                cell.column
                                                                    .id ==
                                                                "answered"
                                                                    ? "flex items-center gap-x-2"
                                                                    : null
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
                                                            ) : cell.column
                                                                  .id ==
                                                              "question_title" ? (
                                                                <>
                                                                    <span className="me-4">
                                                                        {
                                                                            cell
                                                                                .value[0]
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        {cell.value.slice(
                                                                            1
                                                                        )}
                                                                    </span>
                                                                </>
                                                            ) : cell.column
                                                                  .id ==
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
                                                            ) : cell.column
                                                                  .id ==
                                                              "time" ? (
                                                                <>
                                                                    {cell.value
                                                                        ? cell.value +
                                                                          "s"
                                                                        : "--"}
                                                                </>
                                                            ) : cell.column
                                                                  .id ==
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
                                                                                cell
                                                                                    .row
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
                                                                            No
                                                                            Answer
                                                                        </span>
                                                                    </>
                                                                )
                                                            ) : (
                                                                cell.render(
                                                                    "Cell"
                                                                )
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
                </>
            ) : null}
        </ReactModal>
    );
};

export default QuestionDetail;
