import { Folder } from "@/Components/svg/FileExplorer";
import React from "react";

export const FolderList = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 drop-shadow-md py-2 gap-2">
            <div className="border flex bg-white items-center p-2 gap-x-3">
                <Folder className="fill-slate-500" />
                Ruby
            </div>
            <div className="border flex bg-white items-center p-2 gap-x-3">
                <Folder className="fill-slate-500" />
                Ruby
            </div>
            <div className="border flex bg-white items-center p-2 gap-x-3">
                <Folder className="fill-slate-500" />
                Ruby
            </div>
            <div className="border flex bg-white items-center p-2 gap-x-3">
                <Folder className="fill-slate-500" />
                Ruby
            </div>
        </div>
    );
};
