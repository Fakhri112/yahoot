import React from "react";
import ProfileSidebar from "@/Components/ProfileSidebar";
import ProfilePicture from "@/Components/svg_component/ProfilePicture";
import NavBar from "@/Components/NavBar";
import Folder from "@/Components/svg_component/Folder";
import { Link } from "@inertiajs/react";

const Reports = () => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main className="pb-24 md:ml-24 h-[calc(100vh-11%)] bg-slate-50 grid grid-cols-12">
                    <div
                        data-theme="light"
                        className="hidden md:block md:col-span-2 md:text-slate-900 md:border-r md:border-slate-300 md:h-full md:p-2"
                    >
                        <ul className="menu">
                            <li>
                                <h2 class="menu-title">My Folder</h2>
                                <ul>
                                    <li>
                                        <a>Item 1</a>
                                    </li>
                                    <li>
                                        <a>Item 2</a>
                                    </li>
                                    <li>
                                        <a>Item 3</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-10 w-full h-full border-black text-slate-900 px-4 py-6">
                        <p>My Folder</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 drop-shadow-md py-2 gap-2">
                            <div className="border flex bg-white items-center p-2 gap-x-3">
                                <Folder className="fill-slate-500" />
                                Ruby
                            </div>
                            <div className="border flex bg-white items-center p-2 gap-x-3">
                                <Folder className="fill-slate-500" />
                                Ruby
                            </div>
                            <div className="border flex bg-white items-center p-2 gap-x-3">
                                <Folder className="fill-slate-500" />
                                Ruby
                            </div>
                            <div className="border flex bg-white items-center p-2 gap-x-3">
                                <Folder className="fill-slate-500" />
                                Ruby
                            </div>
                        </div>
                        <div>
                            <div className="flex h-24 sm:h-32 md:h-32 drop-shadow rounded bg-white">
                                <div className="flex items-center border">
                                    <input
                                        className="m-2"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <img
                                        className="hidden sm:block md:block h-full"
                                        src="/image.png"
                                    />
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <Link
                                        href="/detail"
                                        className="py-2 px-3 text-2xl hover:text-blue-600"
                                    >
                                        <b>The Title is Hello World</b>
                                    </Link>
                                    <div className="flex justify-between px-2 py-1">
                                        <div className="flex items-center">
                                            <ProfilePicture className="h-8" />
                                            <div>
                                                <p className="text-sm">
                                                    Fakhrie_3310
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center px-2">
                                            <p>0 Plays</p>
                                            <button className="mx-2 font-semibold rounded bg-slate-300 px-3 py-1">
                                                Edit
                                            </button>
                                            <button className="font-semibold text-slate-200 rounded bg-blue-700 px-3 py-1">
                                                Start
                                            </button>
                                        </div>
                                    </div>
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
