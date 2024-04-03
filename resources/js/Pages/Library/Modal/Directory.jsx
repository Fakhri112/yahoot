import ReactModal from "react-modal";
import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";
import { useFolderTreeState } from "@/Components/context/FolderTreeContext";
import RecursiveFileExplorer from "@/Components/RecursiveFileExplorer";
import { useEffect, useState } from "react";
import { Spinner } from "@/Components/svg/Spinner";
import toast from "react-hot-toast";
import axios from "axios";

const Directory = () => {
    const {
        modal,
        selectedQuizzes,
        selectedFolder,
        folderId,
        status,
        quizQuery,
    } = useLibraryState();
    const dispatch = useLibraryDispatch();
    const [fullDirectory, SetFullDirectory] = useState([]);
    const { folderConfig } = useFolderTreeState();
    const [submitting, SetSubmitting] = useState(false);

    const handleClose = () => {
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

        let sendData = axios;

        status.isMove
            ? (sendData = sendData.patch("/user/library/move", payload))
            : status.isDuplicate
            ? (sendData = sendData.post("/user/library/duplicate", payload))
            : null;

        sendData
            .then(function (response) {
                SetSubmitting(false);
                handleClose();
                toast.success("Success");
                if (selectedQuizzes.length != 0) {
                    dispatch({
                        type: "RELOAD_QUIZZES_DATA",
                    });
                    return dispatch({
                        type: "UPDATE_QUIZ_QUERY_DATA",
                        payload: {
                            ...quizQuery,
                            offset: 5,
                            stopFetch: false,
                        },
                    });
                }
                if (selectedFolder != "") {
                    if (folderId) {
                        return dispatch({
                            type: "RELOAD_FOLDERS_DATA",
                        });
                    }
                    return dispatch({
                        type: "RELOAD_MYDRIVE_DATA",
                    });
                }
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
            onRequestClose={handleClose}
            className="relative rounded md:w-[50%] w-[90%] min-w-[320px] h-[92%] p-3 bg-white flex flex-col"
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
            <div className="h-full overflow-y-auto border border-slate-400 rounded p-1">
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
            <div className="flex gap-x-2 py-2 justify-between">
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
                <button onClick={handleClose} className="btn-danger px-2 py-2">
                    Close
                </button>
            </div>
        </ReactModal>
    );
};

export default Directory;
