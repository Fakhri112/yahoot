import React from "react";
import { usePlayerState } from "@/Components/context/PlayerContext";
import { Link } from "@inertiajs/react";

const EnterWrapper = ({ children }) => {
    const { peer, show } = usePlayerState();
    return (
        <>
            {!peer.connected && show.playerEnter ? (
                <>
                    <div className="grid place-items-center z-10">
                        <div className="text-center">
                            <h4 className="font-josefin font-semibold text-5xl text-slate-100 mb-10">
                                Yahoot!
                            </h4>
                            {children}
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="z-10 h-min row-span-1 font-semibold text-slate-200 text-center p-3"
                    >
                        Back To Home
                    </Link>
                </>
            ) : peer.connected && show.playerEnter ? (
                <> {children}</>
            ) : null}
        </>
    );
};

export default EnterWrapper;
