import {
    useLibraryState,
    useLibraryDispatch,
} from "@/Components/context/LibraryContext";
import { NewFolder } from "@/Components/svg/FileExplorer";
import { Link } from "@inertiajs/react";
import { useWindowSize } from "@uidotdev/usehooks";
import React from "react";

export const Navigation = () => {
    const { modal, path, quizQuery, folderId } = useLibraryState();
    const dispatch = useLibraryDispatch();
    const { width, height } = useWindowSize();

    const handleNewFolder = () => {
        dispatch({
            type: "UPDATE_MODAL",
            payload: { ...modal, new_folder: !modal.new_folder },
        });
    };

    const handleSortBy = (e) => {
        let quizPayload = {
            ...quizQuery,
            offset: 5,
            stopFetch: false,
            sortName: e.target.value,
            orderBy: "",
        };

        switch (e.target.value) {
            case "oldest":
                (quizPayload.orderBy = ["created_at", "asc"]),
                    dispatch({
                        type: "UPDATE_QUIZ_QUERY_DATA",
                        payload: quizPayload,
                    });
                dispatch({
                    type: "UPDATE_FOLDER_ORDER_BY",
                    payload: ["created_at", "asc"],
                });

                break;
            case "latest":
                (quizPayload.orderBy = ["created_at", "desc"]),
                    dispatch({
                        type: "UPDATE_QUIZ_QUERY_DATA",
                        payload: quizPayload,
                    });

                dispatch({
                    type: "UPDATE_FOLDER_ORDER_BY",
                    payload: ["created_at", "desc"],
                });

                break;
            case "name":
                (quizPayload.orderBy = ["quiz_title", "asc"]),
                    dispatch({
                        type: "UPDATE_QUIZ_QUERY_DATA",
                        payload: quizPayload,
                    });
                dispatch({
                    type: "UPDATE_FOLDER_ORDER_BY",
                    payload: ["folder_name", "asc"],
                });
                break;

            default:
                break;
        }

        dispatch({
            type: "UPDATE_FETCH_QUIZZES",
            payload: true,
        });

        if (!folderId) {
            dispatch({
                type: "RELOAD_MYDRIVE_DATA",
                payload: true,
            });
        } else {
            dispatch({
                type: "UPDATE_FETCH_FOLDERS",
                payload: true,
            });
        }

        dispatch({ type: "RELOAD_FOLDERS_DATA" });
        dispatch({ type: "RELOAD_QUIZZES_DATA" });
    };

    return (
        <div className="flex justify-between items-center mb-2 mt-2">
            <div className="grow  me-5 md:hidden font-semibold">
                {path.length > 1 ? (
                    <Link href={`/user/library/${path[path.length - 2].id}`}>
                        {<>&lsaquo;</>} Back{" "}
                    </Link>
                ) : (
                    "My Drive"
                )}
            </div>
            <div className="gap-x-2  grow md:flex hidden overflow-auto  whitespace-nowrap me-5">
                {path.length > 0 ? (
                    path.map((data, index) => (
                        <Link
                            key={index}
                            className={` underline-offset-auto ${
                                path[index + 1]
                                    ? "hover:underline font-normal after:content-['\u203A']"
                                    : "font-semibold pointer-events-none"
                            }`}
                            href={`${
                                data.folder_name == "My Drive"
                                    ? "/user/library"
                                    : `/user/library/${data.id}`
                            } `}
                        >
                            {data.folder_name}
                            {path[index + 1] ? <>&rsaquo;</> : ""}
                        </Link>
                    ))
                ) : (
                    <p className="font-semibold">My Drive</p>
                )}
            </div>
            <div className="flex gap-x-1 h-10">
                <select
                    value={quizQuery.sortName}
                    onChange={handleSortBy}
                    className="md:text-md text-sm cursor-pointer border-slate-300 rounded-md font-semibold "
                >
                    <option value="name" className="md:text-md text-sm ">
                        Name
                    </option>
                    <option value="oldest" className="md:text-md text-sm ">
                        Date Oldest
                    </option>
                    <option value="latest" className="md:text-md text-sm ">
                        Date Latest
                    </option>
                </select>
                <button
                    onClick={handleNewFolder}
                    className="flex items-center md:w-36 gap-x-2 hover:bg-slate-300 border shadow-lg bg-white rounded p-2"
                >
                    <NewFolder className={"h-7"} />
                    <p className="hidden sm:block">New Folder</p>
                </button>
            </div>
        </div>
    );
};
