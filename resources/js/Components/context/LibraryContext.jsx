import React, { createContext, useContext, useReducer, useEffect } from "react";

const LibraryState = createContext();
const LibraryDispatch = createContext();

export const useLibraryState = () => {
    return useContext(LibraryState);
};

export const useLibraryDispatch = () => {
    return useContext(LibraryDispatch);
};

export const LibraryProvider = ({ children, auth, quizzesData }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const user = auth.user;
    useEffect(() => {
        dispatch({
            type: "UPDATE_QUIZZES_DATA",
            payload: quizzesData,
        });
        dispatch({
            type: "UPDATE_USER_DATA",
            payload: user,
        });
    }, []);

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
};

const initialState = { ...stateList };

const reducer = (state, action) => {
    switch (action.type) {
        // Define actions to update specific parts of the state
        case "UPDATE_USER_DATA":
            return { ...state, user: action.payload };
        case "UPDATE_QUIZZES_DATA":
            return { ...state, quizzesData: action.payload };
        default:
            return state;
    }
};
