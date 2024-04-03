import React, { createContext, useContext, useReducer, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import axios from "axios";
import { initialState, reducer } from "../reducer/BrowseQuizReducer";

const BrowseQuizState = createContext();
const BrowseQuizDispatch = createContext();

export const useBrowseQuizState = () => {
    return useContext(BrowseQuizState);
};

export const useBrowseQuizDispatch = () => {
    return useContext(BrowseQuizDispatch);
};

export const BrowseQuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { filter, quizQuery } = state;

    useEffect(() => {
        dispatch({
            type: "UPDATE_QUIZ_QUERY_DATA",
            payload: {
                ...quizQuery,
                offset: 12,
                stopFetch: false,
                orderBy: filter.latest
                    ? ["quiz_details.created_at", "desc"]
                    : filter.popular
                    ? ["total_players", "desc"]
                    : filter.oldest
                    ? ["quiz_details.created_at", "asc"]
                    : null,
            },
        });
    }, [filter]);

    useEffect(() => {
        if (quizQuery.orderBy.length == 0) return;
        dispatch({
            type: "UPDATE_QUIZZES_DATA",
            payload: [],
        });
        let url = `/browse`;
        let payload = {
            offset: 0,
            limit: 12,
            search: quizQuery.search,
            orderBy: quizQuery.orderBy,
        };
        axios.post(url, payload).then((response) => {
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
    }, [quizQuery.search, quizQuery.orderBy]);

    return (
        <BrowseQuizState.Provider value={state}>
            <BrowseQuizDispatch.Provider value={dispatch}>
                <div className="h-screen bg-white">
                    <NavBar className={"!fixed z-50 bg-white"} />
                    <main className="h-[89%] pt-20 flex flex-col bg-slate-50 py-5 px-8 lg:px-20">
                        {children}
                    </main>
                </div>
            </BrowseQuizDispatch.Provider>
        </BrowseQuizState.Provider>
    );
};
