import { NewFolder } from "@/Components/svg/FileExplorer";
import React from "react";

export const Navigation = () => {
    return (
        <div className="flex justify-between items-center">
            <p className="font-semibold">My Folder {">"}</p>
            <div className="flex gap-x-1">
                <button className="flex items-center gap-x-2 hover:bg-slate-300 border shadow-lg bg-white rounded p-2">
                    <NewFolder />
                    <p>New Folder</p>
                </button>
                <button className="flex items-center gap-x-2 hover:bg-slate-300 border shadow-lg bg-white rounded p-2">
                    <div className="flex gap-x-2 items-center">
                        <p className="text-2xl">&#9733;</p> Favorite
                    </div>
                </button>
            </div>
        </div>
    );
};
