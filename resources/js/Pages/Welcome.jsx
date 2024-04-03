import NavDropdown from "@/Components/dropdown/NavDropdown";
import { Link } from "@inertiajs/react";

export default function Welcome({ auth, title }) {
    return (
        <>
            <nav className="py-3 px-5 absolute  w-full flex justify-between items-center">
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
            <main className="bg-violet-700 h-screen grid place-items-center">
                <div className="text-center">
                    <h1 className="lg:text-9xl md:text-8xl text-7xl font-josefin text-white font-bold">
                        Yahoot!
                    </h1>
                    <p className="text-md font-medium text-slate-200">
                        A Live Quiz Game
                    </p>
                    <div className="mt-8">
                        <Link
                            href="browse"
                            className="font-semibold text-slate-100 me-5 bg-blue-600 p-3 hover:bg-blue-700 rounded"
                        >
                            Browse Game
                        </Link>
                        <a
                            href="play"
                            className="font-semibold bg-teal-100 hover:bg-slate-300 p-3 rounded"
                        >
                            Join the Game
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}
