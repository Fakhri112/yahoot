import { useEffect } from "react";
import GuestLayout from "@/Components/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
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

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in - " />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
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
                            onChange={handleOnChange}
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
                            autoComplete="current-password"
                            onChange={handleOnChange}
                            className={
                                "border-gray-300 mt-1 block w-full focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                            }
                        />
                    </div>

                    <p className={"text-sm text-red-600 mt-2"}>
                        {errors.password}
                    </p>
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className={
                                "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "
                            }
                            name="remember"
                            value={data.remember}
                            onChange={handleOnChange}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={"/register"}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Don't have Account?
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
