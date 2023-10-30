import {
    Circle,
    Rhombus,
    Square,
    Triangle,
} from "@/Components/svg_component/Shape";
import { Head, Link } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactModal from "react-modal";

const NEW_QUESTION_BLUEPRINT = {
    question: "New Question",
    duration: 0,
    image: [],
    answer: {
        A: "",
        B: "",
        C: "",
        D: "",
    },
    correct_answer: "",
};

const QUIZ_SETTING = {
    title: "New Quiz",
    description: "",
    save_to: "",
    thumbnail: "",
    visibility: "",
};

const create_quiz = (props) => {
    const [pixabayData, SetPixabayData] = useState({
        intersectionIdName: "loading",
        forThumbnail: false,
        image: [],
        per_page: 36,
        search: "",
        loadedCount: 0,
    });
    const [QuizSetting, SetQuizSetting] = useState(QUIZ_SETTING);
    const [Question, SetQuestion] = useState([
        {
            id: 1,
            question: "New Question",
            duration: 0,
            image: "",
            answer: {
                A: "",
                B: "",
                C: "",
                D: "",
            },
            correct_answer: "",
        },
    ]);
    const [selectedQuestion, SetSelectedQuestion] = useState(1);
    const [Thumbnail, SetThumbnail] = useState("");
    const [modal, SetModal] = useState({
        image_picker: false,
        setting: false,
    });
    const filteredItems = Question.filter(
        (item) => item.id === selectedQuestion
    );

    useEffect(() => {
        const getImage = async () => {
            const res = await fetch(
                "https://pixabay.com/api/?key=39472345-1f9f4091bb251e2fd5b2f1858&order=popular&per_page=18&orientation=horizontal" +
                    `&q=${encodeURIComponent(pixabayData.search)}`
            );
            const data = await res.json();
            SetPixabayData({ ...pixabayData, image: data.hits });
        };

        getImage();
    }, [modal.image_picker, pixabayData.search]);

    const fetchImage = useCallback(async () => {
        let imageData = await fetch(
            "https://pixabay.com/api/?key=39472345-1f9f4091bb251e2fd5b2f1858&order=popular&orientation=horizontal&per_page=" +
                pixabayData.per_page +
                `&q=${encodeURIComponent(pixabayData.search)}`
        );

        let response = await imageData.json();
        return SetPixabayData({
            ...pixabayData,
            image: response.hits,
            per_page: pixabayData.per_page + 9,
        });
    }, [modal.image_picker, pixabayData]);

    useEffect(() => {
        console.log(Question);
        const targetElement = document.getElementById(
            pixabayData.intersectionIdName
        );
        if (targetElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        fetchImage();
                    }
                });
            });
            observer.observe(targetElement);
            return () => {
                observer.unobserve(targetElement);
            };
        }
    });

    useEffect(() => {
        if (modal.image_picker)
            return SetPixabayData({
                ...pixabayData,
                intersectionIdName: "loading-true",
            });
        return SetPixabayData({
            ...pixabayData,
            intersectionIdName: "loading",
            search: "",
            forThumbnail: false,
            loadedCount: 0,
        });
    }, [modal.image_picker]);

    const chooseImage = (e) => {
        const QuestionCopy = Question;
        if (pixabayData.forThumbnail)
            SetQuizSetting({ ...QuizSetting, thumbnail: e.target.src });
        else
            for (let index = 0; index < QuestionCopy.length; index++) {
                if (selectedQuestion === QuestionCopy[index].id) {
                    QuestionCopy[index].image = e.target.src;
                }
            }
        SetQuestion([...QuestionCopy]);
        SetPixabayData({ ...pixabayData, forThumbnail: false, loadedCount: 0 });
        SetModal({
            ...modal,
            image_picker: !modal.image_picker,
        });
    };

    const deleteQuestionImage = (e) => {
        const QuestionCopy = Question;
        for (let index = 0; index < QuestionCopy.length; index++) {
            if (selectedQuestion === QuestionCopy[index].id) {
                QuestionCopy[index].image = "";
            }
        }
        SetQuestion([...QuestionCopy]);
    };

    const duplicateQuestion = () => {
        let duplicate = JSON.parse(JSON.stringify(filteredItems[0]));
        duplicate.id = Question.length + 1;
        duplicate.question = "duplicate of " + duplicate.question;
        SetQuestion([...Question, duplicate]);
    };

    const deleteQuestion = () => {
        const QuestionCopy = Question;
        const deletedQuestion = QuestionCopy.filter(
            (value) => value.id !== filteredItems[0].id
        );
        for (let index = 0; index < deletedQuestion.length; index++) {
            deletedQuestion[index].id = index + 1;
        }
        SetSelectedQuestion(selectedQuestion - 1);
        SetQuestion([...deletedQuestion]);
    };

    const handleFormAnswer = (e) => {
        const QuestionCopy = Question;

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
        SetQuestion([...QuestionCopy]);
    };

    const handleQuestionDuration = (e) => {
        const QuestionCopy = Question;

        for (let index = 0; index < QuestionCopy.length; index++) {
            if (selectedQuestion === QuestionCopy[index].id) {
                switch (e.target.id) {
                    case "question":
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
        SetQuestion([...QuestionCopy]);
    };

    const handleDrag = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = Array.from(Question);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);
        for (let index = 0; index < reorderedItems.length; index++) {
            reorderedItems[index].id = index + 1;
        }
        SetQuestion(reorderedItems);
    };

    const handleQuizSetting = (e) => {
        const settingCopy = JSON.parse(JSON.stringify(QuizSetting));
        // switch (e.target.id) {
        //     case "quiz_title":
        //         settingCopy.title = e.target.value;
        //         break;
        //     case "quiz_desc":
        //         settingCopy.description = e.target.value;
        //         break;
        //     case "save_to":
        //         settingCopy.save_to = e.target.value;
        //         break;
        //     case "visibility":
        //         settingCopy.visibility = e.target.value;
        //         break;
        //     default:
        //         break;
        // }

        const assignValue = { ...settingCopy, [e.target.id]: e.target.value };
        console.log(assignValue);
    };

    return (
        <>
            <Head title={props.title} />
            <div className="h-screen overflow-hidden">
                <ReactModal
                    isOpen={modal.setting}
                    shouldCloseOnOverlayClick={true}
                    appElement={document.getElementById("app")}
                    onRequestClose={() =>
                        SetModal({ ...modal, setting: !modal.setting })
                    }
                    className="rounded bg-white w-[70%] h-[77%] p-3"
                    overlayClassName="fixed inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
                >
                    <p className="text-3xl font-bold mb-2">Quiz Setting</p>
                    <div className=" grid grid-cols-5 grid-rows-6 h-[80%] w-full overflow-y-auto gap-x-10">
                        <div className="col-span-3 row-span-1 ">
                            <label htmlFor="title" className="font-semibold">
                                Title
                            </label>
                            <input
                                className="block w-full"
                                type="text"
                                id="quiz_title"
                                placeholder="Enter Quiz Title"
                            />
                        </div>
                        <div className="col-span-2 row-span-4 flex flex-col ">
                            <p className="font-semibold">Thumbnail</p>
                            <div className="h-full rounded-lg grid place-items-center bg-slate-300">
                                {QuizSetting.thumbnail.length !== 0 ? (
                                    <div>
                                        <button
                                            className="absolute p-3 bg-white hover:bg-red-500"
                                            onClick={() => SetThumbnail("")}
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
                                            src={QuizSetting.thumbnail}
                                            alt="Quiz Image"
                                        />
                                    </div>
                                ) : (
                                    <button
                                        className="btn border-none font-bold bg-blue-700 
                                text-slate-200 rounded hover:bg-blue-600 p-2"
                                        onClick={() => {
                                            SetModal({
                                                ...modal,
                                                image_picker:
                                                    !modal.image_picker,
                                            }),
                                                SetPixabayData({
                                                    ...pixabayData,
                                                    forThumbnail: true,
                                                });
                                        }}
                                    >
                                        Add Image
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="col-span-3 row-span-3 flex flex-col mt-3">
                            <label htmlFor="desc" className="font-semibold">
                                Description
                            </label>
                            <textarea
                                className="w-full h-full"
                                name="desc"
                                id="quiz_desc"
                            ></textarea>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <p className="font-semibold">Save To</p>
                            <div className="flex ">
                                <input
                                    className="w-full"
                                    type="text"
                                    id="save_to"
                                />
                                <button className="btn bg-blue-700 text-slate-200 rounded-none hover:bg-blue-600">
                                    Choose
                                </button>
                            </div>
                        </div>
                        <div className="col-span-2 rows-span-1 flex flex-col justify-end">
                            <p className="font-semibold">Visiblity</p>
                            <div>
                                <input
                                    type="radio"
                                    id="visibility"
                                    name="visibility"
                                    value="private"
                                />
                                <label for="html" className="me-4">
                                    Private
                                </label>
                                <input
                                    type="radio"
                                    id="visibility"
                                    name="visibility"
                                    value="public"
                                />
                                <label for="css">Public</label>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn bg-green-700 text-white hover:bg-green-700">
                            Save
                        </button>
                    </div>
                </ReactModal>
                <ReactModal
                    isOpen={modal.image_picker}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() =>
                        SetModal({
                            ...modal,
                            image_picker: !modal.image_picker,
                        })
                    }
                    className="relative rounded w-[40%] h-[86%] p-3 bg-white"
                    overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
                >
                    <div className="h-[90%] overflow-y-auto">
                        <div className="text-center">
                            <input
                                onChange={(e) =>
                                    SetPixabayData({
                                        ...pixabayData,
                                        image: [],
                                        search: e.target.value,
                                        loadedCount: 0,
                                    })
                                }
                                type="text"
                                placeholder="search"
                                className="w-[80%]"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <p>
                                <b>Popular Image</b>
                            </p>
                            <p>Provided by Pixabay</p>
                        </div>
                        <hr />
                        <div>
                            <div className="grid grid-cols-3 gap-3">
                                {pixabayData.image.map((item) => {
                                    return (
                                        <img
                                            key={item.id}
                                            src={item.largeImageURL}
                                            className="col-span-1 self-stretch cursor-pointer"
                                            onLoad={() =>
                                                SetPixabayData({
                                                    ...pixabayData,
                                                    loadedCount:
                                                        pixabayData.loadedCount +
                                                        1,
                                                })
                                            }
                                            onClick={chooseImage}
                                        />
                                    );
                                })}
                            </div>
                            {pixabayData.loadedCount > 9 ? (
                                <p
                                    id={pixabayData.intersectionIdName}
                                    className="text-center p-3 text-lg"
                                >
                                    Loading...
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="h-[10%]">
                        <input
                            className="mt-4"
                            type="file"
                            name=""
                            id="label"
                            accept="image"
                        />
                    </div>
                </ReactModal>

                <nav className="shadow-md py-3 px-5 relative w-full flex justify-between items-center z-50">
                    <div className="flex items-center gap-x-5 md:gap-x-16">
                        <Link
                            href="/"
                            className="font-josefin font-semibold text-2xl text-violet-800"
                        >
                            Yahoot!
                        </Link>
                        <button className="flex justify-between items-center border-slate-300 border font-semibold text-slate-800 rounded">
                            <p className="px-3 hidden md:block">
                                Super duper quiz in the world
                            </p>
                            <p
                                onClick={() =>
                                    SetModal({
                                        ...modal,
                                        setting: !modal.setting,
                                    })
                                }
                                className="bg-slate-300 px-3 py-2"
                            >
                                Setting
                            </p>
                        </button>
                    </div>
                    <div className="flex items-center gap-x-10">
                        <div>
                            <Link
                                href="/user"
                                className="shadow-lg bg-slate-200 py-2 px-3 font-semibold text-slate-800 rounded"
                            >
                                Exit
                            </Link>
                            <button className="shadow-lg bg-blue-700 py-2 px-3 font-semibold text-slate-100 rounded ms-4">
                                Save
                            </button>
                        </div>
                    </div>
                </nav>

                <DragDropContext onDragEnd={handleDrag}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="z-50 absolute bottom-0 border border-slate-400
                                flex  bg-blue-50 w-full p-3 list-decimal
                                md:fixed md:bottom-[unset] md:flex-col md:w-48 md:h-full overflow-y-auto"
                            >
                                {Question.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={`${item.id}`}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="mt-4 flex  w-full gap-x-2"
                                                key={index}
                                                onClick={() => {
                                                    SetSelectedQuestion(
                                                        item.id
                                                    );
                                                }}
                                            >
                                                <p>{item.id}</p>
                                                <div
                                                    className={`border ${
                                                        item.id ==
                                                        selectedQuestion
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
                                                    <div className="flex items-center gap-x-6 mb-2 mt-2">
                                                        <p className="rounded-full rounded border border-2 border-slate-300 px-1 text-slate-300">
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
                                                    </div>
                                                    <div className="grid grid-rows-2 grid-cols-2 gap-0.5 h-full">
                                                        <div
                                                            className={
                                                                item.correct_answer ==
                                                                "A"
                                                                    ? "bg-green-700 rounded"
                                                                    : "border border-slate-400 rounded"
                                                            }
                                                        ></div>
                                                        <div
                                                            className={
                                                                item.correct_answer ==
                                                                "B"
                                                                    ? "bg-green-700 rounded"
                                                                    : "border border-slate-400 rounded"
                                                            }
                                                        ></div>
                                                        <div
                                                            className={
                                                                item.correct_answer ==
                                                                "C"
                                                                    ? "bg-green-700 rounded"
                                                                    : "border border-slate-400 rounded"
                                                            }
                                                        ></div>
                                                        <div
                                                            className={
                                                                item.correct_answer ==
                                                                "D"
                                                                    ? "bg-green-700 rounded"
                                                                    : "border border-slate-400 rounded"
                                                            }
                                                        ></div>
                                                    </div>
                                                </div>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <button
                                    className="before:content-['+'] md:before:content-['Add_Quiz'] ml-2 h-auto cursor-pointer 
                                    btn bg-blue-700 hover:bg-blue-400 py-1 z-10 text-white 
                                    md:w-full md:mt-2 md:ml-0 md:mb-16 "
                                    onClick={() => {
                                        const new_quiz = JSON.parse(
                                            JSON.stringify(
                                                NEW_QUESTION_BLUEPRINT
                                            )
                                        );
                                        new_quiz.id = Question.length + 1;
                                        new_quiz.question += " " + new_quiz.id;
                                        SetQuestion([...Question, new_quiz]);
                                        SetSelectedQuestion(new_quiz.id);
                                    }}
                                ></button>
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>

                <main className="h-[92%]">
                    {filteredItems.map((value) => (
                        <div className="h-full overflow-auto ml-0 md:ml-48 bg-blue-300 flex flex-col items-center justify-between p-4">
                            <input
                                className="w-full drop-shadow-lg border-none text-center self-stretch"
                                type="text"
                                id="question"
                                onChange={handleQuestionDuration}
                                placeholder="Enter Title"
                                value={value.question}
                            />
                            <div className="flex justify-between items-start w-full my-[5vh]">
                                <div className="flex flex-col">
                                    <div className="dropdown dropdown-bottom ">
                                        <label
                                            tabIndex={0}
                                            className="btn rounded font-bold text-2xl"
                                        >
                                            &#8942;
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 absolute w-52 mt-2"
                                        >
                                            <li>
                                                <a onClick={duplicateQuestion}>
                                                    Duplicate
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={deleteQuestion}>
                                                    Delete
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <select className="select invisible">
                                        <option disabled selected>
                                            Duration
                                        </option>
                                    </select>
                                </div>
                                <div className="w-[50vh] h-[32vh] grid place-items-center bg-slate-400 drop-shadow-md rounded">
                                    {value.image.length !== 0 ? (
                                        <div>
                                            <button
                                                className="absolute p-3 bg-white hover:bg-red-500"
                                                onClick={deleteQuestionImage}
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
                                                src={value.image}
                                                alt="Quiz Image"
                                            />
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                SetModal({
                                                    ...modal,
                                                    image_picker:
                                                        !modal.image_picker,
                                                })
                                            }
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
                                    className="select"
                                >
                                    <option value={0} disabled selected>
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
                                        placeholder="Add Question"
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
                                        placeholder="Add Question"
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
                                        placeholder="Add Question"
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
                                        placeholder="Add Question"
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
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </>
    );
};

export default create_quiz;
