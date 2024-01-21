import axios from "axios";
import React, { createContext, useContext, useReducer, useEffect } from "react";

const LibraryState = createContext();
const LibraryDispatch = createContext();

export const useLibraryState = () => {
    return useContext(LibraryState);
};

export const useLibraryDispatch = () => {
    return useContext(LibraryDispatch);
};

export const LibraryProvider = ({ children, auth, folderId, path }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const user = auth.user;

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
        user.xsrf = document.cookie.replace("XSRF-TOKEN=", "");
        dispatch({
            type: "UPDATE_USER_DATA",
            payload: user,
        });
    }, []);

    useEffect(() => {
        axios.get("/user/library/folders").then((response) => {
            dispatch({
                type: "UPDATE_MYDRIVE_FOLDERS_DATA",
                payload: response.data,
            });

            if (!folderId) {
                dispatch({
                    type: "UPDATE_FOLDERS_DATA",
                    payload: response.data,
                });
            }
        });
    }, [state.reload.myDrive]);

    useEffect(() => {
        let url = `/user/library${folderId ? "/" + folderId : ""}/quizzes`;

        axios.get(url).then((response) => {
            dispatch({
                type: "UPDATE_QUIZZES_DATA",
                payload: response.data,
            });
        });
    }, [state.reload.quizzes]);

    useEffect(() => {
        if (folderId) {
            axios
                .get("/user/library/" + folderId + "/folders")
                .then((response) => {
                    dispatch({
                        type: "UPDATE_FOLDERS_DATA",
                        payload: response.data,
                    });
                });
        }
    }, [state.reload.folders]);

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
    path: [],
    myDriveFolders: [],
    foldersData: [],
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
        case "TOGGLE_BULK_SELECT":
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
