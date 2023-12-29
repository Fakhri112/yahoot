import CardQuiz from "@/Components/CardQuiz";
import NavBar from "@/Components/NavBar";
import ProfilePicture from "@/Components/svg/ProfilePicture";

const QuizReport = () => {
    return (
        <>
            <div className="h-screen bg-white">
                <NavBar />
                <main className="h-[89%] bg-slate-50 py-10 px-20">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border w-full rounded border-slate-300"
                        />
                        <div className="flex flex-col items-center md:flex-row justify-between mt-2 ">
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
                            <p className="mt-2 md:mt-0">
                                Search result for "Anime wiki"
                            </p>
                        </div>
                    </div>
                    <div className="text-slate-900 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
                        <CardQuiz />
                        <CardQuiz />
                        <CardQuiz />
                        <CardQuiz />
                    </div>
                </main>
            </div>
        </>
    );
};

export default QuizReport;
