import {
    useLibraryState,
    useLibraryDispatch,
} from "@/Components/context/LibraryContext";
import { NewFolder } from "@/Components/svg/FileExplorer";
import { Link } from "@inertiajs/react";
import React from "react";

export const Navigation = () => {
    const { modal, path } = useLibraryState();
    const dispatch = useLibraryDispatch();

    const handleNewFolder = () => {
        dispatch({
            type: "UPDATE_MODAL",
            payload: { ...modal, new_folder: !modal.new_folder },
        });
    };

    return (
        <div className="flex justify-between items-center mb-2">
            <div className="flex gap-x-2 ">
                {path.length > 0 ? (
                    path.map((data, index) => (
                        <Link
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
            <div className="flex gap-x-1">
                <button
                    onClick={handleNewFolder}
                    className="flex items-center gap-x-2 hover:bg-slate-300 border shadow-lg bg-white rounded p-2"
                >
                    <NewFolder />
                    <p>New Folder</p>
                </button>
            </div>
        </div>
    );
};
