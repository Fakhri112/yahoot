import ProfilePicture from "@/Components/svg/ProfilePicture";
import { Link } from "@inertiajs/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";
import { LibraryDropdown } from "@/Components/dropdown/LibraryDropdown";
import { Spinner } from "@/Components/svg/Spinner";
import FavoriteIcon from "@/Components/svg/FavoriteIcon";
import toast from "react-hot-toast";
import { cloneDeep } from "lodash";

export const QuizPanel = () => {
    const {
        user,
        selectedQuizzes,
        quizzesData,
        modal,
        rename,
        status,
        quizQuery,
        folderId,
        isRecentQuiz,
        isFavoritesQuiz,
    } = useLibraryState();
    const dispatch = useLibraryDispatch();
    const loading = useRef();

    const handleCheck = (quiz_id) => {
        let selectedQuizCopy = cloneDeep(selectedQuizzes);
        if (selectedQuizCopy.includes(quiz_id)) {
            selectedQuizCopy.splice(selectedQuizCopy.indexOf(quiz_id), 1);
        } else {
            selectedQuizCopy.push(quiz_id);
            dispatch({ type: "UPDATE_BULK_SELECT", payload: true });
        }
        dispatch({
            type: "UPDATE_SELECTED_QUIZZES_DATA",
            payload: selectedQuizCopy,
        });
        if (selectedQuizCopy.length == 0) {
            dispatch({ type: "UPDATE_BULK_SELECT", payload: false });
        }
    };

    const handleMove = (e) => {
        dispatch({
            type: "UPDATE_SELECTED_QUIZZES_DATA",
            payload: [e.target.getAttribute("data-id")],
        });
        dispatch({
            type: "UPDATE_STATUS_DATA",
            payload: { ...status, isMove: true },
        });
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                open_directory: !modal.open_directory,
            },
        });
    };

    const handleDuplicate = (e) => {
        dispatch({
            type: "UPDATE_SELECTED_QUIZZES_DATA",
            payload: e.target.getAttribute("data-id"),
        });
        dispatch({
            type: "UPDATE_STATUS_DATA",
            payload: { ...status, isDuplicate: true },
        });
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                open_directory: !modal.open_directory,
            },
        });
    };

    const handleRename = (e) => {
        dispatch({
            type: "UPDATE_RENAME_DATA",
            payload: {
                ...rename,
                type: "quiz",
                id: e.target.getAttribute("data-id"),
                name: e.target.getAttribute("data-name"),
            },
        });

        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                rename: !modal.rename,
            },
        });
    };

    const handleDeletion = (e) => {
        dispatch({
            type: "UPDATE_SELECTED_QUIZZES_DATA",
            payload: e.target.getAttribute("data-id"),
        });
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                deletion: !modal.deletion,
            },
        });
    };

    const handleRemoveFavorite = async (e) => {
        let response = await axios.delete("/favorites" + e.target.id);
        toast.success(response.data.message);
        return dispatch({
            type: "RELOAD_QUIZZES_DATA",
        });
    };

    const fetchMoreQuiz = useCallback(async () => {
        if (quizzesData.length == 0) return;
        let url = isFavoritesQuiz ? "/favorites" : `/user/library/quizzes`;
        let payload = {
            offset: quizQuery.offset,
            orderBy: quizQuery.orderBy,
            limit: quizQuery.limit,
            folderId: folderId ? folderId : false,
            isRecentQuiz: isRecentQuiz,
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
                offset: quizQuery.offset + 5,
            },
        });
        return dispatch({
            type: "UPDATE_QUIZZES_DATA",
            payload: [...quizzesData, ...response.data],
        });
    }, [quizzesData, quizQuery.search]);

    useEffect(() => {
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
            {quizzesData.map(
                (
                    {
                        id,
                        quiz_title,
                        total_plays,
                        thumbnail,
                        name,
                        quiz_detail_id,
                        user_id,
                        profile_pic,
                    },
                    index
                ) => (
                    <div
                        key={index}
                        className="flex h-28 sm:h-32 md:h-32 border border-slate-300 shadow-lg rounded bg-white mb-4 "
                    >
                        <div className="flex items-center border">
                            <input
                                className={`m-2 ${name ? "hidden" : ""}`}
                                type="checkbox"
                                checked={
                                    selectedQuizzes.includes(id) &&
                                    Array.isArray(selectedQuizzes)
                                }
                                onChange={() => handleCheck(id)}
                            />
                            <img
                                className="hidden sm:block md:block h-full"
                                src={thumbnail}
                            />
                        </div>

                        <div className="flex flex-col justify-between flex-1">
                            <div className="flex items-center justify-between">
                                <Link
                                    href={
                                        quiz_detail_id
                                            ? "/detail/" + quiz_detail_id
                                            : "/detail/" + id
                                    }
                                    className="py-2 px-3 md:text-xl text-md hover:text-blue-900"
                                >
                                    <b>{quiz_title}</b>
                                </Link>
                                {!quiz_detail_id ? (
                                    <LibraryDropdown
                                        id={id}
                                        name={quiz_title}
                                        moveClick={handleMove}
                                        renameClick={handleRename}
                                        duplicateClick={handleDuplicate}
                                        deleteClick={handleDeletion}
                                    />
                                ) : (
                                    <p className="mx-2">{total_plays} Plays</p>
                                )}
                            </div>

                            <div className="flex justify-between px-2 py-1">
                                <div className="flex items-center">
                                    <ProfilePicture
                                        profilePic={
                                            !quiz_detail_id
                                                ? user.profile_pic
                                                : profile_pic
                                        }
                                        className="h-8"
                                    />
                                    <div>
                                        <Link
                                            href={"/user/" + user_id}
                                            className="no-underline hover:underline text-sm"
                                        >
                                            {name ?? user.name}
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-center px-2">
                                    {!quiz_detail_id ? (
                                        <>
                                            <p className="hidden sm:block">
                                                {total_plays} Plays
                                            </p>
                                            <Link
                                                href={"/edit/" + id}
                                                className="mx-2 btn-secondary px-3 py-1"
                                            >
                                                Edit
                                            </Link>
                                        </>
                                    ) : (
                                        <div
                                            id={quiz_detail_id}
                                            onClick={handleRemoveFavorite}
                                            className="cursor-pointer flex items-center mx-2 gap-x-2 btn-secondary px-3 py-1"
                                        >
                                            <FavoriteIcon
                                                starred={true}
                                                className={
                                                    "pointer-events-none"
                                                }
                                            />
                                            <p className="sm:block hidden pointer-events-none">
                                                Remove From Favorite
                                            </p>
                                        </div>
                                    )}
                                    <a
                                        href={
                                            quiz_detail_id
                                                ? "/play/quizid=" +
                                                  quiz_detail_id
                                                : "/play/quizid=" + id
                                        }
                                        className="btn-primary px-3 py-1"
                                    >
                                        Start
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}

            <div
                className={`flex justify-center ${
                    quizQuery.stopFetch ? "hidden" : ""
                }`}
                ref={loading}
            >
                <Spinner />
            </div>
        </>
    );
};
