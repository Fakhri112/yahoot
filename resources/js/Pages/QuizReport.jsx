import NavBar from "@/Components/NavBar";
import ProfileSidebar from "@/Components/ProfileSidebar";
import {
    PersonIcon,
    QuestionMark,
    Clock,
} from "@/Components/svg_component/QuizReportIcon";
import { Link } from "@inertiajs/react";
import React from "react";

const QuizReport = () => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main className="ml-0 md:ml-24 h-[calc(100vh-11%)] bg-slate-50 p-2 text-slate-900">
                    <div className="h-full overflow-y-auto">
                        <div className="lg:grid md:grid-cols-12 gap-x-20 p-2 mb-10">
                            <div className="flex justify-between lg:col-span-9">
                                <div>
                                    <p className="text-lg font-semibold">
                                        Report
                                    </p>
                                    <h1 className="text-3xl font-semibold">
                                        Hello World
                                    </h1>
                                </div>
                                <a href="" className="text-lg hover:underline">
                                    View Quiz
                                </a>
                            </div>
                            <div className="lg:col-span-3">
                                <p>Aug 16, 2023, 10:56 AM</p>
                                <hr className="my-2 border-black h-[2px]" />
                                <p>Hosted by Fakhrie_ali</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="">
                                <Link
                                    href="/user/reports/293"
                                    className="tab text-xl font-semibold tab-bordered tab-active "
                                >
                                    Summary
                                </Link>
                                <Link
                                    href="/user/reports/293/players"
                                    className="tab tab-bordered font-semibold  text-xl"
                                >
                                    Players
                                </Link>
                                <Link
                                    href="/user/reports/293/question"
                                    className="tab tab-bordered font-semibold  text-xl"
                                >
                                    Question
                                </Link>
                            </div>
                        </div>
                        <div className="mt-4 pb-20 mb-2 md:pb-0  grid grid-cols-12 gap-y-6 md:grid-cols-12 md:grid-rows-3">
                            <div
                                className="flex col-span-12 md:col-span-8 border 
                                    p-4 bg-white gap-5 drop-shadow-xl w-full md:w-[89%] row-span-1"
                            >
                                <div
                                    className="radial-progress shrink-0 text-green-800"
                                    style={{
                                        "--value": "70",
                                        "--size": "8rem",
                                        "--thickness": "1rem",
                                    }}
                                >
                                    70%
                                </div>
                                <div>
                                    <h1 className="font-bold text-2xl">
                                        Well Played
                                    </h1>
                                    <p className="mb-4">
                                        Play again and let the same group
                                        improve their score or see if new
                                        players can beat this result.
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
                                className="col-span-12 md:col-span-3 drop-shadow-xl bg-white flex justify-around
                                            gap-2 flex-col border p-2 "
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <PersonIcon className="fill-purple-500" />
                                        <p>Players</p>
                                    </div>
                                    <p>1</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <QuestionMark className="fill-blue-500" />
                                        <p>Question</p>
                                    </div>
                                    <p>1</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <Clock className="fill-green-500" />
                                        <p>Time</p>
                                    </div>
                                    <p>1</p>
                                </div>
                            </div>
                            <div
                                className="col-span-12 order-2 md:order-[unset] w-full md:w-[89%] border md:col-span-8 bg-white 
                                         drop-shadow-xl p-3 row-span-2"
                            >
                                <h1 className="font-bold text-xl">
                                    Difficult Question
                                </h1>
                                <div className="grid place-items-center h-full">
                                    <p className="p-4">
                                        Great job! No one found any questions
                                        too challenging.
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-3 drop-shadow-xl bg-white p-3">
                                <h1 className="font-bold text-lg">
                                    Didn't Finish
                                </h1>
                                <div className="flex justify-between">
                                    <p>Yes</p>
                                    <p>40%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default QuizReport;
