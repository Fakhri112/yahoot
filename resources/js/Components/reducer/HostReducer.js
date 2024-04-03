const initialState = {
    catchPlayerData: false,
    playersList: [],
    playersAnswerContainer: [],
    playersResult: [],
    playersTotalScoreList: [],
    disconnectedPlayers: [],
    gamePin: false,
    timeLapse: 0,
    gamePinLock: false,
    thumbnailBg: false,
    questions: [],
    quizDetail: {},
    currentQuestionNumber: 0,
    show: {
        waitingRoom: true,
        currentQuestion: false,
        answerGraph: false,
        scoreBoard: false,
        finalResult: false,
    },
    showCountdownPanel: { quiz: false, question: false },
};

const reducer = (state, action) => {
    switch (action.type) {
        // Define actions to update specific parts of the state
        case "GET_PLAYER_DATA":
            return { ...state, catchPlayerData: action.payload };
        case "UPDATE_QUESTIONS":
            return { ...state, questions: action.payload };
        case "COLLECT_PLAYERS_ANSWER":
            return { ...state, playersAnswerContainer: action.payload };
        case "UPDATE_PLAYERS_RESULT_DATA":
            return { ...state, playersResult: action.payload };
        case "UPDATE_PLAYERS_TOTAL_SCORE_LIST":
            return { ...state, playersTotalScoreList: action.payload };
        case "UPDATE_DISCONNECTED_PLAYERS_DATA":
            return { ...state, disconnectedPlayers: action.payload };
        case "UPDATE_QUIZ_DETAIL":
            return { ...state, quizDetail: action.payload };
        case "INCREMENT_QUESTIONS":
            return {
                ...state,
                currentQuestionNumber: state.currentQuestionNumber + 1,
            };
        case "UPDATE_PLAYERS_LIST":
            return { ...state, playersList: action.payload };
        case "UPDATE_GAME_PIN":
            return { ...state, gamePin: action.payload };
        case "UPDATE_GAME_PIN_LOCK":
            return { ...state, gamePinLock: action.payload };
        case "START_TIME_LAPSE":
            return { ...state, timeLapse: Date.now() };
        case "TOGGLE_BACKGROUND":
            return { ...state, thumbnailBg: !state.thumbnailBg };
        case "TOGGLE_SHOW_QUIZ_COUNTDOWN":
            return {
                ...state,
                showCountdownPanel: {
                    ...state.showCountdownPanel,
                    quiz: !state.showCountdownPanel.quiz,
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
        case "TOGGLE_SHOW_WAITING_ROOM":
            return {
                ...state,
                show: {
                    ...state.show,
                    waitingRoom: !state.show.waitingRoom,
                },
            };
        case "TOGGLE_SHOW_CURRENT_QUESTION":
            return {
                ...state,
                show: {
                    ...state.show,
                    currentQuestion: !state.show.currentQuestion,
                },
            };
        case "TOGGLE_SHOW_ANSWER_GRAPH":
            return {
                ...state,
                show: {
                    ...state.show,
                    answerGraph: !state.show.answerGraph,
                },
            };
        case "TOGGLE_SHOW_SCOREBOARD":
            return {
                ...state,
                show: {
                    ...state.show,
                    scoreBoard: !state.show.scoreBoard,
                },
            };
        case "TOGGLE_SHOW_FINAL_RESULT":
            return {
                ...state,
                show: {
                    ...state.show,
                    finalResult: !state.show.finalResult,
                },
            };
        default:
            return state;
    }
};

export { initialState, reducer };
