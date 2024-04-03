import IncreaseCounter from "@/Components/IncreaseCounter";
import {
    useHostDispatch,
    useHostState,
} from "@/Components/context/HostContext";
import { sleep } from "@/Lib/sleep";
import { Reorder, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { InGameNavigationBottom } from "./InGameNavigationBottom";
import { cloneDeep } from "lodash";

const Scoreboard = () => {
    const {
        show,
        playersList,
        disconnectedPlayers,
        playersAnswerContainer,
        playersResult,
    } = useHostState();
    const dispatch = useHostDispatch();
    const [playersTotalScoreList, SetPlayersTotalScoreList] = useState([]);
    const [startCounting, SetStartCounting] = useState(false);

    useEffect(() => {
        // console.log(playersList);
        if (show.finalResult) return;
        if (playersList.length == playersTotalScoreList.length) return;
        if (
            playersList.length > 0 &&
            playersTotalScoreList.length == 0 &&
            show.waitingRoom
        )
            return SetPlayersTotalScoreList(playersList);
        if (
            playersList.length > playersTotalScoreList.length &&
            playersTotalScoreList.length > 0
        ) {
            let playersTotalScoreListCopy = cloneDeep(playersTotalScoreList);
            let substract =
                playersTotalScoreListCopy.length - playersList.length;
            playersList.forEach((data, index) => {
                if (substract == 0) return;
                if (index >= playersTotalScoreList.length) {
                    playersTotalScoreListCopy.push(data);
                }
            });
            return SetPlayersTotalScoreList(playersTotalScoreListCopy);
        }
    }, [playersList, show.waitingRoom]);

    useEffect(() => {
        if (!show.scoreBoard) return;
        const countAnimation = async () => {
            await sleep(700);
            const lookup = Object.fromEntries(
                playersAnswerContainer.map((item) => [
                    item.peerData.peer,
                    item.score,
                ])
            );
            const result = playersTotalScoreList.map((item) => ({
                ...item,
                totalScore: item.totalScore + lookup[item.peerData.peer],
            }));

            SetStartCounting(true);
            SetPlayersTotalScoreList(result);
            result.sort((a, b) => {
                return b.totalScore - a.totalScore;
            });

            await sleep(2000);
            SetPlayersTotalScoreList(result);
        };

        countAnimation();
    }, [show.scoreBoard]);

    useEffect(() => {
        console.log(disconnectedPlayers);
        console.log(JSON.stringify(playersResult));
    }, [playersResult]);

    const handleNext = () => {
        const answerContainerCopy = cloneDeep(playersAnswerContainer);
        for (let i = 0; i < answerContainerCopy.length; i++) {
            delete answerContainerCopy[i].peerData;
        }

        dispatch({
            type: "UPDATE_PLAYERS_RESULT_DATA",
            payload: [...playersResult, answerContainerCopy],
        });
        dispatch({ type: "INCREMENT_QUESTIONS" });
        dispatch({ type: "TOGGLE_SHOW_SCOREBOARD" });
        dispatch({
            type: "UPDATE_PLAYERS_LIST",
            payload: [...playersTotalScoreList],
        });

        if (disconnectedPlayers.length > 0) {
            let newArray = [];
            disconnectedPlayers.map((data, index) => {
                newArray.push({
                    peerData: data.peerData,
                    name: data.name,
                    time: null,
                    score: 0,
                    answer: null,
                    correct_incorrect: false,
                });
            });
            dispatch({ type: "COLLECT_PLAYERS_ANSWER", payload: newArray });
        } else {
            dispatch({ type: "COLLECT_PLAYERS_ANSWER", payload: [] });
        }
        dispatch({ type: "TOGGLE_SHOW_QUESTION_COUNTDOWN" });
        SetStartCounting(false);
    };

    return (
        <>
            {show.scoreBoard ? (
                <div className="h-full relative flex items-center flex-col overflow-hidden z-50">
                    <div className="flex justify-between w-full ">
                        <div className=" p-2 bg-white px-4 mx-5 opacity-0">
                            Next
                        </div>
                        <p className="m-5 rotate-2 drop-shadow-lg border-none text-center h-fit bg-white p-2 text-2xl font-semibold">
                            Scoreboard
                        </p>

                        <motion.button
                            initial={{
                                opacity: 0,
                                marginTop: "-10rem",
                            }}
                            animate={{ opacity: 1, marginTop: "1.25rem" }}
                            transition={{
                                ease: "easeOut",
                                duration: 0.2,
                                delay: 3,
                            }}
                            onClick={handleNext}
                            className="self-start btn-3d py-2 px-4 top-0 right-0 m-5  border-b-slate-400 bg-slate-200 text-black"
                        >
                            Next &rarr;
                        </motion.button>
                    </div>
                    <div className="w-full h-full overflow-hidden grid place-items-center ">
                        <Reorder.Group
                            axis="y"
                            values={playersTotalScoreList}
                            onReorder={SetPlayersTotalScoreList}
                            className="h-5/6 overflow-hidden w-9/12 "
                        >
                            {playersTotalScoreList.map((data, index) => (
                                <Reorder.Item
                                    dragListener={false}
                                    transition={{
                                        duration: 1,
                                        delay: 0.4,
                                    }}
                                    key={data.peerData.peer}
                                    value={data}
                                    className={`mb-3 rounded flex items-center justify-between p-4 ${
                                        index == 0 && startCounting
                                            ? "bg-white-transition"
                                            : "bg-black bg-opacity-50 "
                                    } ${index == 4 ? "mb-7" : ""}`}
                                >
                                    <p
                                        className={`font-semibold text-2xl ${
                                            index == 0 && startCounting
                                                ? "text-black-transition"
                                                : "text-white"
                                        }`}
                                    >
                                        {data.name}
                                    </p>
                                    <p
                                        className={`font-semibold text-2xl ${
                                            index == 0 && startCounting
                                                ? "text-black-transition"
                                                : "text-white"
                                        }`}
                                    >
                                        <IncreaseCounter
                                            start={startCounting}
                                            targetNumber={data.totalScore}
                                        />
                                    </p>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                    <InGameNavigationBottom />
                </div>
            ) : null}
        </>
    );
};
export default Scoreboard;
