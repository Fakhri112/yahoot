import { Link } from "@inertiajs/react";

export const RightSideMainPanel = ({ children }) => {
    return (
        <div
            className="md:flex-col md:flex col-span-12 
            lg:col-span-10 w-full border-black text-slate-900 px-4 py-6 "
        >
            <div className="flex lg:hidden block">
                <Link
                    href="/user/library/recent"
                    className="border border-slate-400 px-3 py-1 rounded-l-md  hover:bg-slate-200"
                >
                    Recent
                </Link>
                <Link
                    href="/user/library/favorites"
                    className="border border-slate-400 px-3 py-1  hover:bg-slate-200"
                >
                    Favorites
                </Link>
                <Link
                    href="/user/library/"
                    className="border border-slate-400 px-3 py-1 rounded-r-md hover:bg-slate-200"
                >
                    My Drive
                </Link>
            </div>
            {children}
        </div>
    );
};
