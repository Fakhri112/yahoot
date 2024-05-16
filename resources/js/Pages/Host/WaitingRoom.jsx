import { PersonIcon } from "@/Components/svg/QuizReportIcon";
import React, { useEffect, useState } from "react";
import { sleep } from "@/Lib/sleep";
import axios from "axios";
import {
    useHostDispatch,
    useHostState,
} from "@/Components/context/HostContext";
import ImageIcon from "@/Components/svg/ImageIcon";
import { FullScreenIcon } from "@/Components/svg/FullScreenIcon";
import { AnimatePresence, motion } from "framer-motion";

const WaitingRoom = ({ pin, questions }) => {
    const [showWaitingPlayers, SetShowWaitingPlayers] = useState(false);
    const [showBgSwitch, SetShowBgSwitch] = useState(false);

    const {
        gamePinLock,
        catchPlayerData,
        playersList,
        gamePin,
        show,
        thumbnailBg,
    } = useHostState();
    const dispatch = useHostDispatch();

    useEffect(() => {
        const fakeLoading = async () => {
            await sleep(3500);
            dispatch({ type: "UPDATE_GAME_PIN", payload: pin });
            await sleep(400);
            SetShowBgSwitch(true);
            await sleep(500);
            SetShowWaitingPlayers(true);
        };
        fakeLoading();
    }, []);

    useEffect(() => {
        if (!catchPlayerData) return;
        SetShowWaitingPlayers(false);
        if (
            catchPlayerData?.type == "disconnected" &&
            playersList.length == 1
        ) {
            return SetShowWaitingPlayers(true);
        }
    }, [catchPlayerData]);

    const handleDisconnectPlayer = async (playerData) => {
        playerData.peerData.close();
        await sleep(500);
        if (playersList.length == 1) SetShowWaitingPlayers(true);
        dispatch({
            type: "UPDATE_PLAYERS_LIST",
            payload: playersList.filter(
                (player) => playerData.peerData.peer !== player.peerData.peer
            ),
        });
    };

    const handleLockGame = async () => {
        dispatch({ type: "UPDATE_GAME_PIN", payload: "loading" });
        const response = await axios.patch("/play/toggle-lock", {
            gamePin: pin,
        });

        dispatch({ type: "UPDATE_GAME_PIN", payload: pin });
        if (response.data == "lock")
            return dispatch({ type: "UPDATE_GAME_PIN_LOCK", payload: true });
        return dispatch({ type: "UPDATE_GAME_PIN_LOCK", payload: false });
    };

    const handleStartGame = async () => {
        if (playersList.length == 0) return;
        dispatch({ type: "TOGGLE_SHOW_WAITING_ROOM" });
        playersList.forEach((player) => {
            setTimeout(() => {
                player.peerData.send({
                    type: "startGame",
                    status: "quizCountdown",
                });
            }, 10);
        });
        await sleep(600);
        dispatch({ type: "TOGGLE_SHOW_QUIZ_COUNTDOWN" });
    };

    window.addEventListener("beforeunload", function (event) {
        if (!sessionStorage.getItem("submitted"))
            axios.delete("/play/delete-pin/" + pin);
        return;
    });

    return (
        <>
            {show.waitingRoom ? (
                <div
                    className={`h-full  overflow-hidden grid grid-cols-12 grid-rows-12`}
                >
                    <div className="absolute inset-0 overflow-hidden flex justify-between items-end">
                        <p
                            className={`${
                                showBgSwitch ? "fadeInBottom" : "hidden"
                            } font-bold text-white m-2 text-4xl`}
                        >
                            Yahoot
                        </p>
                        <div
                            className={`${
                                showBgSwitch ? "fadeInBottom" : "hidden"
                            }  border p-2 rounded-md m-2 bg-white flex items-center gap-x-2`}
                        >
                            <ImageIcon
                                className={"w-8 "}
                                status={thumbnailBg}
                                onClick={() =>
                                    dispatch({ type: "TOGGLE_BACKGROUND" })
                                }
                            />
                            <FullScreenIcon className="h-6 stroke-black" />
                        </div>
                    </div>

                    <motion.section
                        initial={{
                            transform: "translateY(35vh)",
                        }}
                        animate={{
                            transform: "translateY(0)",
                        }}
                        transition={{
                            ease: "easeOut",
                            duration: 0.4,
                            delay: 4,
                        }}
                        className=" translate-y-[35vh] col-span-12
                             brightness-100 px-6 flex row-span-3 mb-2"
                    >
                        <div className="hidden md:flex flex-1 self-center"></div>
                        <div className="flex-1 md:grow-[2] lg:flex-1 pt-2">
                            <div>
                                <div className="bg-white p-1 zoomIn ">
                                    <p className="text-4xl font-bold text-black ">
                                        Game PIN
                                    </p>
                                    {!gamePin || gamePin == "loading" ? (
                                        <p className="text-2xl loadingElipsis">
                                            Loading
                                        </p>
                                    ) : gamePinLock ? (
                                        <p className=" font-semibold  text-2xl">
                                            Locked! No one else can join
                                        </p>
                                    ) : (
                                        <div>
                                            <span className="text-2xl pe-1">
                                                {gamePin.slice(0, 3)}
                                            </span>
                                            <span className="text-2xl ps-1">
                                                {gamePin.slice(3, 7)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-x-2 mt-2">
                                <button
                                    onClick={handleLockGame}
                                    className={`${
                                        gamePinLock
                                            ? "bg-slate-700 text-slate-50 hover:bg-slate-800"
                                            : "bg-white hover:bg-slate-200"
                                    } rounded px-2 py-1 font-semibold`}
                                >
                                    {gamePinLock ? "Locked" : "Lock"}
                                </button>
                                <button
                                    onClick={handleStartGame}
                                    className={`${
                                        playersList.length > 0
                                            ? "btn-primary"
                                            : "btn-disable cursor-not-allowed"
                                    } flex-1 px-2 py-1 `}
                                >
                                    Start
                                </button>
                                <div className="flex items-center bg-black px-2 justify-between bg-opacity-50 rounded">
                                    <PersonIcon className="fill-white" />
                                    <p className="font-semibold text-white text-xl">
                                        {playersList.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-1 self-center"></div>
                    </motion.section>

                    {showWaitingPlayers ? (
                        <section
                            className="overflow-y-auto row-span-9
                             brightness-100 col-span-12 grid place-items-center "
                        >
                            <div className="bg-cyan-400 p-3 text-xl zoomIn">
                                Waiting for players
                            </div>
                        </section>
                    ) : (
                        <div
                            className="overflow-y-auto row-span-9
                         brightness-100 col-span-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4  p-4 "
                        >
                            <AnimatePresence mode="popLayout">
                                {playersList.map((player, index) => (
                                    <motion.div
                                        key={player.peerData.peer}
                                        layout
                                        className="flex self-start justify-center"
                                        initial={{
                                            transform: "translateX(40px)",
                                            opacity: 0,
                                        }}
                                        animate={{
                                            transform: "translateX(0px)",
                                            opacity: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            transform: `translateY(-50px)`,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            type: "spring",
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                handleDisconnectPlayer(player)
                                            }
                                            className="hover:line-through text-white decoration-2 bg-blue-600 rotate-1 items-center flex"
                                        >
                                            <img
                                                src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${player.avatar}`}
                                                alt="avatar"
                                                className="h-10"
                                            />
                                            <p className="text-white mx-2">
                                                {player.name}
                                            </p>
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default WaitingRoom;
