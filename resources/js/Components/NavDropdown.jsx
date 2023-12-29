import { Menu, Transition } from "@headlessui/react";
import ProfilePicture from "./svg/ProfilePicture";
import { Fragment } from "react";
import { Link } from "@inertiajs/react";

const NavDropdown = () => {
    return (
        <Menu as="div" className="h-10">
            <div>
                <Menu.Button className="inline-flex w-full justify-center text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                    <ProfilePicture className="cursor-pointer h-10" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="user"
                                    className={`${
                                        active
                                            ? "bg-violet-500 text-white"
                                            : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    My Profile
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className={`text-red-800 font-semibold ${
                                        active
                                            ? "bg-red-500 text-slate-100"
                                            : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Log Out
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default NavDropdown;
