import React, {
    createContext,
    useState,
    useContext,
    useReducer,
    useEffect,
} from "react";
import Peer from "peerjs";
import { peerOpen } from "@/Lib/peerOpen";
import { Spinner } from "../svg/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { setTimeout } from "worker-timers";
import { motivationalPhrases } from "@/Lib/motiavtionWords";
import { praiseSentences } from "@/Lib/praiseSentences";
import { reducer, initialState } from "../reducer/PlayerReducer";

const PlayerState = createContext();
const PlayerDispatch = createContext();

export const usePlayerState = () => {
    return useContext(PlayerState);
};

export const usePlayerDispatch = () => {
    return useContext(PlayerDispatch);
};

export const PlayerProvider = ({ children }) => {
    const [thumbnailBg, SetThumbnailBg] = useState(false);
    const [doubleTrigger, SetDoubleTrigger] = useState(0);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        username,
        pin,
        avatar,
        peer,
        loadingOverlay,
        catchHostData,
        choosedAnswer,
        score,
    } = state;

    useEffect(() => {
        if (!peer.tryToConnect) return;
        dispatch({ type: "TOGGLE_LOADING", payload: true });
        const connectToHost = async () => {
            let peer = new Peer();
            await peerOpen(peer);
            let playerData = {
                name: username,
                avatar: avatar,
            };

            peer.on("error", function (err) {
                dispatch({ type: "TOGGLE_LOADING", payload: false });
                dispatch({
                    type: "CONNECTING_TO_HOST",
                    payload: false,
                });
                return toast.error("There is an error. Please try again");
            });

            let conn = peer.connect("yahoot-game-pin-" + pin.value, {
                reliable: true,
            });

            setTimeout(() => {
                if (sessionStorage.getItem("connected") != "true") {
                    peer.destroy();
                    dispatch({ type: "TOGGLE_LOADING", payload: false });
                    dispatch({
                        type: "CONNECTING_TO_HOST",
                        payload: false,
                    });
                    toast.error("Connection Timeout (Internal Server Error)");
                    return;
                }
            }, 10000);

            conn.on("open", function (err) {
                conn.send(playerData);
                conn.on("data", function (data) {
                    dispatch({
                        type: "GET_HOST_DATA",
                        payload: { ...data, peerData: conn },
                    });
                    if (
                        data.type != "questionCountdownTime" &&
                        data.type != "questionOnScreenTime"
                    ) {
                        console.log(data);
                        SetDoubleTrigger(Math.floor(Math.random() * 80000));
                    }
                });
            });
            conn.on("close", function (err) {
                dispatch({ type: "DISCONNECTED_TO_HOST" });
            });
            conn.on("disconnected", function (err) {
                console.log("closed");
            });

            window.addEventListener("beforeunload", function (event) {
                sessionStorage.removeItem("connected");
                peer.destroy();
                return;
            });
        };

        connectToHost();
        dispatch({
            type: "CONNECTING_TO_HOST",
            payload: false,
        });
    }, [peer.tryToConnect]);

    useEffect(() => {
        if (!catchHostData) return;
        if (catchHostData?.type == "duplicatedName") {
            dispatch({ type: "TOGGLE_LOADING", payload: false });
            dispatch({
                type: "CONNECTING_TO_HOST",
                payload: false,
            });
            toast.error("Username has already taken. Please choose another");
            return;
        }
        if (catchHostData?.type == "connected") {
            sessionStorage.setItem("connected", true);
            dispatch({ type: "TOGGLE_LOADING", payload: false });

            if (catchHostData.status == "waitingGame")
                dispatch({ type: "TOGGLE_ENTERED_PLAYER_FIRST_GAME" });
            if (catchHostData.status == "pendingJoin")
                dispatch({ type: "TOGGLE_ENTERED_PLAYER_MIDDLE_GAME" });
            if (catchHostData.status == "proceedToQuizCountdown") {
                dispatch({ type: "PROCEED_TO_GAME" });
                dispatch({
                    type: "TOGGLE_SHOW_QUIZ_COUNTDOWN",
                    payload: true,
                });
            }
            if (
                catchHostData.status == "proceedToQuestionCountdown" ||
                catchHostData.status == "proceedToChoosingAnswer"
            ) {
                dispatch({ type: "PROCEED_TO_GAME" });
                dispatch({
                    type: "UPDATE_CURRENT_QUESTION_DATA",
                    payload: {
                        ...catchHostData.questionData,
                        questionNumber: catchHostData.questionNumber,
                    },
                });

                if (catchHostData.status == "proceedToQuestionCountdown")
                    dispatch({ type: "TOGGLE_SHOW_QUESTION_COUNTDOWN" });
                if (catchHostData.status == "proceedToChoosingAnswer")
                    dispatch({ type: "TOGGLE_SHOW_CHOOSING_ANSWER" });
            }

            return dispatch({
                type: "CONNECTED_TO_HOST",
                payload: catchHostData.peerData,
            });
        }
        if (catchHostData?.type == "toggleThumbail") {
            return SetThumbnailBg(catchHostData.status);
        }
        if (catchHostData?.type == "showAnswerResult")
            return dispatch({ type: "TOGGLE_SHOW_ANSWER_RESULT" });
        if (catchHostData?.type == "startGame") {
            dispatch({ type: "PROCEED_TO_GAME" });
            if (catchHostData?.status == "quizCountdown") {
                return dispatch({
                    type: "TOGGLE_SHOW_QUIZ_COUNTDOWN",
                    payload: true,
                });
            }
            if (catchHostData?.status == "questionOnScreen") {
                if (choosedAnswer.answer != "") {
                    dispatch({
                        type: "UPDATE_CHOOSED_ANSWER_DATA",
                        payload: initialState.choosedAnswer,
                    });
                    dispatch({ type: "TOGGLE_SHOW_ANSWER_RESULT" });
                }

                dispatch({
                    type: "TOGGLE_SHOW_QUIZ_COUNTDOWN",
                    payload: false,
                });
                dispatch({ type: "TOGGLE_SHOW_QUESTION_COUNTDOWN" });
                return dispatch({
                    type: "UPDATE_CURRENT_QUESTION_DATA",
                    payload: {
                        ...catchHostData.data,
                        questionNumber: catchHostData.questionNumber,
                        timeoutAnswerSendDelay:
                            catchHostData.timeoutAnswerSendDelay,
                    },
                });
            }
        }
        if (catchHostData?.type == "showFinalPanel") {
            dispatch({ type: "TOGGLE_SHOW_ANSWER_RESULT" });
            return dispatch({ type: "PROCEED_TO_FINAL_RESULT" });
        }
        if (catchHostData?.type == "showFinalScore") {
            dispatch({
                type: "UPDATE_MY_FINAL_SCORE_DATA",
                payload: {
                    phrase:
                        catchHostData.rank <= 3
                            ? praiseSentences[Math.floor(Math.random() * 31)]
                            : motivationalPhrases[
                                  Math.floor(Math.random() * 32)
                              ],
                    quizTitle: catchHostData.quizTitle,
                    rank: catchHostData.rank,
                    score,
                },
            });
        }
        if (catchHostData?.type == "showFinalScoreConfetti")
            dispatch({ type: "TOGGLE_CONFETTI" });
    }, [catchHostData, doubleTrigger]);

    useEffect(() => {
        if (peer.disconnected && peer.connected) {
            toast.error("You've been kicked of the game");
            dispatch({ type: "PURGE_DATA" });
            location.reload(true);
        }
    }, [peer.disconnected]);

    return (
        <PlayerState.Provider value={state}>
            <PlayerDispatch.Provider value={dispatch}>
                <Toaster />
                <div
                    style={{
                        backgroundImage: `url(${window.location.protocol}//${window.location.host}${pin?.valid?.thumbnail})`,
                    }}
                    className="bg-cover bg-violet-800 h-screen grid  grid-rows-[1fr]"
                >
                    {loadingOverlay ? (
                        <div className="absolute inset-0 z-20 grid place-items-center">
                            <Spinner
                                classname={"absolute z-50 h-16 fill-slate-800"}
                            />
                            <div className=" bg-white z-10 inset-0  absolute opacity-50"></div>
                        </div>
                    ) : null}

                    {pin.valid ? (
                        <div
                            className={`absolute inset-0 -z-9 ${
                                thumbnailBg
                                    ? "bg-black opacity-50"
                                    : "bg-blue-800"
                            } `}
                        ></div>
                    ) : null}

                    {children}
                </div>
            </PlayerDispatch.Provider>
        </PlayerState.Provider>
    );
};
