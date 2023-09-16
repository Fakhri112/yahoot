import React from "react";
import ProfileSidebar from "@/Components/ProfileSidebar";
import NavBar from "@/Components/NavBar";

const Reports = () => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main className="pb-24 md:ml-24 h-[calc(100vh-11%)] bg-slate-50 p-2">
                    <div className=" h-full p-2 text-slate-800 overflow-y-auto ">
                        <h1 className="text-3xl font-semibold">Setting</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 mt-4 md:gap-x-7 ">
                            <div className="bg-white rounded drop-shadow-md">
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
