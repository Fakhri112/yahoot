import React, { useState } from "react";
import ProfilePicture from "@/Components/svg/ProfilePicture";
import { Link, usePage } from "@inertiajs/react";
import FavoriteIcon from "@/Components/svg/FavoriteIcon";
import toast from "react-hot-toast";
import axios from "axios";

export const DetailPanel = ({ quiz, user, favorite }) => {
    const currentUser = usePage().props.auth.user;
    const [starred, SetStarred] = useState(favorite);
    const handleToggleFavorite = async () => {
        if (starred) {
            SetStarred(false);
            let response = await axios.delete("/favorites/" + quiz.id);
            return toast.success(response.data.message);
        }
        SetStarred(true);
        let response = await axios.post("/favorites/" + quiz.id);
        return toast.success(response.data.message);
    };

    return (
        <div className="col-span-4 text-slate-900 border border-slate-100 bg-white ">
            <div className="relative -z-9">
                {currentUser.id != quiz.user_id ? (
                    <FavoriteIcon
                        starred={starred}
                        className={
                            "absolute m-2 border rounded-full bg-white p-3 cursor-pointer text-4xl "
                        }
                        onClick={handleToggleFavorite}
                    />
                ) : null}

                <img src={quiz.thumbnail} alt="" />
            </div>
            <div className="p-2">
                <h1 className="font-bold text-xl">{quiz.quiz_title}</h1>
                <div className="flex justify-between">
                    <p className="text-sm">
                        {quiz.total_plays} plays &#x2022; {quiz.total_players}{" "}
                        players
                    </p>
                    <p>
                        {quiz.visibility.charAt(0).toUpperCase() +
                            quiz.visibility.slice(1) +
                            " Quiz"}
                    </p>
                </div>
                <div className="flex gap-x-6">
                    <a
                        href={"/play/quizid=" + quiz.id}
                        className="btn-primary w-full py-1 my-2 text-center"
                    >
                        Start
                    </a>
                    {currentUser.id == quiz.user_id ? (
                        <Link
                            href={"/edit/" + quiz.id}
                            className="btn-secondary w-full py-1 my-2 text-center"
                        >
                            Edit
                        </Link>
                    ) : null}
                </div>
                <div>
                    <p>{quiz.quiz_description}</p>
                </div>
                <div className="flex gap-x-3 items-center py-2">
                    <ProfilePicture
                        profilePic={user.profile_pic ? user.profilePic : null}
                        className="h-10"
                    />
                    <Link
                        href={`/user/` + user.id}
                        className="no-underline hover:underline text-sm font-semibold"
                    >
                        {user.name}
                    </Link>
                </div>
            </div>
        </div>
    );
};
