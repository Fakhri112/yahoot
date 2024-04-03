import {
    usePlayerDispatch,
    usePlayerState,
} from "@/Components/context/PlayerContext";
import { seeds } from "@/Lib/avatarSeeds";
import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import ReactModal from "react-modal";

const AvatarsList = () => {
    const [generateSeed, SetGenerateSeed] = useState("");
    const { modalSeed, peer } = usePlayerState();
    const dispatch = usePlayerDispatch();
    let timeout;

    const handleToggle = () => {
        dispatch({ type: "TOGGLE_MODAL_SEED" });
    };

    const handleGenerate = (e) => {
        const length = Math.floor(Math.random() * 12) + 1;
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        SetGenerateSeed(result);
    };

    const updateAvatar = (seed) => {
        dispatch({
            type: "UPDATE_AVATAR",
            payload: seed,
        }),
            peer.connection.send({
                type: "updateAvatar",
                avatar: seed,
            });
        handleToggle();
        SetGenerateSeed("");
    };

    return (
        <ReactModal
            isOpen={modalSeed}
            shouldCloseOnOverlayClick={true}
            appElement={document.getElementById("app")}
            onRequestClose={handleToggle}
            closeTimeoutMS={200}
            className="relative rounded md:w-[50%] w-[55%] h-[70%] md:h-[85%] ReactModal p-3 bg-white flex flex-col"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            <Tab.Group as="div" className={"flex h-full flex-col"}>
                <Tab.List>
                    <Tab
                        className={({ selected }) =>
                            `text-lg px-6 py-1 w-full md:w-auto ${
                                selected
                                    ? "bg-slate-500  md:font-semibold text-white"
                                    : "border border-r-slate-500 border-t-slate-500 border-l-slate-500"
                            }`
                        }
                    >
                        Select Avatar
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            `text-lg px-6 py-1 w-full md:w-auto ${
                                selected
                                    ? "bg-slate-500  md:font-semibold text-white"
                                    : "border border-t-slate-500 border-r-slate-500 border-l-slate-500"
                            }`
                        }
                    >
                        Generate Avatar
                    </Tab>
                </Tab.List>
                <Tab.Panels className="h-full overflow-y-auto border border-slate-400 ">
                    <Tab.Panel className=" mb-1 grid grid-cols-2 md:grid-cols-4 rounded p-1">
                        {seeds.map((seed) => (
                            <img
                                key={seed}
                                src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${seed}`}
                                alt="avatar"
                                className="hover:brightness-[0.75] cursor-pointer p-3"
                                onClick={() => {
                                    updateAvatar(seed);
                                }}
                            />
                        ))}
                    </Tab.Panel>
                    <Tab.Panel className=" h-full  flex items-center justify-center rounded p-1">
                        <div className="flex flex-col items-center">
                            {generateSeed ? (
                                <img
                                    src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${generateSeed}`}
                                    alt="avatar"
                                    className="hover:brightness-[0.75] cursor-pointer md:w-[40%] w-[60%]"
                                    onClick={() => {
                                        updateAvatar(generateSeed);
                                    }}
                                />
                            ) : (
                                <div className="text-3xl border border-slate-400 border-2 py-10 px-12 ">
                                    ?
                                </div>
                            )}

                            <button
                                onClick={handleGenerate}
                                className="btn-3d py-3 px-6 mt-3"
                            >
                                Surprise Me
                            </button>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </ReactModal>
    );
};

export default AvatarsList;
