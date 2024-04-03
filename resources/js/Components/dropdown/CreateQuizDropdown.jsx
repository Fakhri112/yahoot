import { Menu } from "@headlessui/react";
import React from "react";

const CreateQuizDropdown = ({ duplicateQuestion, deleteQuestion }) => {
    return (
        <Menu as="div" className="h-10">
            <div>
                <Menu.Button className="border px-3 rounded bg-white font-bold text-2xl">
                    &#8942;
                </Menu.Button>
            </div>

            <Menu.Items className="bg-white mt-2 rounded">
                <div className="px-1 py-1 ">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                onClick={duplicateQuestion}
                                className={`text-slate-800 text-lg ${
                                    active
                                        ? "bg-purple-500 text-white"
                                        : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Duplicate
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                onClick={deleteQuestion}
                                className={`text-slate-800 text-lg ${
                                    active
                                        ? "bg-red-500 text-white"
                                        : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Delete
                            </a>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    );
};

export default CreateQuizDropdown;
