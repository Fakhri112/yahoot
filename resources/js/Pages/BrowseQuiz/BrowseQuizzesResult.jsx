import React, { useCallback, useEffect, useRef } from "react";
import { Spinner } from "@/Components/svg/Spinner";
import {
    useBrowseQuizDispatch,
    useBrowseQuizState,
} from "@/Components/context/BrowseQuizContext";
import CardQuiz from "@/Components/CardQuiz";
const BrowseQuizzesResult = () => {
    const { quizQuery, quizzesData, fetchQuizzes } = useBrowseQuizState();
    const dispatch = useBrowseQuizDispatch();
    const loading = useRef();

    const fetchMoreQuiz = useCallback(async () => {
        if (quizzesData.length == 0) return;
        let url = `/browse`;
        let payload = {
            orderBy: quizQuery.orderBy,
            offset: quizQuery.offset,
            limit: quizQuery.limit,
            search: quizQuery.search,
        };

        let response = await axios.post(url, payload);
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
        dispatch({
            type: "UPDATE_QUIZ_QUERY_DATA",
            payload: {
                ...quizQuery,
                offset: quizQuery.offset + 12,
            },
        });
        return dispatch({
            type: "UPDATE_QUIZZES_DATA",
            payload: [...quizzesData, ...response.data],
        });
    }, [quizzesData, quizQuery.search]);

    useEffect(() => {
        if (quizzesData.length == 0 || fetchQuizzes) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (quizQuery.stopFetch) return;
                        fetchMoreQuiz();
                    }
                });
            },
            { threshold: 0.75 }
        );
        observer.observe(loading.current);
        return () => {
            observer.disconnect();
        };
    });

    return (
        <>
            {quizzesData.length > 0 && !fetchQuizzes ? (
                <div className="h-full text-slate-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
                    {quizzesData.map((data, index) => (
                        <CardQuiz
                            key={index}
                            data={data}
                            username={data.name}
                            quizId={data.quiz_id}
                            profilePic={data.profile_pic}
                        />
                    ))}
                    <div
                        className={`${
                            quizQuery.stopFetch ? "hidden" : ""
                        } col-span-1 md:col-span-3 lg:col-span-4 grid p-2 place-items-center w-full`}
                        ref={loading}
                    >
                        <Spinner />
                    </div>
                </div>
            ) : fetchQuizzes ? (
                <div className="h-full text-slate-900 grid place-items-center gap-x-4 gap-y-4">
                    <Spinner />
                </div>
            ) : quizzesData.length == 0 && !fetchQuizzes ? (
                <div className="h-full text-slate-900 grid place-items-center gap-x-4 gap-y-4">
                    No results match your search criteria 😕
                </div>
            ) : null}
        </>
    );
};

export default BrowseQuizzesResult;
