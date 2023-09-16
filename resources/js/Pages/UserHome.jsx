import React from "react";
import ProfilePicture from "../Components/svg_component/ProfilePicture";
import ProfileSidebar from "@/Components/ProfileSidebar";
import NavBar from "@/Components/NavBar";
import CardQuiz from "@/Components/CardQuiz";

const user_home = () => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main className="h-[89%] bg-slate-50 p-4 m-0 pb-24 md:ml-24">
                    <div className="h-full px-4 overflow-y-auto">
                        <div
                            className="flex justify-between mb-6 flex-col items-center
                            md:flex-row
                        "
                        >
                            <div className="flex flex-col items-center md:flex-row">
                                <ProfilePicture className="h-20" />
                                <p className="font-bold text-2xl text-slate-600">
                                    Fakhri_3310
                                </p>
                            </div>
                            <div
                                className="grid grid-cols-3 gap-x-6 
                                        font-semibold text-xl text-slate-600 justify-center mt-3 md:mt-0"
                            >
                                <div className="text-center">
                                    <p className="text-md">Quiz</p>
                                    <p className="text-md">1</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-md">Plays</p>
                                    <p className="text-md">1</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-md">Players</p>
                                    <p className="text-md">1</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-slate-900 grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4">
                            <CardQuiz />
                            <CardQuiz />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default user_home;
