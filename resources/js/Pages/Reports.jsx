import React from "react";
import ProfileSidebar from "@/Components/ProfileSidebar";
import NavBar from "@/Components/NavBar";
import { Link } from "@inertiajs/react";

const Reports = () => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main className="ml-0 md:ml-24 h-[calc(100vh-11%)] bg-slate-50 p-2 overflow-y-auto">
                    <div className=" h-full p-2 ">
                        <table class="table-auto border w-full drop-shadow text-slate-900">
                            <thead className="border-2 rounded-t-lg text-left bg-slate-100 h-10">
                                <tr>
                                    <th className="pl-2">
                                        <input type="checkbox" name="" id="" />
                                    </th>
                                    <th className="text-xl ">Quiz</th>
                                    <th className="text-xl hidden md:table-cell">
                                        Date
                                    </th>
                                    <th className="text-xl hidden md:table-cell">
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
                                        <Link
                                            href="/user/reports/293"
                                            className="text-blue-600 hover:underline"
                                        >
                                            The Sliding Mr. Bones (Next Stop,
                                            Pottersville)
                                        </Link>
                                    </td>
                                    <td className="hidden md:table-cell">
                                        Malcolm Lockyer
                                    </td>
                                    <td className=" hidden md:table-cell">
                                        1961
                                    </td>
                                </tr>
                                <tr className="border h-10">
                                    <td className="pl-2">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td>Witchy Woman</td>
                                    <td className="hidden md:table-cell">
                                        The Eagles
                                    </td>
                                    <td className="hidden md:table-cell">
                                        1972
                                    </td>
                                </tr>
                                <tr className="border h-10">
                                    <td className="pl-2">
                                        <input type="checkbox" name="" id="" />
                                    </td>
                                    <td>Shining Star</td>
                                    <td className="hidden md:table-cell">
                                        Earth, Wind, and Fire
                                    </td>
                                    <td className="hidden md:table-cell">
                                        1975
                                    </td>
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
