import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-center px-4 items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <p className="font-josefin font-semibold text-6xl text-violet-800">
                        Yahoot
                    </p>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
