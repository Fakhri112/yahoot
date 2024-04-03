const initialState = {
    orderBy: {
        query: ["created_at", "desc"],
        sortName: "latest",
    },
    quizReportsData: [],
    selectedQuizReports: [],
    bulkSelect: false,
    fetchData: true,
    rename: {
        id: "",
        name: "",
    },
    modal: {
        rename: false,
        deletion: false,
    },
    reloadQuizReportsData: 1,
};

const reducer = (state, action) => {
    switch (action.type) {
        // Define actions to update specific parts of the stat
        case "UPDATE_ORDER_BY":
            return { ...state, orderBy: action.payload };
        case "UPDATE_QUIZ_REPORTS_DATA":
            return { ...state, quizReportsData: action.payload };
        case "UPDATE_BULK_SELECT":
            return { ...state, bulkSelect: action.payload };
        case "UPDATE_SELECTED_QUIZ_REPORTS_DATA":
            return { ...state, selectedQuizReports: action.payload };
        case "UPDATE_RENAME_DATA":
            return { ...state, rename: action.payload };
        case "UPDATE_FETCH_DATA":
            return { ...state, fetchData: action.payload };
        case "UPDATE_MODAL":
            return { ...state, modal: action.payload };
        case "RELOAD_QUIZ_REPORTS_DATA":
            return {
                ...state,
                reloadQuizReportsData: state.reloadQuizReportsData + 1,
            };

        default:
            return state;
    }
};
export { initialState, reducer };
