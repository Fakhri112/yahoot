import React, { useState } from "react";

const data = {
    name: "Root",
    type: "folder",
    children: [
        {
            name: "Folder 1",
            type: "folder",
            children: [
                {
                    name: "File 1",
                    type: "file",
                },
                {
                    name: "File 2",
                    type: "file",
                },
            ],
        },
        {
            name: "Folder 2",
            type: "folder",
            children: [],
        },
    ],
};
const RecursiveComponent = ({ node, onAddFolder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleAddFolder = () => {
        setIsOpen(true);
        setIsRenaming(true);
    };

    const handleRenameChange = (e) => {
        setNewFolderName(e.target.value);
    };

    const handleRenameSubmit = () => {
        onAddFolder(node, newFolderName);
        setIsRenaming(false);
    };

    const handleRenameCancel = () => {
        setIsRenaming(false);
    };

    return (
        <ul>
            <li>
                <span onClick={handleToggle}>
                    {node.name} - {node.type === "folder" ? "Folder" : "File"}
                </span>
                {node.type === "folder" && (
                    <>
                        <button onClick={handleAddFolder}>Add Folder</button>
                        {isRenaming ? (
                            <div>
                                <input
                                    type="text"
                                    value={newFolderName}
                                    onChange={handleRenameChange}
                                />
                                <button onClick={handleRenameSubmit}>
                                    Submit
                                </button>
                                <button onClick={handleRenameCancel}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            isOpen &&
                            node.children.length === 0 && (
                                <p>This folder is empty</p>
                            )
                        )}
                    </>
                )}
                {isOpen && node.children && (
                    <ul>
                        {node.children.map((child, index) => (
                            <RecursiveComponent
                                key={index}
                                node={child}
                                onAddFolder={onAddFolder}
                            />
                        ))}
                    </ul>
                )}
            </li>
        </ul>
    );
};

const FileExplorer = () => {
    const [fileData, setFileData] = useState(data);

    const handleAddFolder = (parentNode, newFolderName) => {
        const newFolder = {
            name: newFolderName || `New Folder ${fileData.children.length + 1}`,
            type: "folder",
            children: [],
        };

        if (parentNode) {
            // Add folder to the parent's children
            parentNode.children.push(newFolder);
        } else {
            // Add folder to the root
            setFileData((prevData) => ({
                ...prevData,
                children: [...prevData.children, newFolder],
            }));
        }
    };

    return (
        <div>
            <h1>File Explorer</h1>
            <RecursiveComponent node={fileData} onAddFolder={handleAddFolder} />
        </div>
    );
};

export default FileExplorer;
