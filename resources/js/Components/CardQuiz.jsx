import { Link } from "@inertiajs/react";
import ProfilePicture from "./svg/ProfilePicture";

const CardQuiz = ({ data, username }) => {
    return (
        <Link
            href={"/detail/" + data.id}
            className="z-10 mb-2 bg-white drop-shadow-lg rounded-lg"
        >
            <img className="rounded-t-lg" src={data.thumbnail} />
            <div className="flex gap-x-3 items-center py-2 px-2">
                <ProfilePicture className="h-10" />
                <div className="flex flex-col">
                    <b>{data.quiz_name}</b>
                    <span className="text-sm">
                        {username} &#x2022; {data.total_players} players
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CardQuiz;
