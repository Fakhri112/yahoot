import { sleep } from "@/Lib/sleep";
import { Head } from "@inertiajs/react";
import { cloneDeep } from "lodash";
import Peer from "peerjs";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";
import { Toaster } from "react-hot-toast";
import { initialState, reducer } from "../reducer/HostReducer";

const HostState = createContext();
const HostDispatch = createContext();

export const useHostState = () => {
    return useContext(HostState);
};

export const useHostDispatch = () => {
    return useContext(HostDispatch);
};

export const HostProvider = ({ children, quiz, questions }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        playersList,
        catchPlayerData,
        gamePin,
        thumbnailBg,
        playersAnswerContainer,
        disconnectedPlayers,
        showCountdownPanel,
        playersResult,
        show,
        currentQuestionNumber,
    } = state;
    const peer = useMemo(() => {
        if (!gamePin) return false;
        return new Peer("yahoot-game-pin-" + gamePin);
    }, [gamePin]);

    useEffect(() => {
        dispatch({ type: "UPDATE_QUIZ_DETAIL", payload: { ...quiz } });
        dispatch({ type: "UPDATE_QUESTIONS", payload: [...questions] });
    }, []);

    useEffect(() => {
        if (!gamePin || !peer) return;

        peer.on("open", function (id) {
            window.addEventListener("beforeunload", function (event) {
                peer.destroy();
                if (!sessionStorage.getItem("submitted"))
                    axios.delete("/play/delete-pin/" + gamePin);
                return;
            });
        });

        peer.on("connection", function (conn) {
            conn.on("open", function () {
                conn.on("data", function (data) {
                    dispatch({
                        type: "GET_PLAYER_DATA",
                        payload: { ...data, peerData: conn, totalScore: 0 },
                    });
                });
            });
            conn.on("close", function () {
                dispatch({
                    type: "GET_PLAYER_DATA",
                    payload: { peerData: conn, type: "disconnected" },
                });
            });
        });
    }, [gamePin, peer]);

    useEffect(() => {
        const updatePlayerList = async () => {
            let payload = {
                status: "waitingGame",
                type: "connected",
                questionData: "",
                questionNumber: 0,
            };
            let checkDuplicateName = playersList.find(
                (person) => person.name === catchPlayerData?.name
            );
            if (checkDuplicateName) {
                return catchPlayerData.peerData.send({
                    type: "duplicatedName",
                });
            }
            if (show.finalResult) return;
            if (!show.waitingRoom) {
                let playersResultCopy = cloneDeep(playersResult);
                if (playersResultCopy.length > 0) {
                    playersResultCopy.forEach((element, index) => {
                        if (index < currentQuestionNumber)
                            element.push({
                                name: catchPlayerData.name,
                                time: null,
                                score: 0,
                                answer: null,
                                correct_incorrect: false,
                            });
                    });
                    dispatch({
                        type: "UPDATE_PLAYERS_RESULT_DATA",
                        payload: playersResultCopy,
                    });
                }
                if (show.answerGraph || show.scoreBoard) {
                    dispatch({
                        type: "COLLECT_PLAYERS_ANSWER",
                        payload: [
                            ...playersAnswerContainer,
                            {
                                peerData: catchPlayerData.peerData,
                                name: catchPlayerData.name,
                                time: null,
                                score: 0,
                                answer: null,
                                correct_incorrect: false,
                            },
                        ],
                    });
                    payload.status = "pendingJoin";
                }
                if (showCountdownPanel.quiz) {
                    payload.status = "proceedToQuizCountdown";
                }

                if (showCountdownPanel.question) payload.status = false;
                if (show.currentQuestion && !show.answerGraph)
                    payload.status = "proceedToChoosingAnswer";
                if (
                    showCountdownPanel.question ||
                    (show.currentQuestion && !show.answerGraph)
                ) {
                    payload.questionData = questions[currentQuestionNumber];
                    payload.questionNumber = currentQuestionNumber + 1;
                }
            }

            if (payload.status) {
                catchPlayerData.peerData.send({
                    type: "toggleThumbail",
                    status: thumbnailBg,
                });
                catchPlayerData.peerData.send(payload);
            }

            await sleep(200);
            return dispatch({
                type: "UPDATE_PLAYERS_LIST",
                payload: [...playersList, catchPlayerData],
            });
        };

        if (!catchPlayerData) return;
        if (catchPlayerData?.type == "disconnected") {
            if (show.waitingRoom) {
                return dispatch({
                    type: "UPDATE_PLAYERS_LIST",
                    payload: playersList.filter((item) => {
                        return (
                            item.peerData.peer != catchPlayerData.peerData.peer
                        );
                    }),
                });
            }
            let getDisconnectedPlayerData = playersList.filter((item) => {
                return item.peerData.peer == catchPlayerData.peerData.peer;
            });
            let checkDuplicateNameInDisconnectedPlayers =
                disconnectedPlayers.find(
                    (person) =>
                        person.name === getDisconnectedPlayerData[0]?.name
                );
            if (checkDuplicateNameInDisconnectedPlayers) return;
            dispatch({
                type: "UPDATE_DISCONNECTED_PLAYERS_DATA",
                payload: [...disconnectedPlayers, getDisconnectedPlayerData[0]],
            });
            if (show.answerGraph || show.scoreBoard) return;
            if (
                showCountdownPanel.question ||
                (show.currentQuestion && !show.answerGraph)
            ) {
                let checkDuplicateNameInContainer = playersAnswerContainer.find(
                    (person) =>
                        person.name === getDisconnectedPlayerData[0]?.name
                );
                if (checkDuplicateNameInContainer) return;
                return dispatch({
                    type: "COLLECT_PLAYERS_ANSWER",
                    payload: [
                        ...playersAnswerContainer,
                        {
                            peerData: catchPlayerData.peerData,
                            name: getDisconnectedPlayerData[0]?.name,
                            time: null,
                            score: 0,
                            answer: null,
                            correct_incorrect: false,
                        },
                    ],
                });
            }
        }
        if (catchPlayerData?.type == "updateAvatar") {
            return dispatch({
                type: "UPDATE_PLAYERS_LIST",
                payload: playersList.map((item) => ({
                    ...item,
                    avatar:
                        item.peerData.peer == catchPlayerData.peerData.peer
                            ? catchPlayerData.avatar
                            : item.avatar,
                })),
            });
        }
        if (catchPlayerData?.type == "playerAnswerData") return;
        updatePlayerList();
    }, [catchPlayerData]);

    useEffect(() => {
        if (playersList == 0) return;

        playersList.forEach((player) => {
            player.peerData.send({
                type: "toggleThumbail",
                status: thumbnailBg,
            });
        });
    }, [thumbnailBg]);
    return (
        <HostState.Provider value={state}>
            <HostDispatch.Provider value={dispatch}>
                <Head>
                    <title>
                        {show.waitingRoom
                            ? "Join The Game - "
                            : show.finalResult
                            ? "Game Result - "
                            : "In Game - "}
                    </title>
                    <meta http-equiv="cache-control" content="no-cache" />
                    <meta http-equiv="expires" content="0" />
                    <meta http-equiv="pragma" content="no-cache" />
                </Head>
                <Toaster />
                <div
                    style={{
                        backgroundImage: `url(${window.location.protocol}//${window.location.host}${quiz.thumbnail})`,
                    }}
                    className={`h-screen flex flex-col bg-cover`}
                >
                    <div
                        className={`absolute inset-0 ${
                            thumbnailBg ? "bg-black opacity-50" : "bg-blue-800"
                        } `}
                    ></div>
                    {children}
                </div>
            </HostDispatch.Provider>
        </HostState.Provider>
    );
};
