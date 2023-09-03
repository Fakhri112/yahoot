import React from "react";
import ProfileSidebar from "@/Components/ProfileSidebar";

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
                <main className="ml-24 h-[calc(100vh-11%)] bg-slate-50 p-2">
                    <div className=" h-full p-2 text-slate-800">
                        <h1 className="text-3xl font-semibold">Setting</h1>
                        <div className="grid grid-cols-2 mt-4 gap-x-7">
                            <div className="bg-white rounded drop-shadow-lg">
                                <div className="flex justify-between px-3 py-2">
                                    <p className="text-lg font-semibold">
                                        User Information
                                    </p>
                                    <button className="font-semibold bg-green-700 px-7 rounded text-white">
                                        Save
                                    </button>
                                </div>
                                <hr className="my-2 border-slate-200" />
                                <div className="flex gap-x-9  px-3 py-2">
                                    <div className="w-32 h-32 border border-slate-400 rounded grid place-items-center hover:bg-blue-400 hover:cursor-pointer">
                                        <p className="text-sm">Add Image</p>
                                    </div>
                                    <div className="flex flex-col shrink-0 gap-y-2 flex-1 shrink">
                                        <label htmlFor="Username">
                                            <b>Username</b>
                                        </label>
                                        <input
                                            className="h-8 rounded border-slate-400"
                                            type="text"
                                            name=""
                                            id="Username"
                                        />
                                        <label htmlFor="Email">
                                            <b>Email</b>
                                        </label>
                                        <input
                                            className="h-8 rounded border-slate-400"
                                            type="text"
                                            name=""
                                            id="Email"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded drop-shadow-lg">
                                <div className="flex justify-between px-3 py-2">
                                    <p className="text-lg font-semibold">
                                        Change Password
                                    </p>
                                </div>
                                <hr className="my-2 border-slate-200" />
                                <div className="flex flex-col shrink-0 gap-y-2 p-3 px-6 flex-1 shrink">
                                    <label htmlFor="old_pw">
                                        <b>Old Password</b>
                                    </label>
                                    <input
                                        className="h-8 rounded border-slate-400"
                                        type="password"
                                        name=""
                                        id="old_pw"
                                    />
                                    <div className="flex gap-x-4">
                                        <div className="block">
                                            <label htmlFor="new_pw">
                                                <b>New Password</b>
                                            </label>
                                            <input
                                                className="h-8 rounded border-slate-400 w-full"
                                                type="password"
                                                name=""
                                                id="new_pw"
                                            />
                                        </div>
                                        <div className="block">
                                            <label htmlFor="re_new_pw">
                                                <b>Retype New Password</b>
                                            </label>
                                            <input
                                                className="h-8 rounded border-slate-400 w-full"
                                                type="password"
                                                name=""
                                                id="re_new_pw"
                                            />
                                        </div>
                                    </div>
                                    <button className="font-semibold bg-green-700 rounded text-white self-start py-2 px-5 mt-2">
                                        Save
                                    </button>
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
