import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { Home, ReportGraph, SettingGear } from "./svg/ProfileSidebarIcon";
import { Folder } from "./svg/FileExplorer";

const ProfileSidebar = () => {
    const user = usePage().props.auth.user;
    return (
        <div
            className="shadow-top bg-white text-slate-900 z-50
            flex justify-around  w-full h-auto pb-0 p-2 bottom-0 
            fixed md:w-24 md:h-full md:flex-col md:justify-start md:bottom-[unset] md:shadow-end md:z-0
            "
        >
            <Link
                href={`/user/` + user.id}
                className="z-20 flex flex-col items-center mb-4"
            >
                <Home />
                <p className="text-sm">Home</p>
            </Link>
            <Link
                href="/user/library"
                className="flex flex-col items-center mb-4"
            >
                <Folder className={"fill-slate-500 w-4"} />
                <p className="text-sm">Library</p>
            </Link>
            <Link
                href="/user/reports"
                className="flex flex-col items-center mb-4"
            >
                <ReportGraph className={"fill-slate-500 w-4"} />
                <p className="text-sm">Reports</p>
            </Link>
            <Link
                href="/user/setting"
                className="flex flex-col items-center mb-4"
            >
                <SettingGear />
                <p className="text-sm">Setting</p>
            </Link>
        </div>
    );
};

export default ProfileSidebar;
