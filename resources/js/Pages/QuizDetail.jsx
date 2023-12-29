import React from "react";
import { Rhombus, Circle, Square, Triangle } from "@/Components/svg/Shape";
import ProfilePicture from "@/Components/svg/ProfilePicture";
import NavBar from "@/Components/NavBar";
import ProfileSidebar from "@/Components/ProfileSidebar";
import { Disclosure } from "@headlessui/react";

const Reports = () => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main className="pb-20 md:pb-0 h-[calc(100vh-12%)] bg-slate-200 ms-0 md:ms-24 grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
                    <div className="col-span-4 text-slate-900 border border-slate-100 bg-white">
                        <img src="/image.png" alt="" />
                        <div className="p-2">
                            <h1 className="font-bold text-xl">
                                30 Basic Ruby Languange Trivia
                            </h1>
                            <p>892 plays &#x2022; 2.8k players</p>
                            <div className="flex gap-x-6">
                                <button className="bg-blue-700 w-full text-lg font-semibold rounded text-slate-100 hover:bg-blue-800 py-1 my-2">
                                    Start
                                </button>
                                <button className="bg-slate-300 w-full text-lg font-semibold rounded text-slate-700 hover:bg-slate-400 py-1 my-2">
                                    Edit
                                </button>
                            </div>
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
                        <Disclosure
                            as="div"
                            className="bg-base-200 rounded-none border "
                        >
                            <Disclosure.Button
                                as="div"
                                className="p-0 flex h-24 justify-between bg-white cursor-pointer hover:bg-blue-200"
                            >
                                <div className="p-4 text-sm">
                                    <p>1. Quiz</p>
                                    <b>
                                        What verb would be the most suitable for
                                        the sentence?
                                    </b>
                                </div>
                                <div className="flex border ">
                                    <img src="/image.png" alt="" />
                                    <p className="absolute text-slate-700 font-semibold rounded m-1 text-sm bg-slate-50 px-1">
                                        20 Sec
                                    </p>
                                </div>
                            </Disclosure.Button>
                            <Disclosure.Panel
                                as="div"
                                className="collapse-content flex flex-col gap-y-4 bg-white px-3 pb-2"
                            >
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
                            </Disclosure.Panel>
                        </Disclosure>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Reports;
