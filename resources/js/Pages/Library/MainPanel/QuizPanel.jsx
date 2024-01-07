import ProfilePicture from "@/Components/svg/ProfilePicture";
import { Link } from "@inertiajs/react";
import React from "react";
import { useLibraryState } from "@/Components/context/LibraryContext";

export const QuizPanel = ({ id, quiz_name }) => {
    const { user } = useLibraryState();
    return (
        <div className="flex h-24 sm:h-32 md:h-32 drop-shadow rounded bg-white">
            <div className="flex items-center border">
                <input className="m-2" type="checkbox" name="" id="" />
                <img
                    className="hidden sm:block md:block h-full"
                    src="/image.png"
                />
            </div>

            <div className="flex flex-col justify-between flex-1">
                <div className="flex items-center justify-between">
                    <Link
                        href={"/detail/" + { id }}
                        className="py-2 px-3 text-xl hover:text-blue-900"
                    >
                        <b>{quiz_name}</b>
                    </Link>
                </div>

                <div className="flex justify-between px-2 py-1">
                    <div className="flex items-center">
                        <ProfilePicture className="h-8" />
                        <div>
                            <p className="text-sm">{user.name}</p>
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
    );
};
