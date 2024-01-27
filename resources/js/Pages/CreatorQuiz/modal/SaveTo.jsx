import ReactModal from "react-modal";
import RecursiveFileExplorer from "../../../Components/RecursiveFileExplorer";
import { useFolderTreeContext } from "../../../Components/context/FolderTree";
import {
    useCreatorQuizDispatch,
    useCreatorQuizState,
} from "@/Components/context/CreatorQuizContext";
import { useEffect, useState } from "react";
import { Spinner } from "@/Components/svg/Spinner";
import axios from "axios";

export const SaveTo = () => {
    const { modal, saveDirectory } = useCreatorQuizState();
    const dispatch = useCreatorQuizDispatch();
    const { folderConfig, setFolderConfig } = useFolderTreeContext();
    const [fullDirectory, SetFullDirectory] = useState([]);

    const handleToggleDirectory = () => {
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                open_directory: !modal.open_directory,
            },
        });
    };

    const handleSelectFolder = () => {
        if (folderConfig.folderOpenName == "") return;
        dispatch({
            type: "UPDATE_SAVE_DIRECTORY",
            payload: {
                ...saveDirectory,
                path: folderConfig.folderDirectory,
                path_id: folderConfig.folderId,
            },
        });
        handleToggleDirectory();
        setFolderConfig({
            ...folderConfig,
            folderDirectory: "",
            folderOpenName: "",
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
            <p className="text-2xl font-semibold">Save To</p>
            <div className="h-full  overflow-y-auto border border-slate-400 rounded p-1">
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
