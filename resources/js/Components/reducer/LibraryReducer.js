const initialState = {
    user: {},
    quizzesData: [],
    selectedQuizzes: [],
    selectedFolder: "",
    myDriveFolders: [],
    foldersData: [],

    fetchFolders: true,
    fetchQuizzes: true,

    quizQuery: {
        orderBy: [],
        offset: 5,
        limit: 5,
        stopFetch: false,
        search: "",
        sortName: "name",
    },
    folderOrderBy: ["folder_name", "asc"],

    status: {
        isDuplicate: false,
        isMove: false,
        isDeletion: false,
    },
    bulkSelect: false,
    modal: {
        new_folder: false,
        open_directory: false,
        rename: false,
        deletion: false,
    },
    rename: {
        type: "",
        id: "",
        name: "",
    },
    reload: {
        folders: 1,
        myDrive: 1,
        quizzes: 1,
    },
    folderId: null,
    isRecentQuiz: false,
    isFavoritesQuiz: false,
    path: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        // Define actions to update specific parts of the state
        case "UPDATE_USER_DATA":
            return { ...state, user: action.payload };
        case "UPDATE_QUIZZES_DATA":
            return { ...state, quizzesData: action.payload };
        case "UPDATE_SELECTED_QUIZZES_DATA":
            return { ...state, selectedQuizzes: action.payload };
        case "UPDATE_SELECTED_FOLDER":
            return { ...state, selectedFolder: action.payload };
        case "UPDATE_QUIZ_QUERY_DATA":
            return { ...state, quizQuery: action.payload };
        case "UPDATE_FOLDER_ORDER_BY":
            return { ...state, folderOrderBy: action.payload };
        case "UPDATE_FETCH_QUIZZES":
            return { ...state, fetchQuizzes: action.payload };
        case "UPDATE_FETCH_FOLDERS":
            return { ...state, fetchFolders: action.payload };
        case "UPDATE_BULK_SELECT":
            return { ...state, bulkSelect: action.payload };
        case "UPDATE_STATUS_DATA":
            return { ...state, status: action.payload };
        case "UPDATE_MYDRIVE_FOLDERS_DATA":
            return { ...state, myDriveFolders: action.payload };
        case "UPDATE_FOLDERS_DATA":
            return { ...state, foldersData: action.payload };
        case "UPDATE_MODAL":
            return { ...state, modal: action.payload };
        case "UPDATE_PATH_DATA":
            return { ...state, path: action.payload };
        case "UPDATE_FOLDER_ID":
            return { ...state, folderId: action.payload };
        case "UPDATE_RENAME_DATA":
            return { ...state, rename: action.payload };

        case "IS_RECENT_QUIZ":
            return { ...state, isRecentQuiz: true };
        case "IS_FAVORITES_QUIZ":
            return { ...state, isFavoritesQuiz: true };

        case "RELOAD_FOLDERS_DATA":
            return {
                ...state,
                reload: { ...state.reload, folders: state.reload.folders + 1 },
            };
        case "RELOAD_MYDRIVE_DATA":
            return {
                ...state,
                reload: {
                    ...state.reload,
                    myDrive: state.reload.myDrive + 1,
                },
            };
        case "RELOAD_QUIZZES_DATA":
            return {
                ...state,
                reload: { ...state.reload, quizzes: state.reload.quizzes + 1 },
            };

        default:
            return state;
    }
};

export { initialState, reducer };
