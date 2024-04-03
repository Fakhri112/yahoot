import { useEffect } from "react";
import GuestLayout from "@/Components/GuestLayout";

import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register - " />

            <form onSubmit={submit}>
                <div>
                    <label
                        htmlFor="name"
                        value="Name"
                        className={`block font-medium text-sm text-gray-700 `}
                    >
                        Name
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleOnChange}
                            autoComplete="name"
                            required
                            className={
                                "border-gray-300 mt-1 block w-full focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                            }
                        />
                    </div>

                    <p className={"text-sm text-red-600 mt-2"}>{errors.name}</p>
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="email"
                        value="Email"
                        className={`block font-medium text-sm text-gray-700 `}
                    >
                        Email
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={handleOnChange}
                            required
                            className={
                                "border-gray-300 mt-1 block w-full focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                            }
                        />
                    </div>

                    <p className={"text-sm text-red-600 mt-2"}>
                        {errors.email}
                    </p>
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="password"
                        value="Password"
                        className={`block font-medium text-sm text-gray-700 `}
                    >
                        Password
                    </label>

                    <div className="flex flex-col items-start">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                            className={
                                "border-gray-300 mt-1 block w-full focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                            }
                        />
                    </div>

                    <p className={"text-sm text-red-600 mt-2"}>
                        {errors.password}
                    </p>
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className={`block font-medium text-sm text-gray-700 `}
                    >
                        Password
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                            className={
                                "border-gray-300 mt-1 block w-full focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                            }
                        />
                    </div>

                    <p className={"text-sm text-red-600 mt-2"}>
                        {errors.password_confirmation}
                    </p>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <button
                        className={`inline-flex ms-5 items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                            processing && "opacity-25"
                        } `}
                        disabled={processing}
                    >
                        Log in
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
