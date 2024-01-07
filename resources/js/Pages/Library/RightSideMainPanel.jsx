import React from "react";

export const RightSideMainPanel = ({ children }) => {
    return (
        <div className="col-span-12 md:col-span-10 w-full h-full border-black text-slate-900 px-4 py-6 ">
            {children}
        </div>
    );
};
