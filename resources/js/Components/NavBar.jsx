import React from "react";
import { Link } from "@inertiajs/react";
import NavDropdown from "./dropdown/NavDropdown";

const NavBar = ({ className }) => {
    return (
        <nav
            className={
                "z-10 shadow-md py-3 px-5 relative w-full flex justify-between items-center " +
                className
            }
        >
            <div className="flex items-center gap-x-16">
                <Link
                    href="/"
                    className="font-josefin font-semibold text-2xl text-violet-800"
                >
                    <h4>Yahoot!</h4>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                <Link href="/create" className="btn-primary py-2 px-3 ">
                    Create
                </Link>
                <Link href="/browse" className="btn-primary py-2 px-3 ">
                    Browse
                </Link>
                <NavDropdown />
            </div>
        </nav>
    );
};

export default NavBar;
