import { useState, useEffect } from "react";
import {
    useFolderTreeState,
    useFolderTreeDispatch,
} from "./context/FolderTreeContext";
import { Folder, File } from "./svg/FileExplorer";

const RecursiveFileExplorer = ({ node, onAddFolder, directory }) => {
    const { folderConfig } = useFolderTreeState();
    const SetFolderConfig = useFolderTreeDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [insertNewFolder, SetinsertNewFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    useEffect(() => {
        folderConfig.newFolderParent == node.name
            ? (SetinsertNewFolder(true), setIsOpen(true))
            : null;
    }, [folderConfig]);

    const handleToggle = () => {
        if (node.type == "quiz") return;
        setIsOpen(!isOpen);
        SetFolderConfig({
            ...folderConfig,
            folderOpenName: node.name,
            folderId: node.id,
            folderDirectory: directory,
        });
    };

    return (
        <ul>
            <div
                onClick={handleToggle}
                className={`${
                    node.id == folderConfig.folderId && node.type !== "quiz"
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
                    {node.name} - {node.type === "folder" ? "Folder" : "Quiz"}
                </span>
            </div>
            <li className={isOpen ? "ml-4" : "ml-0"}>
                {isOpen && node.children && (
                    <>
                        {node.children.map((child, index) => (
                            <RecursiveFileExplorer
                                key={index}
                                node={child}
                                directory={directory + "/" + child.name}
                            />
                        ))}
                    </>
                )}
            </li>
        </ul>
    );
};

export default RecursiveFileExplorer;
