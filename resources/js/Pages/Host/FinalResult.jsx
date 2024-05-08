import { useHostState } from "@/Components/context/HostContext";
import PodiumFirst from "@/Components/podium/PodiumFirst";
import PodiumSecond from "@/Components/podium/PodiumSecond";
import PodiumThird from "@/Components/podium/PodiumThird";
import { Spinner } from "@/Components/svg/Spinner";
import { sleep } from "@/Lib/sleep";
import { useForm, usePage } from "@inertiajs/react";
import { useWindowSize } from "@uidotdev/usehooks";
import axios from "axios";
import { motion } from "framer-motion";
import { cloneDeep } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Confetti from "react-confetti";

const FinalResult = () => {
    const [showConfetti, SetShowConfetti] = useState(false);
    const { show, playersList, quizDetail, playersResult, gamePin, timeLapse } =
        useHostState();
    const { data, setData } = useForm({});
    const { width, height } = useWindowSize();
    const [saveLoading, SetSaveLoading] = useState(false);
    const id = usePage().props.auth.user.id;

    useEffect(() => {
        const confettiEffect = async () => {
            if (!show.finalResult) return;
            if (playersList.length > 3) {
                for (let index = 0; index < 50; index++) {
                    for (let index = 0; index < playersList.length; index++) {
                        const payload = {
                            type: "showFinalScore",
                            rank: index + 1,
                            finalScore: playersList[index].totalScore,
                            quizTitle: quizDetail.quiz_title,
                        };
                        if (index >= 3) {
                            playersList[index].peerData.send(payload);
                        }
                    }
                }
            }
            let playerSummaryResult = cloneDeep(playersList);
            for (let i = 0; i < playerSummaryResult.length; i++) {
                delete playerSummaryResult[i].peerData;
            }
            setData({
                gamePin,
                quizId: quizDetail.id,
                playersFinalResult: playersResult,
                playerSummaryResult,
                timeLapse: Date.now() - timeLapse,
                date: new Date().toLocaleString(),
            });
            const payload = (index) => {
                return {
                    type: "showFinalScore",
                    rank: index + 1,
                    finalScore: playersList[index].totalScore,
                    quizTitle: quizDetail.quiz_title,
                };
            };
            await sleep(2000);
            if (2 in playersList) {
                for (let index = 0; index < 50; index++) {
                    playersList[2].peerData.send(payload(2));
                }
            }
            await sleep(3200);
            if (1 in playersList) {
                for (let index = 0; index < 50; index++) {
                    playersList[1].peerData.send(payload(1));
                }
            }
            await sleep(5100);
            if (0 in playersList) {
                for (let index = 0; index < 50; index++) {
                    playersList[0].peerData.send(payload(0));
                }
            }
            playersList.forEach((player, index) => {
                if (index < 3) {
                    player.peerData.send({
                        type: "showFinalScoreConfetti",
                    });
                }
            });
            SetShowConfetti(true);
        };
        confettiEffect();
    }, [show.finalResult]);

    const handleSubmit = useCallback(() => {
        if (saveLoading) return;
        SetSaveLoading(true);
        axios.post("/play/submit-players-data", data).then((res) => {
            window.location.href = "/user/" + id;
        });
    }, [data]);

    return (
        <>
            {show.finalResult ? (
                <div
                    className="h-screen border grid justify-center
                 grid-cols-[minmax(0,_1fr)_repeat(11,_minmax(0,_1fr))] "
                >
                    {showConfetti ? (
                        <Confetti
                            recycle={false}
                            numberOfPieces={3000}
                            width={width}
                            height={height}
                            wind={0.01}
                            gravity={0.05}
                            onConfettiComplete={() => SetShowConfetti(false)}
                        />
                    ) : null}

                    <motion.section
                        initial={{
                            opacity: 0,
                            transform: "translateX(-100%)",
                        }}
                        animate={{
                            opacity: 1,
                            transform: "translateY(0)",
                        }}
                        transition={{
                            ease: "easeOut",
                            duration: 1,
                            delay: 13.8,
                        }}
                        className={`${
                            playersList.length > 3 ? "" : "md:hidden"
                        } md:col-span-6 md:block hidden m-5 brightness-100 p-4 
                        flex flex-col border rounded border-2 overflow-auto`}
                    >
                        {playersList.slice(3).map((data, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    transform: "translateX(-100%)",
                                }}
                                animate={{
                                    opacity: 1,
                                    transform: "translateY(0)",
                                }}
                                transition={{
                                    ease: [0, 0.5, 0.2, 1.01],
                                    duration: 1,
                                    delay: 15 + (index + 1) / 10,
                                }}
                                className=" px-5"
                            >
                                <div className="mb-2 flex  items-center text-white justify-between p-2 bg-slate-500/60 ">
                                    <div className="flex items-center gap-x-2">
                                        <p>{index + 4}</p>
                                        <img
                                            src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${data.avatar}`}
                                            alt=""
                                            className="h-10"
                                        />
                                        <p className="font-semibold lg:text-xl text-md">
                                            {data.name}
                                        </p>
                                    </div>

                                    <p className="font-semibold lg:text-xl text-md">
                                        {data.totalScore}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.section>
                    <motion.section
                        initial={{
                            transform: `${
                                width < 768 || playersList.length <= 3
                                    ? "translateX(0)"
                                    : "translateX(-50%)"
                            }`,
                        }}
                        animate={{
                            transform: "translateX(0)",
                        }}
                        transition={{
                            ease: [0, 0.71, 0.2, 1.01],
                            duration: 1,
                            delay: 13.7,
                        }}
                        className={`${
                            playersList.length <= 3
                                ? "md:col-span-12"
                                : "md:col-span-6"
                        } -translate-x-40 col-span-12 overflow-hidden
                        brightness-100 relative flex flex-col-reverse px-2 `}
                    >
                        <motion.button
                            initial={{
                                opacity: 0,
                                marginTop: "-10rem",
                            }}
                            animate={{ opacity: 1, marginTop: "1.25rem" }}
                            transition={{
                                ease: "easeOut",
                                duration: 0.2,
                                delay: 15.15,
                            }}
                            className="btn-3d top-0 text-black bg-white border-b-slate-400 
                            right-0 m-5 px-3 py-2 absolute flex"
                            onClick={handleSubmit}
                        >
                            Save and Exit
                            {saveLoading ? (
                                <Spinner classname={"h-5 ms-2"} />
                            ) : null}
                        </motion.button>
                        <div className="scaleIn mb-5 font-semibold text-xl flex justify-center items-center">
                            <p className=" bg-white w-fit h-fit py-2  text-center w-full ">
                                {quizDetail.quiz_title}
                            </p>
                        </div>
                        <div className="h-full  flex items-end justify-center pb-5">
                            <PodiumThird
                                delayAvatar={2.7}
                                delayPlayerName={2}
                                delayPodium={2}
                                playerName={playersList[2]?.name ?? ""}
                                playerScore={playersList[2]?.totalScore ?? ""}
                                playerAvatar={playersList[2]?.avatar ?? ""}
                            />

                            <PodiumFirst
                                delayPodium={9}
                                delayPlayerName={10.15}
                                delayAvatar={10}
                                playerName={playersList[0].name}
                                playerScore={playersList[0].totalScore}
                                playerAvatar={playersList[0].avatar}
                            />

                            <PodiumSecond
                                delayPodium={5}
                                delayPlayerName={5}
                                delayAvatar={5.7}
                                playerName={playersList[1]?.name ?? ""}
                                playerScore={playersList[1]?.totalScore ?? ""}
                                playerAvatar={playersList[1]?.avatar ?? ""}
                            />
                        </div>
                    </motion.section>
                </div>
            ) : null}
        </>
    );
};

export default FinalResult;
