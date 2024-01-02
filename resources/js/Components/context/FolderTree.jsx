import React, { createContext, useState, useContext } from "react";

const FolderContext = createContext();

const useFolderTreeContext = () => {
    return useContext(FolderContext);
};

const FolderTreeProvider = ({ children }) => {
    const [folderConfig, updateFolderConfig] = useState({
        folderOpenName: "",
        folderDirectory: "",
        newFolderParent: null,
        folderId: 0,
    });

    const setFolderConfig = (value) => {
        updateFolderConfig(value);
    };

    return (
        <FolderContext.Provider value={{ folderConfig, setFolderConfig }}>
            {children}
        </FolderContext.Provider>
    );
};

export { useFolderTreeContext, FolderTreeProvider };
