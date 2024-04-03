import { Menu } from "@headlessui/react";
import React from "react";

export const ReportsListDropdown = ({
    handleRename,
    handleDelete,
    name,
    id,
}) => {
    return (
        <Menu as="div" className="relative inline-block ">
            <div>
                <Menu.Button className="px-3 rounded bg-transparent font-bold text-lg">
                    &#8942;
                </Menu.Button>
            </div>

            <Menu.Items className="absolute right-0 bg-white mt-2 rounded shadow-lg border border-400 z-50 w-48">
                <Menu.Item>
                    {({ active }) => (
                        <a
                            data-id={id}
                            data-name={name}
                            onClick={handleRename}
                            className={`text-slate-800 ${
                                active
                                    ? "bg-slate-500 text-white"
                                    : "text-gray-900"
                            } group flex text-md items-center rounded-md px-2 py-2 text-md cursor-pointer`}
                        >
                            Rename
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            data-id={id}
                            onClick={handleDelete}
                            className={`text-slate-800 ${
                                active
                                    ? "bg-slate-500 text-white"
                                    : "text-gray-900"
                            } group flex text-md items-center rounded-md px-2 py-2 text-md cursor-pointer`}
                        >
                            Delete
                        </a>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};
