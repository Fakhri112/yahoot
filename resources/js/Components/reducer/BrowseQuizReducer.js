const initialState = {
    quizzesData: [],
    stopFetch: false,
    fetchQuizzes: true,
    quizQuery: {
        orderBy: [],
        offset: 12,
        limit: 12,
        stopFetch: false,
        search: "",
    },
    filter: {
        latest: true,
        popular: false,
        oldest: false,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        // Define actions to update specific parts of the state
        case "UPDATE_QUIZZES_DATA":
            return { ...state, quizzesData: action.payload };
        case "UPDATE_FETCH_QUIZZES":
            return { ...state, fetchQuizzes: action.payload };
        case "UPDATE_QUIZ_QUERY_DATA":
            return { ...state, quizQuery: action.payload };
        case "UPDATE_FILTER_DATA":
            return { ...state, filter: action.payload };

        default:
            return state;
    }
};

export { initialState, reducer };
