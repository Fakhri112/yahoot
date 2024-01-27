import { useLibraryState } from "@/Components/context/LibraryContext";
import { Drive, Folder } from "@/Components/svg/FileExplorer";
import { Link } from "@inertiajs/react";
import React from "react";

export const LeftSideFolder = () => {
    const { myDriveFolders } = useLibraryState();

    return (
        <div
            className="hidden lg:block md:col-span-2 md:text-slate-900 
    md:border-r md:border-slate-300 md:h-full md:p-2 md:pt-10 md:px-3 "
        >
            <Link
                href="/user/library/recent"
                className="flex px-2 items-center gap-x-1 rounded cursor-pointer hover:bg-slate-200"
            >
                <p className="text-3xl text-slate-500">&#10227;</p>
                <p>Recent</p>
            </Link>
            <Link
                href="/user/library/favorite"
                className="flex px-2 items-center gap-x-1 rounded cursor-pointer hover:bg-slate-200"
            >
                <p className="text-3xl text-slate-500">&#9733;</p>
                <p>Favorite</p>
            </Link>
            <hr className=" border-slate-400 my-2 " />
            <Link
                href="/user/library"
                className="flex p-2 gap-x-1 rounded cursor-pointer hover:bg-slate-200"
            >
                <Drive className={"fill-slate-400 h-7"} />
                <p>My Drive</p>
            </Link>

            {myDriveFolders.length !== 0 ? (
                myDriveFolders.map((data, index) => (
                    <div key={index}>
                        <Link
                            href={`/user/library/${data.id}`}
                            className="flex p-2 gap-x-2 rounded cursor-pointer hover:bg-slate-200"
                        >
                            <Folder className="fill-slate-400 h-6 ms-1" />
                            <p>{data.folder_name}</p>
                        </Link>
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};
