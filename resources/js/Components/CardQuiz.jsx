import { Link } from "@inertiajs/react";
import ProfilePicture from "./svg/ProfilePicture";
import { useState } from "react";

const CardQuiz = ({ data, username, profilePic, quizId }) => {
    const [cardLink, SetCardLink] = useState(true);

    return (
        <Link
            as={!cardLink ? "div" : "a"}
            href={"/detail/" + quizId}
            className="self-start  mb-2 bg-white shadow-lg rounded-lg"
        >
            <img className="rounded-t-lg" loading="lazy" src={data.thumbnail} />
            <div className="flex gap-x-3 items-center py-2 px-2">
                <ProfilePicture profilePic={profilePic} className="h-10" />
                <div className="flex flex-col">
                    <b>{data.quiz_title}</b>
                    <span className="text-sm">
                        <Link
                            as={!cardLink ? "a" : "span"}
                            onMouseEnter={() => SetCardLink(false)}
                            onMouseLeave={() => SetCardLink(true)}
                            href={"/user/" + data.user_id}
                            className="no-underline hover:underline"
                        >
                            {username}
                        </Link>
                        <span> &#x2022; {data.total_players} players</span>
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CardQuiz;
