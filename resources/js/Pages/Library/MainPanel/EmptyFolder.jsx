import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";
import { EmptyFolderIcon } from "@/Components/svg/FileExplorer";
import React from "react";

export const EmptyFolder = ({ children }) => {
    const { foldersData, quizzesData } = useLibraryState();
    return (
        <>
            {foldersData.length == 0 && quizzesData.length == 0 ? (
                <div className=" h-full grid place-items-center">
                    <div className="flex flex-col">
                        <EmptyFolderIcon className={"h-10 fill-slate-400"} />
                        <p className="font-semibold text-lg text-slate-400">
                            This Folder is Empty :(
                        </p>
                    </div>
                </div>
            ) : (
                <div className="overflow-y-auto h-full max-h-[70vh] pb-16 md:pb-0">
                    {children}
                </div>
            )}
        </>
    );
};
