import {
    useCreateQuizDispatch,
    useCreateQuizState,
} from "@/Components/context/CreateQuizContext";
import { initialState } from "@/Components/reducer/CreateQuizReducer";
import { useWindowSize } from "@uidotdev/usehooks";
import { Reorder } from "framer-motion";

export const QuestionListPanel = () => {
    const dispatch = useCreateQuizDispatch();
    const { questionData, selectedQuestion } = useCreateQuizState();
    const { width, height } = useWindowSize();

    const handleAddQuestion = () => {
        const new_quiz = JSON.parse(JSON.stringify(initialState)).questionData;
        new_quiz[0].id = questionData.length + 1;
        new_quiz[0].question += " " + new_quiz[0].id;
        new_quiz[0].image = "";
        dispatch({
            type: "UPDATE_QUESTION_DATA",
            payload: [...questionData, new_quiz[0]],
        });
        dispatch({
            type: "UPDATE_SELECTED_QUESTION",
            payload: new_quiz[0].id,
        });
    };

    const handleDrag = (result) => {
        dispatch({ type: "UPDATE_QUESTION_DATA", payload: result });
    };

    return (
        <div className=" md:col-span-2 md:row-[span_7_/_span_7]">
            <Reorder.Group
                axis={width < 768 ? "x" : "y"}
                onReorder={handleDrag}
                values={questionData}
                className="z-50 absolute bottom-0 border border-slate-400
            flex overflow-y-auto w-full list-decimal bg-slate-200 flex custom-scroll
            md:static md:bottom-[unset] md:flex-col md:w-auto md:h-full md:px-5 md:py-2 md:gap-2 gap-5 px-4 py-3"
            >
                {questionData.map((item, index) => (
                    <Reorder.Item
                        value={item}
                        key={item.id}
                        onClick={() => {
                            dispatch({
                                type: "UPDATE_SELECTED_QUESTION",
                                payload: item.id,
                            });
                        }}
                    >
                        <div
                            className={`border cursor-grab ${
                                item.id == selectedQuestion
                                    ? "border-4"
                                    : "border-2"
                            }   border-blue-700 border 
                                overflow-hidden
                                    flex flex-col align-items-center bg-white 
                                    p-1 h-24 w-32 rounded-lg md:w-full`}
                        >
                            <p className="text-[0.75rem] font-semibold text-slate-700 pb-3 text-center whitespace-nowrap text-ellipsis overflow-hidden ">
                                {item.question}
                            </p>
                            <div className="flex items-center justify-between mb-2 mt-2">
                                <p className="rounded-full rounded border border-2 border-slate-300 px-2 text-slate-300">
                                    {item.duration}
                                </p>
                                <svg
                                    className="fill-slate-300 text-center"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                                </svg>
                                <p className="rounded-full opacity-0 rounded border border-2 border-slate-300 px-2 text-slate-300">
                                    {item.duration}
                                </p>
                            </div>
                            <div className="grid grid-rows-2 grid-cols-2 gap-0.5 h-full">
                                <div
                                    className={
                                        item.correct_answer == "A"
                                            ? "bg-green-700 rounded"
                                            : "border border-slate-400 rounded"
                                    }
                                ></div>
                                <div
                                    className={
                                        item.correct_answer == "B"
                                            ? "bg-green-700 rounded"
                                            : "border border-slate-400 rounded"
                                    }
                                ></div>
                                <div
                                    className={
                                        item.correct_answer == "C"
                                            ? "bg-green-700 rounded"
                                            : "border border-slate-400 rounded"
                                    }
                                ></div>
                                <div
                                    className={
                                        item.correct_answer == "D"
                                            ? "bg-green-700 rounded"
                                            : "border border-slate-400 rounded"
                                    }
                                ></div>
                            </div>
                        </div>
                    </Reorder.Item>
                ))}

                <button
                    className="before:content-['+'] md:before:content-['Add_Quiz'] ml-2 
                h-auto cursor-pointer btn-primary px-2 md:py-2 md:w-full md:mt-2 md:ml-0 md:mb-16 "
                    onClick={handleAddQuestion}
                ></button>
            </Reorder.Group>
        </div>
    );
};
