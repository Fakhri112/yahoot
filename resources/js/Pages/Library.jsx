import React from "react";
import ProfileSidebar from "@/Components/ProfileSidebar";
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
                <ProfileSidebar />
                <main className="ml-20 h-[calc(100vh-11%)] bg-slate-50  grid grid-cols-12">
                    <div
                        data-theme="light"
                        className="col-span-2 text-slate-900 border border-slate-300 h-full p-2"
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
                    <div className="col-span-10 w-full h-full border-black text-slate-900 px-4 py-6">
                        <p>My Folder</p>
                        <div className="grid grid-cols-4  drop-shadow-md py-2 gap-2">
                            <div className="border flex bg-white items-center p-2 gap-x-3">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="2em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
                                </svg>{" "}
                                Ruby
                            </div>
                            <div className="border flex bg-white items-center p-2 gap-x-3">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="2em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
                                </svg>{" "}
                                Ruby
                            </div>
                            <div className="border flex bg-white items-center p-2 gap-x-3">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="2em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
                                </svg>{" "}
                                Ruby
                            </div>
                            <div className="border flex bg-white items-center p-2 gap-x-3">
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="2em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
                                </svg>{" "}
                                Ruby
                            </div>
                        </div>
                        <div>
                            <div className="flex h-32 drop-shadow rounded bg-white">
                                <div className="flex items-center">
                                    <input
                                        className="m-2"
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    <img className="h-full" src="/image.png" />
                                </div>
                                <div className="flex flex-col justify-between flex-1">
                                    <p className="py-2 px-3 text-2xl">
                                        <b>The Title is Hello World</b>
                                    </p>
                                    <div className="border flex justify-between px-2 py-1">
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
