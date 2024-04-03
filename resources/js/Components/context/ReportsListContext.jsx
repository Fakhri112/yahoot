import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import NavBar from "../NavBar";
import ProfileSidebar from "../ProfileSidebar";
import axios from "axios";
import { initialState, reducer } from "../reducer/ReportListReducer";

const ReportsListState = createContext();
const ReportsListDispatch = createContext();

export const useReportsListState = () => {
    return useContext(ReportsListState);
};

export const useReportsListDispatch = () => {
    return useContext(ReportsListDispatch);
};
export const ReportsListProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { orderBy, reloadQuizReportsData } = state;

    useEffect(() => {
        dispatch({ type: "UPDATE_QUIZ_REPORTS_DATA", payload: [] });

        axios.post("reports", { orderBy: orderBy.query }).then((res) => {
            dispatch({
                type: "UPDATE_FETCH_DATA",
                payload: false,
            });
            dispatch({ type: "UPDATE_QUIZ_REPORTS_DATA", payload: res.data });
        });
    }, [reloadQuizReportsData]);

    return (
        <ReportsListState.Provider value={state}>
            <ReportsListDispatch.Provider value={dispatch}>
                <Toaster />
                <div className="h-screen bg-white overflow-hidden">
                    <NavBar />
                    <ProfileSidebar />
                    <main className="ml-0 md:ml-24 h-[calc(100vh-11%)] bg-slate-50 p-2 overflow-y-auto">
                        <div className=" h-full p-2 md:mb-0 mb-10">
                            {children}
                        </div>
                    </main>
                </div>
            </ReportsListDispatch.Provider>
        </ReportsListState.Provider>
    );
};
