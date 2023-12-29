import {
    useCreateQuizDispatch,
    useCreateQuizState,
} from "@/Components/context/CreateQuizContext";
import { Menu } from "@headlessui/react";
import { Circle, Rhombus, Square, Triangle } from "@/Components/svg/Shape";

export const QuestionMainPanel = () => {
    const dispatch = useCreateQuizDispatch();
    const { modal, questionData, selectedQuestion } = useCreateQuizState();

    const filteredItems = questionData.filter(
        (item) => item.id === selectedQuestion
    );

    const delete_quiz_image = () => {
        const QuestionCopy = questionData;
        for (let index = 0; index < QuestionCopy.length; index++) {
            if (selectedQuestion === QuestionCopy[index].id) {
                QuestionCopy[index].image = "";
                QuestionCopy[index].image_file = "";
            }
        }
        dispatch({
            type: "UPDATE_QUESTION_DATA",
            payload: [...QuestionCopy],
        });
    };

    const duplicateQuestion = () => {
        let duplicate = JSON.parse(JSON.stringify(filteredItems[0]));
        duplicate.id = questionData.length + 1;
        duplicate.question = "duplicate of " + duplicate.question;
        dispatch({
            type: "UPDATE_QUESTION_DATA",
            payload: [...questionData, duplicate],
        });
        dispatch({
            type: "UPDATE_SELECTED_QUESTION",
            payload: duplicate.id,
        });
    };

    const deleteQuestion = () => {
        const QuestionCopy = questionData;
        const deletedQuestion = QuestionCopy.filter(
            (value) => value.id !== filteredItems[0].id
        );
        for (let index = 0; index < deletedQuestion.length; index++) {
            deletedQuestion[index].id = index + 1;
        }
        dispatch({
            type: "UPDATE_SELECTED_QUESTION",
            payload: selectedQuestion - 1,
        });
        dispatch({
            type: "UPDATE_QUESTION_DATA",
            payload: [...deletedQuestion],
        });
    };
    const handleFormAnswer = (e) => {
        const QuestionCopy = questionData;

        for (let index = 0; index < QuestionCopy.length; index++) {
            if (selectedQuestion === QuestionCopy[index].id) {
                QuestionCopy[index].answer[e.target.id] = e.target.value;
                if (e.target.name == "correct_answer") {
                    QuestionCopy[index].correct_answer = e.target.value;
                } else if (e.target.value == "") {
                    QuestionCopy[index].correct_answer = "";
                }
                break;
            }
        }
        dispatch({ type: "UPDATE_QUESTION_DATA", payload: [...QuestionCopy] });
    };
    const handleQuestionDuration = (e) => {
        const QuestionCopy = questionData;

        for (let index = 0; index < QuestionCopy.length; index++) {
            if (selectedQuestion === QuestionCopy[index].id) {
                switch (e.target.id) {
                    case "questionData":
                        QuestionCopy[index].question = e.target.value;
                        break;
                    case "duration":
                        QuestionCopy[index].duration = e.target.value;
                        break;
                    default:
                        break;
                }
            }
        }
        dispatch({ type: "UPDATE_QUESTION_DATA", payload: [...QuestionCopy] });
    };

    const handleToggleImagePicker = () => {
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                image_picker: !modal.image_picker,
            },
        });
    };

    return (
        <main
            className=" overflow-y-auto
md:col-span-10 md:row-[span_7_/_span_7] md:w-full md:h-full"
        >
            {filteredItems.map((value, index) => (
                <div
                    key={index}
                    className="h-full overflow-auto ml-0 bg-blue-300 flex flex-col items-center justify-between p-4"
                >
                    <input
                        className="w-full drop-shadow-lg border-none text-center self-stretch"
                        type="text"
                        id="questionData"
                        onChange={handleQuestionDuration}
                        placeholder="Enter Title"
                        value={value.question}
                    />
                    <div className="flex justify-between items-start w-full my-[5vh]">
                        <div className="flex flex-col">
                            <Menu as="div" className="h-10">
                                <div>
                                    <Menu.Button className="border px-3 rounded bg-white font-bold text-2xl">
                                        &#8942;
                                    </Menu.Button>
                                </div>

                                <Menu.Items className="bg-white mt-2 rounded">
                                    <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    onClick={duplicateQuestion}
                                                    className={`text-slate-800 text-lg ${
                                                        active
                                                            ? "bg-purple-500 text-white"
                                                            : "text-gray-900"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    Duplicate
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    onClick={deleteQuestion}
                                                    className={`text-slate-800 text-lg ${
                                                        active
                                                            ? "bg-red-500 text-white"
                                                            : "text-gray-900"
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    Delete
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Menu>
                            <select className="select invisible">
                                <option disabled defaultValue={false}>
                                    Duration
                                </option>
                            </select>
                        </div>
                        <div className="w-[52vh] h-[32vh] grid place-items-center bg-slate-400 drop-shadow-md rounded">
                            {value.image.length !== 0 ? (
                                <div>
                                    <button
                                        className="absolute p-3 bg-white hover:bg-red-500"
                                        onClick={delete_quiz_image}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 448 512"
                                        >
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                        </svg>
                                    </button>
                                    <img src={value.image} alt="Quiz Image" />
                                </div>
                            ) : (
                                <button
                                    onClick={handleToggleImagePicker}
                                    className="text-4xl bg-white px-2 drop-shadow-lg font-josefin"
                                >
                                    +
                                </button>
                            )}
                        </div>
                        <select
                            value={value.duration}
                            onChange={handleQuestionDuration}
                            id="duration"
                            className="border-0 rounded"
                        >
                            <option value={0} disabled defaultValue={true}>
                                Duration
                            </option>
                            <option value={20}>20 Sec</option>
                            <option value={15}>15 Sec</option>
                            <option value={10}>10 Sec</option>
                        </select>
                    </div>

                    <div className="self-stretch grid grid-cols-2 gap-3 mb-36 md:mb-2">
                        <div
                            className={`rounded flex self-start items-center h-[19vh] py-2 drop-shadow-md ${
                                value.answer.A.length !== 0
                                    ? "bg-red-700"
                                    : "bg-slate-100"
                            }`}
                        >
                            <div className="rounded self-stretch flex items-center bg-red-700 mx-2">
                                <Triangle className="p-1 h-10 fill-white"></Triangle>
                            </div>
                            <input
                                className={`border-transparent focus:border-transparent focus:ring-0 font-semibold w-full border-none ${
                                    value.answer.A.length !== 0
                                        ? "bg-red-700 text-white"
                                        : null
                                }`}
                                maxLength={72}
                                id="A"
                                type="text"
                                placeholder="Add Answer"
                                onChange={handleFormAnswer}
                                value={value.answer.A}
                            />
                            {value.answer.A.length !== 0 ? (
                                <input
                                    className="h-5 w-5 m-3"
                                    type="radio"
                                    value={"A"}
                                    name="correct_answer"
                                    onChange={handleFormAnswer}
                                    checked={value.correct_answer == "A"}
                                />
                            ) : null}
                        </div>
                        <div
                            className={`rounded flex self-start items-center h-[19vh] py-2 drop-shadow-md ${
                                value.answer.B.length !== 0
                                    ? "bg-sky-700"
                                    : "bg-slate-100"
                            }`}
                        >
                            <div className="rounded self-stretch flex items-center bg-sky-700 mx-2">
                                <Rhombus className="p-1 h-10 fill-white"></Rhombus>
                            </div>
                            <input
                                className={`border-transparent focus:border-transparent focus:ring-0 font-semibold w-full border-none ${
                                    value.answer.B.length !== 0
                                        ? "bg-sky-700 text-white"
                                        : null
                                }`}
                                maxLength={72}
                                id="B"
                                type="text"
                                placeholder="Add Answer"
                                onChange={handleFormAnswer}
                                value={value.answer.B}
                            />
                            {value.answer.B.length !== 0 ? (
                                <input
                                    className="h-5 w-5 m-3"
                                    type="radio"
                                    value={"B"}
                                    name="correct_answer"
                                    onChange={handleFormAnswer}
                                    checked={value.correct_answer == "B"}
                                />
                            ) : null}
                        </div>
                        <div
                            className={`rounded flex self-start items-center h-[19vh] py-2 drop-shadow-md ${
                                value.answer.C.length !== 0
                                    ? "bg-amber-600"
                                    : "bg-slate-100"
                            }`}
                        >
                            <div className="rounded self-stretch flex items-center bg-amber-600 mx-2">
                                <Circle className="p-1 h-10 fill-white"></Circle>
                            </div>
                            <input
                                className={`border-transparent focus:border-transparent focus:ring-0 font-semibold w-full border-none ${
                                    value.answer.C.length !== 0
                                        ? "bg-amber-600 text-white"
                                        : null
                                }`}
                                maxLength={72}
                                id="C"
                                type="text"
                                placeholder="Add Answer"
                                onChange={handleFormAnswer}
                                value={value.answer.C}
                            />
                            {value.answer.C.length !== 0 ? (
                                <input
                                    className="h-5 w-5 m-3"
                                    type="radio"
                                    value={"C"}
                                    name="correct_answer"
                                    onChange={handleFormAnswer}
                                    checked={value.correct_answer == "C"}
                                />
                            ) : null}
                        </div>
                        <div
                            className={`rounded flex self-start items-center h-[19vh] py-2 drop-shadow-md ${
                                value.answer.D.length !== 0
                                    ? "bg-green-700"
                                    : "bg-slate-100"
                            }`}
                        >
                            <div className="rounded self-stretch flex items-center bg-green-700 mx-2">
                                <Square className="p-1 h-10 fill-white"></Square>
                            </div>
                            <input
                                className={`border-transparent focus:border-transparent focus:ring-0 font-semibold w-full border-none ${
                                    value.answer.D.length !== 0
                                        ? "bg-green-700 text-white"
                                        : null
                                }`}
                                maxLength={72}
                                id="D"
                                type="text"
                                placeholder="Add Answer"
                                onChange={handleFormAnswer}
                                value={value.answer.D}
                            />
                            {value.answer.D.length !== 0 ? (
                                <input
                                    className="h-5 w-5 m-3"
                                    type="radio"
                                    name="correct_answer"
                                    value={"D"}
                                    onChange={handleFormAnswer}
                                    checked={value.correct_answer == "D"}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
};
