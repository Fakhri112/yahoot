import React, { useEffect } from "react";
import ProfilePicture from "../Components/svg/ProfilePicture";
import ProfileSidebar from "@/Components/ProfileSidebar";
import NavBar from "@/Components/NavBar";
import CardQuiz from "@/Components/CardQuiz";
import toast, { Toaster } from "react-hot-toast";

const user_home = ({ auth, quizzesData, flash }) => {
    const user = auth.user;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    return (
        <>
            <Toaster />
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main className="h-[89%] bg-slate-50 p-4 m-0 pb-24 md:pb-0 md:ml-24">
                    <div className="h-full px-4 overflow-y-auto">
                        <div
                            className="flex justify-between mb-6 flex-col items-center
                            md:flex-row
                        "
                        >
                            <div className="flex flex-col items-center md:flex-row">
                                {user.profile_pic ? (
                                    <img
                                        src={user.profile_pic}
                                        className="rounded-full h-20 me-1"
                                    />
                                ) : (
                                    <ProfilePicture className="h-20" />
                                )}

                                <p className="font-bold text-2xl text-slate-600">
                                    {user.name}
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
                            {quizzesData.map((data, index) => (
                                <CardQuiz
                                    key={index}
                                    data={{ ...data }}
                                    username={user.name}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default user_home;
