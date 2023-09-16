import { Link } from "@inertiajs/react";
import ProfilePicture from "./svg_component/ProfilePicture";

const CardQuiz = () => {
    return (
        <Link
            href="/detail"
            className="z-10 mb-2 bg-white drop-shadow-lg rounded-lg"
        >
            <img className="rounded-t-lg" src="/image.png" />
            <div className="flex gap-x-3 items-center py-2 px-2">
                <ProfilePicture className="h-10" />
                <div className="flex flex-col">
                    <b>Hello World</b>
                    <span className="text-sm">
                        Fakhrie_3310 &#x2022; 2.7k players
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CardQuiz;
