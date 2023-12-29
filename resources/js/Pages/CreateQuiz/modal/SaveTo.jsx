import ReactModal from "react-modal";
import RecursiveFileExplorer from "../../../Components/RecursiveFileExplorer";
import { useFolderTreeContext } from "../../../Components/context/FolderTree";
import { groupNewFolder } from "@/Lib/groupNewFolder";
import { v4 as uuid4 } from "uuid";
import {
    useCreateQuizDispatch,
    useCreateQuizState,
} from "@/Components/context/CreateQuizContext";

export const SaveTo = ({ setfolderData, setDirectory, setNewFolderList }) => {
    const { modal, folderData } = useCreateQuizState();
    const dispatch = useCreateQuizDispatch();
    const { folderConfig, setFolderConfig } = useFolderTreeContext();

    // const handleAddFolder = (parentNode, newFolderName) => {
    //     if (newFolderName == "") newFolderName = "New Folder";
    //     let numberOfSameName = 1;

    //     for (let item of parentNode.children) {
    //         if (item.name == newFolderName) {
    //             numberOfSameName++;
    //         }
    //     }

    //     if (numberOfSameName > 1)
    //         newFolderName = newFolderName + ` (${numberOfSameName})`;

    //     const newFolder = {
    //         id: uuid4(),
    //         name: newFolderName,
    //         type: "folder",
    //         parent_id: parentNode.id,
    //         children: [],
    //     };

    //     if (parentNode) {
    //         // Add folder to the parent's children
    //         parentNode.children.push(newFolder);
    //     } else {
    //         // Add folder to the root
    //         setfolderData((prevData) => ({
    //             ...prevData,
    //             children: [...prevData.children, newFolder],
    //         }));
    //     }
    // };

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
            payload: folderConfig.folderDirectory,
        });
        handleToggleDirectory();
        setFolderConfig({
            ...folderConfig,
            folderDirectory: "",
            folderOpenName: "",
        });
        // setNewFolderList(groupNewFolder(folderData.children));
    };

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
            <div className="h-full border border-slate-400 rounded p-1">
                <RecursiveFileExplorer
                    node={folderData}
                    directory={folderData.name}
                    // onAddFolder={handleAddFolder}
                />
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
                {/* <button
                    className="btn-secondary text- px-3 py-2"
                    onClick={() =>
                        setFolderConfig({
                            ...folderConfig,
                            newFolderParent: folderConfig.folderOpenName,
                        })
                    }
                >
                    New Folder
                </button> */}
            </div>
        </ReactModal>
    );
};
