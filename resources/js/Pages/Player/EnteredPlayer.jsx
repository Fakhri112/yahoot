import {
    usePlayerDispatch,
    usePlayerState,
} from "@/Components/context/PlayerContext";
import Pencil from "@/Components/svg/Pencil";
import React from "react";

const EnteredPlayer = () => {
    const { avatar, enteredPlayer, username } = usePlayerState();
    const dispatch = usePlayerDispatch();
    return (
        <>
            {enteredPlayer.firstGame ? (
                <>
                    <div className="grid place-items-center z-10">
                        <div className=" flex flex-col items-center">
                            <div className="relative">
                                <Pencil
                                    onClick={() =>
                                        dispatch({ type: "TOGGLE_MODAL_SEED" })
                                    }
                                    className="z-20 absolute -right-4 -top-4 bg-white p-1 rounded-lg cursor-pointer"
                                />
                                <img
                                    src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${avatar}`}
                                    alt="avatar"
                                    className="h-28 hover:brightness-[0.75] cursor-pointer"
                                    onClick={() =>
                                        dispatch({ type: "TOGGLE_MODAL_SEED" })
                                    }
                                />
                            </div>
                            <h1 className="text-white font-bold text-3xl my-4 [text-shadow:0px_3px_4px_#000000] text-center">
                                {username}
                            </h1>
                            <p className="font-semibold text-white sm:text-xl text-lg text-center">
                                You're in! See your nickname on screen?
                            </p>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default EnteredPlayer;
