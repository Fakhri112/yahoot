import { Menu } from "@headlessui/react";
import React from "react";

export const LibraryDropdown = ({
    renameClick,
    moveClick,
    duplicateClick,
    deleteClick,
    id,
    name,
}) => {
    return (
        <Menu as="div" className="relative inline-block ">
            <div>
                <Menu.Button className="px-3 rounded bg-transparent font-bold text-2xl">
                    &#8942;
                </Menu.Button>
            </div>

            <Menu.Items className="absolute right-0 bg-white mt-2 rounded shadow-lg border border-400 w-28 z-50">
                <Menu.Item>
                    {({ active }) => (
                        <a
                            data-id={id}
                            data-name={name}
                            onClick={renameClick}
                            className={`text-slate-800 text-lg ${
                                active
                                    ? "bg-slate-500 text-white"
                                    : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-md cursor-pointer`}
                        >
                            Rename
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            data-id={id}
                            onClick={duplicateClick}
                            className={`text-slate-800 text-lg ${
                                active
                                    ? "bg-slate-500 text-white"
                                    : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-md cursor-pointer`}
                        >
                            Duplicate
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            data-id={id}
                            onClick={moveClick}
                            className={`text-slate-800 text-lg ${
                                active
                                    ? "bg-slate-500 text-white"
                                    : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-md cursor-pointer`}
                        >
                            Move
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            data-id={id}
                            onClick={deleteClick}
                            className={`text-slate-800 text-lg ${
                                active
                                    ? "bg-slate-500 text-white"
                                    : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-md cursor-pointer`}
                        >
                            Delete
                        </a>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};
