import ProfilePicture from "@/Components/svg_component/ProfilePicture";

const QuizReport = () => {
    return (
        <>
            <div className="h-screen bg-white">
                <nav className="z-10 shadow-md py-3 px-5 relative w-full flex justify-between items-center">
                    <div className="flex items-center gap-x-16">
                        <h4 className="font-josefin font-semibold text-2xl text-violet-800">
                            Yahoot!
                        </h4>
                    </div>
                    <div className="flex items-center gap-x-6">
                        <button className="bg-blue-700 py-2 px-3 font-semibold text-slate-100 rounded">
                            Create
                        </button>
                        <div>
                            <ProfilePicture className="h-10" />
                        </div>
                    </div>
                </nav>
                <main className="h-[89%] bg-slate-50 py-10 px-20">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border w-full rounded border-slate-300"
                        />
                        <div className="flex justify-between mt-2 ">
                            <div data-theme="emerald">
                                <button className="btn btn-sm btn-secondary">
                                    Latest
                                </button>
                                <button className="mx-4 btn btn-sm  btn-secondary">
                                    Popular
                                </button>
                                <button className="btn btn-sm btn-outline btn-secondary">
                                    Oldest
                                </button>
                            </div>
                            <p>Search result for "Anime wiki"</p>
                        </div>
                    </div>
                    <div className="text-slate-900 grid grid-cols-4 gap-x-4 gap-y-4">
                        <div className="bg-white drop-shadow-lg  rounded-lg">
                            <img className="rounded-t-lg" src="/image.png" />
                            <div className="flex gap-x-3 items-center py-2 px-2">
                                <ProfilePicture className="h-10" />
                                <div className="flex flex-col">
                                    <b>Hello World</b>
                                    <span className="text-sm">
                                        Fakhrie_3310 &#x2022; 2.7k players
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default QuizReport;
