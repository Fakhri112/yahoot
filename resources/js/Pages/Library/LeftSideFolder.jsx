import { Drive, Folder } from "@/Components/svg/FileExplorer";
import React from "react";

export const LeftSideFolder = () => {
    return (
        <div
            className="hidden md:block md:col-span-2 md:text-slate-900 
    md:border-r md:border-slate-300 md:h-full md:p-2 md:pt-10 md:px-3 "
        >
            <ul>
                <li>
                    <a className="flex p-2 rounded cursor-pointer mb-2 hover:bg-slate-200">
                        <Drive className={"fill-slate-400 h-7"} />
                        <p>My Drive</p>
                    </a>
                    <a className="flex p-2 gap-x-2 rounded cursor-pointer hover:bg-slate-200">
                        <Folder className="fill-slate-400 h-6 ms-1" />
                        <p>Ruby</p>
                    </a>
                </li>
            </ul>
        </div>
    );
};
