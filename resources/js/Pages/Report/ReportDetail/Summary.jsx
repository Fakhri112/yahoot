import React, { useState } from "react";
import Heading from "./Heading";
import CircularBar from "@/Components/svg/CircularBar";
import {
    PersonIcon,
    QuestionMark,
    Clock,
} from "@/Components/svg/QuizReportIcon";
import PlayerDetail from "./modal/PlayerDetail";
import QuestionDetail from "./modal/QuestionDetail";
import { Head } from "@inertiajs/react";

const Summary = ({
    quizReportId,
    difficultQuestion,
    didntFinish,
    summaryPerentage,
    quizTitle,
    dateEnd,
    time,
    hostedBy,
    playersTotal,
    questionsTotal,
    originalQuizId,
    pageTitle,
}) => {
    const [playerId, SetPlayerId] = useState("");
    const [questionId, SetQuestionId] = useState("");
    const [openPlayerDetail, SetOpenPlayerDetail] = useState(false);
    const [openQuestionDetail, SetOpenQuestionDetail] = useState(false);
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <Heading
            originalQuizId={originalQuizId}
            questionsTotal={questionsTotal}
            playersTotal={playersTotal}
            hostedBy={hostedBy}
            dateEnd={dateEnd}
            quizTitle={quizTitle}
            currentTab={"summary"}
            quizReportId={quizReportId}
        >
            <Head title={pageTitle + " - "} />
            <PlayerDetail
                open={openPlayerDetail}
                playerId={playerId}
                SetClose={() => {
                    SetOpenPlayerDetail(false);
                }}
            />
            <QuestionDetail
                open={openQuestionDetail}
                questionId={questionId}
                SetClose={() => SetOpenQuestionDetail(false)}
            />
            <div className="mt-4 pb-20 mb-2 md:pb-0  grid grid-cols-12 gap-y-6 md:grid-cols-12 ">
                <div
                    className="self-start flex col-span-12 md:col-span-8 border 
                                    p-4 bg-white gap-5 drop-shadow-xl w-full md:w-[89%] row-span-1"
                >
                    <CircularBar
                        percentage={summaryPerentage}
                        summary={true}
                        classNameSvg={"w-40"}
                        classNameText={""}
                    />
                    <div>
                        <h1 className="font-bold text-2xl">
                            {summaryPerentage > 50
                                ? "Well Played"
                                : "Practice makes perfect!"}
                        </h1>
                        <p className="mb-4">
                            Play again and let the same group improve their
                            score or see if new players can beat this result.
                        </p>
                        <a
                            href="#"
                            className="bg-blue-500 p-3 rounded text-semibold text-slate-200
                                    "
                        >
                            Play Again
                        </a>
                    </div>
                </div>
                <div
                    className="col-span-12 md:col-span-3
                     drop-shadow-xl bg-white flex justify-around
                     md:gap-2 gap-4 flex-col border p-2 "
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <PersonIcon className="fill-purple-500" />
                            <p className="lg:text-xl md:text-md sm:text:lg text-md">
                                Players
                            </p>
                        </div>
                        <p className="lg:text-xl md:text-md sm:text:lg text-md font-semibold">
                            {playersTotal}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <QuestionMark className="fill-blue-500" />
                            <p className="lg:text-xl md:text-md sm:text:lg text-md">
                                Question
                            </p>
                        </div>
                        <p className="lg:text-xl md:text-md sm:text:lg text-md font-semibold">
                            {questionsTotal}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <Clock className="fill-green-500" />
                            <p className="lg:text-xl md:text-md sm:text:lg text-md">
                                Time
                            </p>
                        </div>
                        <p className="lg:text-xl md:text-md sm:text:lg text-md font-semibold">
                            {formatTime(time)}
                        </p>
                    </div>
                </div>
                <div
                    className=" col-span-12 order-2 md:order-[unset] w-full md:w-[89%] border md:col-span-8 bg-white 
                                    self-start  drop-shadow-xl row-span-1 flex-col flex"
                >
                    <h1 className="font-bold text-xl p-3 border">
                        Difficult Question
                    </h1>

                    {difficultQuestion.length > 0 ? (
                        <div className="p-2">
                            {difficultQuestion.map((data, index) => (
                                <div
                                    key={index}
                                    id={data.question_id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        sessionStorage.setItem(
                                            "question_summary_data",
                                            JSON.stringify(data)
                                        );
                                        SetQuestionId(e.currentTarget.id);
                                        SetOpenQuestionDetail(true);
                                    }}
                                    className="flex flex-col cursor-pointer hover:bg-slate-100 border border-slate-300"
                                >
                                    <div className="flex justify-between p-2 px-4">
                                        <div className="">
                                            <p className="text-md">
                                                {data.question_title[0]}-Quiz
                                            </p>
                                            <p className="text-xl font-bold">
                                                {data.question_title.slice(1)}
                                            </p>
                                        </div>
                                        <img
                                            className="w-48"
                                            src={data.question_image}
                                            alt=""
                                        />
                                    </div>
                                    <div className=" justify-evenly flex py-1 bg-slate-200">
                                        <div className="flex gap-x-2 items-center">
                                            <CircularBar
                                                percentage={
                                                    data.question_percentage
                                                }
                                                classNameSvg={"w-7"}
                                                classNameText={"hidden"}
                                            />
                                            <p>
                                                {data.question_percentage}%
                                                correct
                                            </p>
                                        </div>
                                        <div className="flex gap-x-2 items-center">
                                            <Clock className="fill-slate-700 h-4" />
                                            <p>
                                                Avg.{" "}
                                                {data.question_avg_answer_time}{" "}
                                                sec
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid place-items-center h-full  ">
                            <p className="p-4">
                                Great job! No one found any questions too
                                challenging.
                            </p>
                        </div>
                    )}
                </div>
                <div className="col-span-12 md:col-span-3 self-start drop-shadow-xl bg-white flex flex-col">
                    <h1 className="font-bold text-lg border borde-slate-400 p-3">
                        Didn't Finish
                    </h1>
                    {didntFinish.length > 0 ? (
                        didntFinish.map((data, index) => (
                            <div
                                key={index}
                                className="flex justify-between py-2 px-3 cursor-pointer"
                                id={data.player_id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    sessionStorage.setItem(
                                        "player_summary_data",
                                        JSON.stringify(data)
                                    );
                                    SetPlayerId(e.currentTarget.id);
                                    SetOpenPlayerDetail(true);
                                }}
                            >
                                <p className="no-underline hover:underline">
                                    {data.player_name}
                                </p>
                                <p>{data.unanswered}</p>
                            </div>
                        ))
                    ) : (
                        <div className="grid place-items-center py-2 px-3 h-full">
                            Great! Everyone is finished
                        </div>
                    )}
                </div>
            </div>
        </Heading>
    );
};

export default Summary;
