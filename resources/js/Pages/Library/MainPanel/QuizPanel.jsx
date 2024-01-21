import ProfilePicture from "@/Components/svg/ProfilePicture";
import { Link } from "@inertiajs/react";
import React from "react";
import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";
import { LibraryDropdown } from "@/Components/dropdown/LibraryDropdown";

export const QuizPanel = () => {
    const {
        user,
        selectedQuizzes,
        quizzesData,
        modal,
        rename,
        status,
        deletion,
    } = useLibraryState();
    const dispatch = useLibraryDispatch();

    const handleCheck = (quiz_id) => {
        let selectedQuizCopy = JSON.parse(JSON.stringify(selectedQuizzes));
        if (selectedQuizCopy.includes(quiz_id)) {
            selectedQuizCopy.splice(selectedQuizCopy.indexOf(quiz_id), 1);
        } else {
            selectedQuizCopy.push(quiz_id);
            dispatch({ type: "TOGGLE_BULK_SELECT", payload: true });
        }
        return dispatch({
            type: "UPDATE_SELECTED_QUIZZES_DATA",
            payload: selectedQuizCopy,
        });
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

    return (
        <>
            {quizzesData.map(({ id, quiz_name, thumbnail }, index) => (
                <div
                    key={index}
                    className="flex h-28 sm:h-32 md:h-32 border border-slate-300 shadow-lg rounded bg-white mb-4 "
                >
                    <div className="flex items-center border">
                        <input
                            className="m-2"
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
                                href={"/detail/" + id}
                                className="py-2 px-3 text-xl hover:text-blue-900"
                            >
                                <b>{quiz_name}</b>
                            </Link>
                            <LibraryDropdown
                                id={id}
                                name={quiz_name}
                                moveClick={handleMove}
                                renameClick={handleRename}
                                duplicateClick={handleDuplicate}
                                deleteClick={handleDeletion}
                            />
                        </div>

                        <div className="flex justify-between px-2 py-1">
                            <div className="flex items-center">
                                <ProfilePicture className="h-8" />
                                <div>
                                    <p className="text-sm">{user.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center px-2">
                                <p>0 Plays</p>
                                <button className="mx-2 font-semibold rounded bg-slate-300 px-3 py-1">
                                    Edit
                                </button>
                                <button className="font-semibold text-slate-200 rounded bg-blue-700 px-3 py-1">
                                    Start
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
