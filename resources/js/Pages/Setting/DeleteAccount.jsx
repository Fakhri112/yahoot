import { useForm } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import ReactModal from "react-modal";

const DeleteAccount = () => {
    const [modal, SetModal] = useState(false);
    const passwordInput = useRef();
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => SetModal(false),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };
    return (
        <>
            <ReactModal
                isOpen={modal}
                shouldCloseOnOverlayClick={true}
                appElement={document.getElementById("app")}
                onRequestClose={() => SetModal(false)}
                className="relative rounded  md:w-[44%] w-[80%]  h-68 p-3 bg-white flex flex-col"
                overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
            >
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-xl mb-1">
                        Are you sure you want to delete your account?
                    </h1>
                </div>
                <div>
                    <p className="">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>
                    <div>
                        <input
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            className="mt-4 w-full rounded-md"
                            placeholder="Input Your Password"
                        />
                        <p className="text-sm mt-1 text-red-700">
                            {errors.password}
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <div className="flex mt-3 gap-x-2">
                            <button
                                onClick={() => SetModal(false)}
                                className="px-3 py-2 btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteUser}
                                className="px-3 py-2 btn-danger"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </ReactModal>
            <div className="bg-white rounded drop-shadow-lg mb-10">
                <div className="flex justify-between px-3 py-2">
                    <p className="text-lg font-semibold">Delete Account</p>
                </div>
                <hr className="my-2 border-slate-200" />
                <div className="flex flex-col shrink-0 gap-y-2 p-3 px-3 md:w-8/12 flex-1 shrink">
                    <p>
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting your
                        account, please download any data or information that
                        you wish to retain.
                    </p>
                    <button
                        onClick={() => SetModal(true)}
                        className="btn-danger self-start py-2 px-5 mt-2"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeleteAccount;
