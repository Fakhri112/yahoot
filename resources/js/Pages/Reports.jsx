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
                    <div className=" h-full p-2 ">
                        <table class="table-auto border w-full drop-shadow text-slate-900">
                            <thead className="border-2 rounded-t-lg text-left bg-slate-100 h-10">
                                <tr>
                                    <th className="pl-2">
                                        <input type="checkbox" name="" id="" />
                                    </th>
                                    <th className="text-xl ">Quiz</th>
                                    <th className="text-xl">Date</th>
                                    <th className="text-xl">
                                        Number of Player
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border-2 pl-2">
                                <tr className="border h-10">
                                    <td className="pl-2">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td>
                                        The Sliding Mr. Bones (Next Stop,
                                        Pottersville)
                                    </td>
                                    <td>Malcolm Lockyer</td>
                                    <td>1961</td>
                                </tr>
                                <tr className="border h-10">
                                    <td className="pl-2">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td>Witchy Woman</td>
                                    <td>The Eagles</td>
                                    <td>1972</td>
                                </tr>
                                <tr className="border h-10">
                                    <td className="pl-2">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td>Shining Star</td>
                                    <td>Earth, Wind, and Fire</td>
                                    <td>1975</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Reports;
