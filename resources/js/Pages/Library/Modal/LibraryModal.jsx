import React from "react";
import Directory from "./Directory";
import { NewFolder } from "./NewFolder";
import { Rename } from "./Rename";
import { FolderTreeProvider } from "@/Components/context/FolderTree";
import DeletionConfirm from "./DeletionConfirm";

const LibraryModal = () => {
    return (
        <>
            <FolderTreeProvider>
                <Directory />
            </FolderTreeProvider>
            <NewFolder />
            <Rename />
            <DeletionConfirm />
        </>
    );
};

export default LibraryModal;
