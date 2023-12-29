import { useState, useEffect } from "react";
import { useFolderTreeContext } from "./context/FolderTree";
import { Folder, File } from "./svg/FileExplorer";

const RecursiveFileExplorer = ({ node, onAddFolder, directory }) => {
    const { folderConfig, setFolderConfig } = useFolderTreeContext();
    const [isOpen, setIsOpen] = useState(false);
    const [insertNewFolder, SetinsertNewFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    useEffect(() => {
        folderConfig.newFolderParent == node.name
            ? (SetinsertNewFolder(true), setIsOpen(true))
            : null;
    }, [folderConfig]);

    const handleToggle = () => {
        if (node.type == "file") return;
        setIsOpen(!isOpen);
        setFolderConfig({
            ...folderConfig,
            folderOpenName: node.name,
            folderDirectory: directory,
        });
    };
    // const handleRenameChange = (e) => {
    //     setNewFolderName(e.target.value);
    // };

    // const handleRenameSubmit = () => {
    //     onAddFolder(node, newFolderName);
    //     setFolderConfig({ ...folderConfig, newFolderParent: null });
    //     SetinsertNewFolder(false);
    // };
    // const handleRenameCancel = () => {
    //     setFolderConfig({ ...folderConfig, newFolderParent: null });
    //     SetinsertNewFolder(false);
    //     setNewFolderName("");
    // };

    return (
        <ul>
            <div
                onClick={handleToggle}
                className={`${
                    node.name == folderConfig.folderOpenName &&
                    node.type !== "file"
                        ? "bg-blue-400 rounded p-1 cursor-pointer"
                        : "hover:bg-slate-300 rounded p-1 cursor-pointer "
                } flex gap-x-2`}
            >
                {node.type === "folder" ? (
                    <Folder className={"h-6 fill-slate-800"} />
                ) : (
                    <File className={"h-6 fill-slate-800"} />
                )}
                <span>
                    {node.name} - {node.type === "folder" ? "Folder" : "File"}
                </span>
            </div>

            {/* {node.type === "folder" && (
                <>
                    {insertNewFolder && isOpen ? (
                        <div>
                            <input
                                type="text"
                                value={newFolderName}
                                onChange={handleRenameChange}
                                placeholder="Enter New Folder Name"
                            />
                            <div className="mt-1">
                                <button
                                    className="btn-success px-1 rounded"
                                    onClick={handleRenameSubmit}
                                >
                                    Submit
                                </button>
                                <button
                                    className="btn-danger px-1 rounded ml-1"
                                    onClick={handleRenameCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        isOpen &&
                        node.children.length === 0 && (
                            <p>This folder is empty</p>
                        )
                    )}
                </>
            )} */}
            <li className={isOpen ? "ml-4" : "ml-0"}>
                {isOpen && node.children && (
                    <>
                        {node.children.map((child, index) => (
                            <RecursiveFileExplorer
                                key={index}
                                node={child}
                                directory={directory + "/" + child.name}
                                // onAddFolder={onAddFolder}
                            />
                        ))}
                    </>
                )}
            </li>
        </ul>
    );
};

export default RecursiveFileExplorer;
