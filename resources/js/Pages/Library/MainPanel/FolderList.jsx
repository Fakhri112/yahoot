import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";
import { LibraryDropdown } from "@/Components/dropdown/LibraryDropdown";
import { Folder } from "@/Components/svg/FileExplorer";
import { Link } from "@inertiajs/react";
import React from "react";

export const FolderList = () => {
    const { foldersData, modal, rename, status } = useLibraryState();
    const dispatch = useLibraryDispatch();

    const handleMove = (e) => {
        dispatch({
            type: "UPDATE_SELECTED_FOLDER",
            payload: e.target.getAttribute("data-id"),
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
            type: "UPDATE_SELECTED_FOLDER",
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
                type: "folder",
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
            type: "UPDATE_SELECTED_FOLDER",
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
            <div className="grid grid-cols-2 items-center md:grid-cols-4 drop-shadow-md py-2 gap-2">
                {foldersData.length !== 0 ? (
                    foldersData.map((data, index) => (
                        <div key={index}>
                            <div className="border flex bg-white items-center justify-between p-2 gap-x-3 hover:bg-slate-300 cursor-pointer">
                                <Link
                                    href={"/user/library/" + data.id}
                                    className="flex items-center gap-x-2  w-full"
                                >
                                    <Folder className="fill-slate-500 min-w-8 " />
                                    {data.folder_name}
                                </Link>
                                <LibraryDropdown
                                    id={data.id}
                                    name={data.folder_name}
                                    moveClick={handleMove}
                                    renameClick={handleRename}
                                    duplicateClick={handleDuplicate}
                                    deleteClick={handleDeletion}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
