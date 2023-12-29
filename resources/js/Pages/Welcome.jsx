import NavDropdown from "@/Components/NavDropdown";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, title }) {
    return (
        <>
            <Head title={title} />
            <nav className="py-3 px-5 absolute  w-full flex justify-between">
                <div>
                    <h4 className="font-josefin font-semibold text-2xl text-slate-200">
                        Yahoot!
                    </h4>
                </div>

                {auth.user ? (
                    <NavDropdown />
                ) : (
                    <div>
                        <Link
                            href="login"
                            className="me-10 font-semibold text-white"
                        >
                            Log In
                        </Link>
                        <Link
                            href="register"
                            className="font-semibold text-white"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </nav>
            <main className="bg-violet-600 h-screen grid place-items-center">
                <div className="text-center">
                    <h1 className="text-9xl font-josefin text-white font-bold">
                        Yahoot!
                    </h1>
                    <p className="text-md font-medium text-slate-200">
                        A Live Quiz Game
                    </p>
                    <div className="mt-8">
                        <Link
                            href="browse"
                            className="font-semibold text-slate-200 me-5 bg-sky-800 p-3 rounded"
                        >
                            Browse Game
                        </Link>
                        <Link
                            href="play"
                            className="font-semibold bg-teal-100 p-3 rounded"
                        >
                            Join the Game
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
