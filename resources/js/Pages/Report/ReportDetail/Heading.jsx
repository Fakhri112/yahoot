import NavBar from "@/Components/NavBar";
import ProfileSidebar from "@/Components/ProfileSidebar";
import React from "react";
import { Link } from "@inertiajs/react";
const Heading = ({
    children,
    quizReportId,
    currentTab,
    hostedBy,
    dateEnd,
    quizTitle,
    questionsTotal,
    playersTotal,
    originalQuizId,
}) => {
    return (
        <div className="h-screen bg-white overflow-hidden">
            <NavBar />
            <ProfileSidebar />
            <main className="ml-0 md:ml-24 h-[calc(100vh-11%)]  flex flex-col bg-slate-50 p-2 text-slate-900">
                <div className="h-full  overflow-y-auto">
                    <div className="bg-zinc-100">
                        <div className="lg:grid md:grid-cols-12 gap-x-20 p-2 mb-10">
                            <div className="flex justify-between lg:col-span-9">
                                <div>
                                    <p className="text-lg font-semibold">
                                        Report
                                    </p>
                                    <h1 className="text-3xl font-semibold">
                                        {quizTitle}
                                    </h1>
                                </div>
                                <Link
                                    href={"/detail/" + originalQuizId}
                                    className="text-lg hover:underline"
                                >
                                    View Quiz
                                </Link>
                            </div>
                            <div className="lg:col-span-3">
                                <p>{dateEnd}</p>
                                <hr className="my-2 border-slate-400 border h-[2px]" />
                                <p>Hosted by {hostedBy}</p>
                            </div>
                        </div>
                        <div className="flex pb-2">
                            <div className="flex gap-x-4">
                                <Link
                                    href={
                                        "/user/reports/" +
                                        quizReportId +
                                        "/summary"
                                    }
                                    className={`px-3 md:text-xl`}
                                >
                                    <p
                                        className={`${
                                            currentTab == "summary"
                                                ? "font-extrabold text-purple-800"
                                                : "font-semibold text-slate-600"
                                        }`}
                                    >
                                        Summary
                                    </p>
                                    {currentTab == "summary" ? (
                                        <hr className="border-b-purple-700 pb-1 border-transparent border border-2" />
                                    ) : null}
                                </Link>
                                <Link
                                    href={
                                        "/user/reports/" +
                                        quizReportId +
                                        "/players"
                                    }
                                    className={`px-3 md:text-xl`}
                                >
                                    <div className="flex gap-x-1">
                                        <p
                                            className={`${
                                                currentTab == "players"
                                                    ? "font-extrabold text-purple-800"
                                                    : "font-semibold text-slate-600"
                                            }`}
                                        >
                                            Players
                                        </p>
                                        <span className="text-slate-600">
                                            ({playersTotal})
                                        </span>
                                    </div>
                                    {currentTab == "players" ? (
                                        <hr className="border-b-purple-700 pb-1 border-transparent border border-2" />
                                    ) : null}
                                </Link>
                                <Link
                                    href={
                                        "/user/reports/" +
                                        quizReportId +
                                        "/questions"
                                    }
                                    className={`px-3 md:text-xl `}
                                >
                                    <div className="flex gap-x-1">
                                        <p
                                            className={`${
                                                currentTab == "questions"
                                                    ? "font-extrabold text-purple-800"
                                                    : "font-semibold text-slate-600"
                                            }`}
                                        >
                                            Questions
                                        </p>
                                        <span className="text-slate-600">
                                            ({questionsTotal})
                                        </span>
                                    </div>
                                    {currentTab == "questions" ? (
                                        <hr className="border-b-purple-700 pb-1 border-transparent border border-2" />
                                    ) : null}
                                </Link>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Heading;
