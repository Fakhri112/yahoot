import React from "react";
import ProfilePicture from "@/Components/svg_component/ProfilePicture";
import { Link } from "@inertiajs/react";

const NavBar = () => {
    return (
        <nav className="z-10 shadow-md py-3 px-5 relative w-full flex justify-between items-center">
            <div className="flex items-center gap-x-16">
                <Link
                    href="/"
                    className="font-josefin font-semibold text-2xl text-violet-800"
                >
                    <h4>Yahoot!</h4>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                <Link
                    href="/create"
                    className="bg-blue-700 py-2 px-3 font-semibold text-slate-100 rounded"
                >
                    Create
                </Link>
                <Link
                    href="/browse"
                    className="bg-green-700 py-2 px-3 font-semibold text-slate-100 rounded"
                >
                    Browse
                </Link>
                <div>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <ProfilePicture
                            tabIndex={0}
                            className="cursor-pointer h-10"
                        />
                        <ul
                            tabIndex={0}
                            className="border dropdown-content z-[1] mt-5 menu p-2 shadow bg-base-100 w-52"
                        >
                            <li>
                                <a>My Profile</a>
                            </li>
                            <li className="text-red-800 font-semibold">
                                <a>Sign Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
