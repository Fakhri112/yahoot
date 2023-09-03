import ProfileSidebar from "@/Components/ProfileSidebar";
import PersonIcon from "@/Components/svg_component/PersonIcon";
import React from "react";

const QuizReport = () => {
    return (
        <>
            <div className="h-screen bg-white">
                <nav className="z-10 shadow-md py-3 px-5 relative w-full flex justify-between items-center">
                    <div className="flex items-center gap-x-16">
                        <h4 className="font-josefin font-semibold text-2xl text-violet-800">
                            Yahoot!
                        </h4>
                    </div>
                    <div className="flex items-center gap-x-6">
                        <button className="bg-blue-700 py-2 px-3 font-semibold text-slate-100 rounded">
                            Create
                        </button>
                        <div>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                        opacity="0.4"
                                        d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z"
                                        fill="#292D32"
                                    ></path>{" "}
                                    <path
                                        d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z"
                                        fill="#292D32"
                                    ></path>{" "}
                                    <path
                                        d="M18.7807 19.36C17.0007 21 14.6207 22.01 12.0007 22.01C9.3807 22.01 7.0007 21 5.2207 19.36C5.4607 18.45 6.1107 17.62 7.0607 16.98C9.7907 15.16 14.2307 15.16 16.9407 16.98C17.9007 17.62 18.5407 18.45 18.7807 19.36Z"
                                        fill="#292D32"
                                    ></path>{" "}
                                </g>
                            </svg>
                        </div>
                    </div>
                </nav>
                <ProfileSidebar />
                <main className="ml-24 h-[calc(100vh-11%)] bg-slate-50 p-2 text-slate-900">
                    <div className="h-full overflow-y-auto">
                        <div className="grid grid-cols-12 gap-x-20 p-2 mb-10">
                            <div className="flex justify-between col-span-9">
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
                            <div className="col-span-3">
                                <p>Aug 16, 2023, 10:56 AM</p>
                                <hr className="my-2 border-black h-[2px]" />
                                <p>Hosted by Fakhrie_ali</p>
                            </div>
                        </div>
                        <div class="tabs" data-theme="light">
                            <a class="tab text-xl font-semibold tab-bordered tab-active ">
                                Summary
                            </a>
                            <a class="tab tab-bordered font-semibold  text-xl">
                                Players
                            </a>
                            <a class="tab tab-bordered font-semibold  text-xl">
                                Question
                            </a>
                        </div>
                        <div className="grid mt-4 gap-y-6 grid-cols-12 grid-rows-3">
                            <div
                                className="flex col-span-8 border 
                                    p-4 bg-white gap-5 drop-shadow-xl w-[89%] row-span-1"
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
                                className="col-span-2 drop-shadow-xl bg-white flex justify-center 
                                            gap-2 flex-col border p-2"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <PersonIcon />
                                        <p>Players</p>
                                    </div>
                                    <p>1</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <PersonIcon />
                                        <p>Question</p>
                                    </div>
                                    <p>1</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <PersonIcon />
                                        <p>Time</p>
                                    </div>
                                    <p>1</p>
                                </div>
                            </div>
                            <div
                                className="w-[89%] border col-span-8 bg-white 
                                         drop-shadow-xl p-3 row-span-2"
                            >
                                <h1 className="font-bold text-xl">
                                    Difficult Question
                                </h1>
                                <div className="grid place-items-center h-full">
                                    <p>
                                        Great job! No one found any questions
                                        too challenging.
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2 drop-shadow-xl bg-white p-3">
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
