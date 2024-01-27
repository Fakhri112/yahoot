import React from "react";
import ProfilePicture from "@/Components/svg/ProfilePicture";
import { Link } from "@inertiajs/react";
export const DetailPanel = ({ quiz, user }) => {
    return (
        <div className="col-span-4 text-slate-900 border border-slate-100 bg-white ">
            <img src={quiz.thumbnail} alt="" />
            <div className="p-2">
                <h1 className="font-bold text-xl">{quiz.quiz_name}</h1>
                <p className="text-sm">
                    892 plays &#x2022; {quiz.total_players} players
                </p>
                <div className="flex gap-x-6">
                    <button className="btn-primary w-full py-1 my-2">
                        Start
                    </button>
                    <Link
                        href={"/edit/" + quiz.id}
                        className="btn-secondary w-full py-1 my-2 text-center"
                    >
                        Edit
                    </Link>
                </div>
                <div>
                    <p>{quiz.quiz_description}</p>
                </div>
                <div className="flex gap-x-3 items-center py-2">
                    <ProfilePicture className="h-10" />
                    <p className="text-sm font-semibold">{user.name}</p>
                </div>
            </div>
        </div>
    );
};
