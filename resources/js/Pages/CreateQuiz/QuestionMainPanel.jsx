import ChoiceInput from "@/Components/choice/ChoiceInput";
import {
    useCreateQuizDispatch,
    useCreateQuizState,
} from "@/Components/context/CreateQuizContext";
import CreateQuizDropdown from "@/Components/dropdown/CreateQuizDropdown";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const QuestionMainPanel = () => {
    const dispatch = useCreateQuizDispatch();
    const [questionTitleCount, SetQuestionTitleCount] = useState(100);
    const [answerCount, SetAnswerCount] = useState({
        A: 70,
        B: 70,
        C: 70,
        D: 70,
    });
    const { modal, questionData, selectedQuestion } = useCreateQuizState();

    const filteredItems = questionData.filter(
        (item) => item.id === selectedQuestion
    );

    useEffect(() => {
        if (!filteredItems) return;
        SetQuestionTitleCount(100 - filteredItems[0].question.length);
        let answerCountCopy = JSON.parse(JSON.stringify(answerCount));
        answerCountCopy.A = 70 - filteredItems[0].answer.A.length;
        answerCountCopy.B = 70 - filteredItems[0].answer.B.length;
        answerCountCopy.C = 70 - filteredItems[0].answer.C.length;
        answerCountCopy.D = 70 - filteredItems[0].answer.D.length;
        SetAnswerCount(answerCountCopy);
    }, []);

    const delete_quiz_image = () => {
        const QuestionCopy = JSON.parse(JSON.stringify(questionData));
        for (let index = 0; index < QuestionCopy.length; index++) {
            if (selectedQuestion === QuestionCopy[index].id) {
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
        if (questionData.length == 1)
            return toast.error("Quiz must have at least 1 question");
        const QuestionCopy = JSON.parse(JSON.stringify(questionData));

        const deletedQuestion = QuestionCopy.filter(
            (value) => filteredItems[0].id !== value.id
        );

        for (let index = 0; index < deletedQuestion.length; index++) {
            deletedQuestion[index].id = index + 1;
        }
        if (filteredItems[0].id != 1) {
            dispatch({
                type: "UPDATE_SELECTED_QUESTION",
                payload: selectedQuestion - 1,
            });
        }

        dispatch({
            type: "UPDATE_QUESTION_DATA",
            payload: [...deletedQuestion],
        });
    };

    const handleFormAnswer = (e) => {
        const QuestionCopy = JSON.parse(JSON.stringify(questionData));

        for (let index = 0; index < QuestionCopy.length; index++) {
            if (selectedQuestion === QuestionCopy[index].id) {
                let count = 70 - e.target.value.length;
                if (count < 0) return;
                let answerCountCopy = JSON.parse(JSON.stringify(answerCount));
                answerCountCopy[e.target.id] = count;
                SetAnswerCount(answerCountCopy);
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
    const handleQuestionTitleAndDuration = (e) => {
        const QuestionCopy = JSON.parse(JSON.stringify(questionData));

        for (let index = 0; index < QuestionCopy.length; index++) {
            if (selectedQuestion === QuestionCopy[index].id) {
                switch (e.target.id) {
                    case "questionData":
                        let count = 100 - e.target.value.length;
                        if (count < 0) return;
                        SetQuestionTitleCount(count);

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
        <main className=" overflow-y-auto md:col-span-10 md:row-[span_7_/_span_7] md:w-full md:h-full">
            {filteredItems.map((data, index) => (
                <div
                    key={index}
                    className="h-full overflow-auto ml-0 bg-blue-300 flex flex-col items-center justify-between p-4"
                >
                    <div className="drop-shadow-lg flex w-full items-center ">
                        <input
                            className="w-full outline-none border-transparent focus:border-transparent focus:ring-0  border-none text-center self-stretch"
                            type="text"
                            id="questionData"
                            onChange={handleQuestionTitleAndDuration}
                            placeholder="Enter Title"
                            value={data.question}
                        />
                        <p className="bg-white py-2 px-2">
                            {questionTitleCount}
                        </p>
                    </div>
                    <div className="md:flex hidden justify-between items-start w-full md:my-[5vh]">
                        <div className="flex flex-col">
                            <CreateQuizDropdown
                                duplicateQuestion={duplicateQuestion}
                                deleteQuestion={deleteQuestion}
                            />
                            <select className="select invisible">
                                <option disabled defaultValue={false}>
                                    Duration
                                </option>
                            </select>
                        </div>
                        <div className=" w-[52vh] h-[32vh] md:grid hidden place-items-center bg-slate-400 drop-shadow-md rounded">
                            {data.image_file.length !== 0 ? (
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
                                    <img
                                        src={data.image_file}
                                        alt="Quiz Image"
                                    />
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
                            value={data.duration}
                            onChange={handleQuestionTitleAndDuration}
                            id="duration"
                            className="border-0 rounded"
                        >
                            <option value={""} disabled defaultValue={true}>
                                Duration
                            </option>
                            <option value={20}>20 Sec</option>
                            <option value={15}>15 Sec</option>
                            <option value={10}>10 Sec</option>
                        </select>
                    </div>
                    <div className="md:hidden flex flex-col items-center py-5 px-1 justify-between items-start w-full md:my-[5vh]">
                        <div className="relative mt-14 max-w-[52vh] w-[100%] h-[32vh] md:hidden grid place-items-center bg-slate-400 drop-shadow-md rounded">
                            <div className="absolute -top-12 w-full flex justify-between">
                                <div className="flex flex-col">
                                    <CreateQuizDropdown
                                        duplicateQuestion={duplicateQuestion}
                                        deleteQuestion={deleteQuestion}
                                    />
                                    <select className="select invisible">
                                        <option disabled defaultValue={false}>
                                            Duration
                                        </option>
                                    </select>
                                </div>
                                <select
                                    value={data.duration}
                                    onChange={handleQuestionTitleAndDuration}
                                    id="duration"
                                    className="border-0 self-start rounded"
                                >
                                    <option
                                        value={""}
                                        disabled
                                        defaultValue={true}
                                    >
                                        Duration
                                    </option>
                                    <option value={20}>20 Sec</option>
                                    <option value={15}>15 Sec</option>
                                    <option value={10}>10 Sec</option>
                                </select>
                            </div>
                            {data.image_file.length !== 0 ? (
                                <div className="h-full">
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
                                    <img
                                        src={data.image_file}
                                        alt="Quiz Image"
                                        className=" h-full"
                                    />
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
                    </div>

                    <div className="self-stretch grid sm:grid-cols-2 gap-3 mb-36 md:mb-2">
                        <ChoiceInput
                            valueCount={answerCount.A}
                            choiceChar={"A"}
                            choiceValue={data.answer.A}
                            correctAnswer={data.correct_answer}
                            onChange={handleFormAnswer}
                        />
                        <ChoiceInput
                            valueCount={answerCount.B}
                            choiceChar={"B"}
                            choiceValue={data.answer.B}
                            correctAnswer={data.correct_answer}
                            onChange={handleFormAnswer}
                        />
                        <ChoiceInput
                            valueCount={answerCount.C}
                            choiceChar={"C"}
                            choiceValue={data.answer.C}
                            correctAnswer={data.correct_answer}
                            onChange={handleFormAnswer}
                        />
                        <ChoiceInput
                            valueCount={answerCount.D}
                            choiceChar={"D"}
                            choiceValue={data.answer.D}
                            correctAnswer={data.correct_answer}
                            onChange={handleFormAnswer}
                        />
                    </div>
                </div>
            ))}
        </main>
    );
};
