import ReactModal from "react-modal";
import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";
import { useFolderTreeContext } from "@/Components/context/FolderTree";
import RecursiveFileExplorer from "@/Components/RecursiveFileExplorer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/Components/svg/Spinner";

const Directory = () => {
    const { modal, selectedQuizzes, user, selectedFolder, folderId, status } =
        useLibraryState();
    const dispatch = useLibraryDispatch();
    const [fullDirectory, SetFullDirectory] = useState([]);
    const { folderConfig } = useFolderTreeContext();
    const [submitting, SetSubmitting] = useState(false);

    const handleToggleDirectory = () => {
        handleResetData();
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                open_directory: !modal.open_directory,
            },
        });
    };

    const handleResetData = () => {
        dispatch({
            type: "UPDATE_SELECTED_QUIZZES_DATA",
            payload: [],
        });
        dispatch({
            type: "TOGGLE_BULK_SELECT",
            payload: false,
        });
        dispatch({
            type: "UPDATE_STATUS_DATA",
            payload: {
                ...status,
                isMove: false,
                isDuplicate: false,
            },
        });
        return dispatch({
            type: "UPDATE_SELECTED_FOLDER",
            payload: "",
        });
    };

    const handleSelectFolder = () => {
        SetSubmitting(true);
        const payload = {
            target_folder: folderConfig.folderId,
        };

        if (selectedQuizzes.length != 0)
            payload.selectedQuizzes = selectedQuizzes;
        if (selectedFolder != "") payload.selectedFolder = selectedFolder;

        let url = status.isMove
            ? "/user/library/move"
            : status.isDuplicate
            ? "/user/library/duplicate"
            : null;

        axios
            .post(url, payload, {
                headers: {
                    "X-Xsrf-Token": user.xsrf,
                },
            })
            .then(function (response) {
                SetSubmitting(false);

                if (selectedQuizzes.length != 0) {
                    dispatch({
                        type: "RELOAD_QUIZZES_DATA",
                    });
                }
                if (selectedFolder != "") {
                    if (folderId) {
                        dispatch({
                            type: "RELOAD_FOLDERS_DATA",
                        });
                    } else
                        dispatch({
                            type: "RELOAD_MYDRIVE_DATA",
                        });
                }

                handleToggleDirectory();
            })
            .catch(function (error) {
                SetSubmitting(false);
                console.log(error);
            });
    };

    const getAllFolder = async () => {
        const fetch = await axios.get("/user/library/get-full-directory");
        const response = fetch.data;
        SetFullDirectory(response);
    };

    useEffect(() => {
        if (modal.open_directory && fullDirectory.length == 0) getAllFolder();
    }, [modal.open_directory]);

    return (
        <ReactModal
            isOpen={modal.open_directory}
            shouldCloseOnOverlayClick={true}
            appElement={document.getElementById("app")}
            onRequestClose={handleToggleDirectory}
            className="relative rounded w-[70%] h-[86%] p-3 bg-white flex flex-col"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            <div className="flex justify-between">
                <p className="text-2xl font-semibold">
                    {status.isMove
                        ? "Move to"
                        : status.isDuplicate
                        ? "Duplicate to"
                        : null}
                </p>
                {submitting ? <Spinner classname={"w-5 "} /> : <></>}
            </div>
            <div className="h-full border border-slate-400 rounded p-1">
                {fullDirectory.length != 0 ? (
                    <RecursiveFileExplorer
                        node={fullDirectory}
                        directory={fullDirectory.name}
                    />
                ) : (
                    <div className="h-full grid place-items-center">
                        <Spinner />
                    </div>
                )}
            </div>
            <div className="flex gap-x-2 py-2">
                <button
                    onClick={handleSelectFolder}
                    className={`${
                        folderConfig.folderOpenName == ""
                            ? "btn-disable"
                            : "btn-primary"
                    } px-3 py-2`}
                >
                    Select Folder
                </button>
            </div>
        </ReactModal>
    );
};

export default Directory;
