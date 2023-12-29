import React, { createContext, useState, useContext } from "react";

const FolderContext = createContext();

const useFolderTreeContext = () => {
    return useContext(FolderContext);
};

const FolderTreeProvider = ({ children }) => {
    // Define the state or any data you want to provide
    const [folderConfig, updateFolderConfig] = useState({
        folderOpenName: "",
        folderDirectory: "",
        newFolderParent: null,
    });

    const setFolderConfig = (value) => {
        updateFolderConfig(value);
    };

    // console.log(folderConfig);

    // Use the Provider to make the context value available to its children
    return (
        <FolderContext.Provider value={{ folderConfig, setFolderConfig }}>
            {children}
        </FolderContext.Provider>
    );
};

export { useFolderTreeContext, FolderTreeProvider };
