import React from "react";
import {
    Rhombus,
    Circle,
    Square,
    Triangle,
} from "@/Components/svg_component/Shape";
import ProfilePicture from "@/Components/svg_component/ProfilePicture";

const Reports = () => {
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
                <main className="h-[calc(100vh-10%)] bg-slate-200  grid grid-cols-12">
                    <div
                        data-theme="light"
                        className="col-span-4 text-slate-900 border border-slate-300 h-full"
                    >
                        <img src="/image.png" alt="" />
                        <div className="p-2">
                            <h1 className="font-bold text-2xl">
                                30 Basic Ruby Languange Trivia
                            </h1>
                            <p>892 plays &#x2022; 2.8k players</p>
                            <button className="bg-blue-700 w-full text-lg font-semibold rounded text-slate-100 hover:bg-blue-800 py-1 my-2">
                                Start
                            </button>
                            <div className="flex gap-x-3 items-center py-2">
                                <ProfilePicture className="h-10" />
                                <p className="text-sm font-semibold">
                                    Fakhrie_3310
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-8 w-full h-full border-black text-slate-900 px-4 py-6">
                        <p className="font-semibold text-xl">Question (12)</p>
                        <div className="collapse bg-base-200 rounded-none border">
                            <input type="checkbox" className="w-full h-full" />
                            <div className="collapse-title p-0 flex h-20 justify-between bg-white">
                                <div className="p-4">
                                    <p>1. Quiz</p>
                                    <b>
                                        What verb would be the most suitable for
                                        the sentence?
                                    </b>
                                </div>
                                <div className="flex ">
                                    <img src="/image.png" alt="" />
                                    <p className="absolute text-white rounded opacity-75 right-0 bottom-0 text-sm bg-slate-500 px-1">
                                        20 Sec
                                    </p>
                                </div>
                            </div>
                            <div className="collapse-content flex flex-col gap-y-4 bg-white">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-x-2 items-center">
                                        <Triangle className="bg-red-700 p-2 fill-white h-10 w-10 rounded" />
                                        <p>Kawa</p>
                                    </div>
                                    &#10004;
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-x-2 items-center">
                                        <Rhombus className="bg-blue-600 p-2 fill-white h-10 w-10 rounded" />
                                        <p>Umi</p>
                                    </div>
                                    &#10060;
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-x-2 items-center">
                                        <Circle className="bg-amber-500 p-2 fill-white h-10 w-10 rounded" />
                                        Yama
                                    </div>
                                    &#10060;
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-x-2 items-center">
                                        <Square className="fill-white bg-green-600 p-2 h-10 w-10 rounded" />
                                        Nami
                                    </div>
                                    &#10060;
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Reports;
