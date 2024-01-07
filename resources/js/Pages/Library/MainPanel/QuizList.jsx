import { useLibraryState } from "@/Components/context/LibraryContext";
import { QuizPanel } from "./QuizPanel";

export const QuizList = () => {
    const { quizzesData } = useLibraryState();

    return (
        <>
            <div className="flex justify-between p-2 bg-blue-700 rounded my-2">
                <div className="flex items-center gap-x-4">
                    <input type="checkbox" name="" id="select_all" />
                    <label
                        htmlFor="select_all"
                        className="font-bold text-slate-100"
                    >
                        Select All
                    </label>
                </div>
                <div>
                    <button
                        className="me-4 border border-white
                                         rounded p-1 px-3 font-semibold text-white hover:bg-blue-800"
                    >
                        Move
                    </button>
                    <button
                        className=" border border-white
                                         rounded p-1 px-3 font-semibold text-white hover:bg-blue-800"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {quizzesData.map((data) => (
                <QuizPanel {...data} />
            ))}
        </>
    );
};
