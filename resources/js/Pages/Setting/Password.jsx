import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";

const Password = () => {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <form
            onSubmit={updatePassword}
            className="bg-white rounded drop-shadow-lg pb-4"
        >
            <div className="flex justify-between px-3 py-2 flex justify-between items-center">
                <p className="text-lg font-semibold">Change Password</p>
                <button className="btn-success self-start py-2 px-5 mt-2">
                    Save
                </button>
            </div>
            <hr className="my-2 border-slate-200" />
            <div className="flex flex-col shrink-0 gap-y-2 p-3 px-3 md:w-8/12 flex-1 shrink">
                <label htmlFor="old_pw">
                    <b>Old Password</b>
                </label>
                <input
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={(e) =>
                        setData("current_password", e.target.value)
                    }
                    className="h-8 rounded border-slate-400"
                    type="password"
                    name=""
                    id="old_pw"
                />
                <div className="flex gap-x-4 align-self">
                    <div className="grow">
                        <label htmlFor="new_pw">
                            <b>New Password</b>
                        </label>
                        <input
                            ref={passwordInput}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            value={data.password}
                            className="h-8 rounded border-slate-400 w-full"
                            type="password"
                            name=""
                            id="new_pw"
                        />
                    </div>
                    <div className="grow">
                        <label htmlFor="re_new_pw">
                            <b>Retype New Password</b>
                        </label>
                        <input
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            value={data.password_confirmation}
                            className="h-8 rounded border-slate-400 w-full"
                            type="password"
                            name=""
                            id="re_new_pw"
                        />
                    </div>
                </div>
            </div>
            <p className="text-sm text-red-800 px-2">
                {errors.current_password}
            </p>
            <p className="text-sm text-red-800 px-2">{errors.password}</p>
            <p className="text-sm text-red-800 px-2">
                {errors.password_confirmation}
            </p>
        </form>
    );
};

export default Password;
