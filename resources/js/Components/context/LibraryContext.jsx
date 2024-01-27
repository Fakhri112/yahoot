import axios from "axios";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const LibraryState = createContext();
const LibraryDispatch = createContext();

export const useLibraryState = () => {
    return useContext(LibraryState);
};

export const useLibraryDispatch = () => {
    return useContext(LibraryDispatch);
};

export const LibraryProvider = ({ children, auth, folderId, path, recent }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { quizQuery, reload, notification } = state;
    const user = auth.user;

    //STORE PATH DATA AND FOLDER ID WHEN FOLDER ID IS DEFINED IN URL
    //STORE DEFAULT LOGGED USER DATA
    useEffect(() => {
        if (folderId) {
            dispatch({
                type: "UPDATE_PATH_DATA",
                payload: path,
            });
            dispatch({
                type: "UPDATE_FOLDER_ID",
                payload: folderId,
            });
        }
        if (recent) dispatch({ type: "IS_RECENT_QUIZ" });
        user.xsrf = document.cookie.replace("XSRF-TOKEN=", "");
        dispatch({
            type: "UPDATE_USER_DATA",
            payload: user,
        });
    }, []);

    //SET DEFAULT ORDER BY QUERY OF QUIZ DETAIL DATA
    useEffect(() => {
        dispatch({
            type: "UPDATE_QUIZ_QUERY_DATA",
            payload: {
                ...quizQuery,
                orderBy: recent ? ["updated_at", "desc"] : ["quiz_name", "asc"],
            },
        });
    }, []);

    //GET FOLDER INSIDE ROOT FOLDER
    useEffect(() => {
        axios.post("/user/library/folders").then((response) => {
            dispatch({
                type: "UPDATE_MYDRIVE_FOLDERS_DATA",
                payload: response.data,
            });
            if (!folderId) {
                dispatch({
                    type: "UPDATE_FOLDERS_DATA",
                    payload: response.data,
                });
                dispatch({
                    type: "UPDATE_FETCH_FOLDERS",
                    payload: false,
                });
            }
        });
    }, [reload.myDrive]);

    //GET FOLDER WITH CORRESPOND ID
    useEffect(() => {
        if (folderId) {
            axios
                .post("/user/library/folders", { folderId: folderId })
                .then((response) => {
                    dispatch({
                        type: "UPDATE_FOLDERS_DATA",
                        payload: response.data,
                    });
                    dispatch({
                        type: "UPDATE_FETCH_FOLDERS",
                        payload: false,
                    });
                });
        }
    }, [reload.folders]);

    //GET QUIZ DETAIL DATA
    useEffect(() => {
        if (quizQuery.orderBy.length == 0) return;
        dispatch({
            type: "UPDATE_QUIZZES_DATA",
            payload: [],
        });
        let url = `/user/library/quizzes`;
        let payload = {
            offset: 0,
            orderBy: quizQuery.orderBy,
            limit: 5,
            search: quizQuery.search,
            folderId: folderId ? folderId : false,
            isRecentQuiz: recent,
        };

        axios.post(url, payload).then(async (response) => {
            dispatch({
                type: "UPDATE_FETCH_QUIZZES",
                payload: false,
            });

            if (response.data.length == 0) {
                dispatch({
                    type: "UPDATE_QUIZ_QUERY_DATA",
                    payload: {
                        ...quizQuery,
                        stopFetch: true,
                    },
                });
                return;
            }
            return dispatch({
                type: "UPDATE_QUIZZES_DATA",
                payload: [...response.data],
            });
        });
    }, [quizQuery.orderBy, quizQuery.search, reload.quizzes]);

    //NOTIFICATION
    useEffect(() => {
        if (notification.success) {
            toast.success("Success");
            dispatch({
                type: "SHOW_SUCCESS_NOTIFICATION",
            });
        }
    }, [notification.success]);

    // useEffect(() => {
    //     Echo.channel("library").listen("LibraryWebsocket", (e) => {
    //         console.log(e);
    //     });
    // });

    return (
        <LibraryState.Provider value={state}>
            <LibraryDispatch.Provider value={dispatch}>
                <main
                    className=" md:ml-24 h-[calc(100vh-11%)] bg-slate-50 grid 
                md:grid-cols-[minmax(80px,_120px)_repeat(11,_minmax(0,_1fr))]
                "
                >
                    <Toaster />
                    {children}
                </main>
            </LibraryDispatch.Provider>
        </LibraryState.Provider>
    );
};

export const stateList = {
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
    },

    notification: {
        success: false,
        failed: false,
    },
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
    path: [],
};

const initialState = { ...stateList };

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

        case "SHOW_SUCCESS_NOTIFICATION":
            return {
                ...state,
                notification: {
                    ...state.notification,
                    success: !state.notification.success,
                },
            };
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
