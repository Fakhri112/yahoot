import { seeds } from "@/Lib/avatarSeeds";

const initialState = {
    catchHostData: false,
    pin: {},
    currentQuestion: false,
    username: "",
    avatar: seeds[Math.floor(Math.random() * 20)],
    modalSeed: false,
    enteredPlayer: {
        firstGame: false,
        middleGame: false,
    },
    choosedAnswer: {
        answer: "",
        time: "",
        defaultTime: "",
    },
    score: 0,
    peer: {
        tryToConnect: false,
        connected: false,
        connection: "",
        disconnected: false,
    },
    loadingOverlay: false,
    myFinalScore: {},
    confetti: false,
    showCountdownPanel: { quiz: false, question: false },
    show: {
        playerEnter: true,
        playerInformationBar: false,
        choosingAnswer: false,
        answerResult: false,
        finalResult: false,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        // Define actions to update specific parts of the state
        case "GET_HOST_DATA":
            return { ...state, catchHostData: action.payload };
        case "UPDATE_PIN_DATA":
            return { ...state, pin: action.payload };
        case "UPDATE_CURRENT_QUESTION_DATA":
            return { ...state, currentQuestion: action.payload };
        case "UPDATE_USERNAME":
            return { ...state, username: action.payload };
        case "SET_DEFAULT_COUNTDOWN_TIME":
            return {
                ...state,
                countdown: {
                    defaultTime: action.payload,
                    time: action.payload,
                },
            };
        case "UPDATE_TIME":
            return {
                ...state,
                countdown: {
                    ...state.countdown,
                    time: action.payload,
                },
            };

        case "UPDATE_AVATAR":
            return { ...state, avatar: action.payload };
        case "UPDATE_CHOOSED_ANSWER_DATA":
            return { ...state, choosedAnswer: action.payload };
        case "UPDATE_MY_FINAL_SCORE_DATA":
            return { ...state, myFinalScore: action.payload };

        case "INCREMENT_SCORE":
            return { ...state, score: state.score + action.payload };
        case "TOGGLE_CONFETTI":
            return { ...state, confetti: !state.confetti };
        case "TOGGLE_ENTERED_PLAYER_FIRST_GAME":
            return {
                ...state,
                enteredPlayer: {
                    ...state.enteredPlayer,
                    firstGame: !state.enteredPlayer.firstGame,
                },
            };
        case "TOGGLE_ENTERED_PLAYER_MIDDLE_GAME":
            return {
                ...state,
                enteredPlayer: {
                    ...state.enteredPlayer,
                    middleGame: !state.enteredPlayer.middleGame,
                },
            };
        case "TOGGLE_MODAL_SEED":
            return { ...state, modalSeed: !state.modalSeed };
        case "TOGGLE_LOADING":
            return { ...state, loadingOverlay: action.payload };
        case "TOGGLE_SHOW_QUIZ_COUNTDOWN":
            return {
                ...state,
                showCountdownPanel: {
                    ...state.showCountdownPanel,
                    quiz: action.payload,
                },
            };
        case "TOGGLE_SHOW_QUESTION_COUNTDOWN":
            return {
                ...state,
                showCountdownPanel: {
                    ...state.showCountdownPanel,
                    question: !state.showCountdownPanel.question,
                },
            };
        case "PROCEED_TO_GAME":
            return {
                ...state,
                show: {
                    ...state.show,
                    playerEnter: false,
                    playerInformationBar: true,
                },
            };
        case "PROCEED_TO_FINAL_RESULT":
            return {
                ...state,
                show: {
                    ...state.show,
                    playerEnter: false,
                    playerInformationBar: false,
                    finalResult: true,
                },
            };
        case "TOGGLE_SHOW_CHOOSING_ANSWER":
            return {
                ...state,
                show: {
                    ...state.show,
                    choosingAnswer: !state.show.choosingAnswer,
                },
            };
        case "TOGGLE_SHOW_ANSWER_RESULT":
            return {
                ...state,
                show: {
                    ...state.show,
                    answerResult: !state.show.answerResult,
                },
            };
            s;
        case "CONNECTING_TO_HOST":
            return {
                ...state,
                peer: { ...state.peer, tryToConnect: action.payload },
            };
        case "CONNECTED_TO_HOST":
            return {
                ...state,
                peer: {
                    ...state.peer,
                    connected: true,
                    connection: action.payload,
                },
            };
        case "DISCONNECTED_TO_HOST":
            return { ...state, peer: { ...state.peer, disconnected: true } };
        case "PURGE_DATA":
            return { ...initialState };
        default:
            return state;
    }
};
export { initialState, reducer };
