import React, { createContext, useState, useContext } from "react";

const FolderState = createContext();

const useFolderTreeState = () => {
    return useContext(FolderState);
};

const FolderDispatch = createContext();

const useFolderTreeDispatch = () => {
    return useContext(FolderDispatch);
};

const FolderTreeProvider = ({ children }) => {
    const [folderConfig, updateFolderConfig] = useState({
        folderOpenName: "",
        folderDirectory: "",
        folderId: 0,
    });

    const SetFolderConfig = (value) => {
        updateFolderConfig(value);
    };

    return (
        <FolderState.Provider value={{ folderConfig, SetFolderConfig }}>
            <FolderDispatch.Provider value={SetFolderConfig}>
                {children}
            </FolderDispatch.Provider>
        </FolderState.Provider>
    );
};

export { useFolderTreeState, useFolderTreeDispatch, FolderTreeProvider };
