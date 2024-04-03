import axios from "axios";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { initialState, reducer } from "../reducer/LibraryReducer";

const LibraryState = createContext();
const LibraryDispatch = createContext();

export const useLibraryState = () => {
    return useContext(LibraryState);
};

export const useLibraryDispatch = () => {
    return useContext(LibraryDispatch);
};

export const LibraryProvider = ({
    children,
    auth,
    folderId,
    path,
    recent,
    favorites,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { quizQuery, reload, folderOrderBy } = state;
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
        if (favorites) dispatch({ type: "IS_FAVORITES_QUIZ" });
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
                orderBy:
                    recent || favorites
                        ? ["updated_at", "desc"]
                        : ["quiz_title", "asc"],
            },
        });
        dispatch({ type: "RELOAD_QUIZZES_DATA" });
    }, []);

    //GET FOLDER INSIDE ROOT FOLDER
    useEffect(() => {
        axios
            .post("/user/library/folders", { orderBy: folderOrderBy })
            .then((response) => {
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
        if (!folderId) return;
        axios
            .post("/user/library/folders", {
                folderId: folderId,
                orderBy: folderOrderBy,
            })
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
    }, [reload.folders]);

    //GET QUIZ DETAIL DATA
    useEffect(() => {
        if (quizQuery.orderBy.length == 0) return;
        dispatch({
            type: "UPDATE_QUIZZES_DATA",
            payload: [],
        });
        let url = favorites ? "/favorites" : `/user/library/quizzes`;
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
    }, [quizQuery.search, reload.quizzes]);

    return (
        <LibraryState.Provider value={state}>
            <LibraryDispatch.Provider value={dispatch}>
                <main
                    className=" md:ml-24 h-[calc(100vh-11%)] bg-slate-50 grid 
                grid-cols-[minmax(80px,_120px)_repeat(11,_minmax(0,_1fr))]
                "
                >
                    <Toaster />
                    {children}
                </main>
            </LibraryDispatch.Provider>
        </LibraryState.Provider>
    );
};
