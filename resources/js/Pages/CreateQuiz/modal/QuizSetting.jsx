import ReactModal from "react-modal";
import {
    useCreateQuizDispatch,
    useCreateQuizState,
} from "@/Components/context/CreateQuizContext";
import { useEffect, useState } from "react";

export const QuizSetting = () => {
    const [quizTitleCount, SetQuizTitleCount] = useState(50);
    const [quizDescriptionCount, SetQuizDescriptionCount] = useState(255);

    const dispatch = useCreateQuizDispatch();
    const { pixabaySetting, quizSetting, saveDirectory, modal } =
        useCreateQuizState();

    useEffect(() => {
        SetQuizTitleCount(50 - quizSetting.quiz_title.length);
        SetQuizDescriptionCount(255 - quizSetting.quiz_description.length);
    }, []);

    const handleQuizSetting = (e) => {
        if (e.target.id == "quiz_title") {
            let count = 50 - e.target.value.length;
            if (count < 0) return;
            SetQuizTitleCount(count);
        }
        if (e.target.id == "quiz_description") {
            let count = 255 - e.target.value.length;
            if (count < 0) return;
            SetQuizDescriptionCount(count);
        }

        const settingCopy = JSON.parse(JSON.stringify(quizSetting));
        const assignValue = { ...settingCopy, [e.target.id]: e.target.value };
        dispatch({
            type: "UPDATE_QUIZ_SETTING",
            payload: { ...assignValue },
        });
    };

    const quiz_thumbnail = () => {
        dispatch({
            type: "UPDATE_QUIZ_SETTING",
            payload: {
                ...quizSetting,
                thumbnail: "",
                thumbnail_file: "",
            },
        });
    };

    const handleModal = (e) => {
        const toggleSetting = () => {
            return dispatch({
                type: "UPDATE_MODAL",
                payload: { ...modal, setting: !modal.setting },
            });
        };
        const toggleImagePicker = () => {
            return dispatch({
                type: "UPDATE_MODAL",
                payload: {
                    ...modal,
                    image_picker: !modal.image_picker,
                },
            });
        };
        const toggleDirectory = () => {
            return dispatch({
                type: "UPDATE_MODAL",
                payload: {
                    ...modal,
                    open_directory: !modal.open_directory,
                },
            });
        };
        return { toggleDirectory, toggleImagePicker, toggleSetting };
    };

    return (
        <ReactModal
            isOpen={modal.setting}
            shouldCloseOnOverlayClick={true}
            appElement={document.getElementById("app")}
            onRequestClose={handleModal().toggleSetting}
            className="rounded bg-white md:w-[80%] w-[90%] flex flex-col min-w-[320px] h-[92%] md:h-auto p-3"
            overlayClassName="fixed inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            <p className="text-3xl font-bold mb-2">Quiz Setting</p>
            <div className="flex flex-col md:grid md:grid-cols-5 md:grid-rows-6 h-[full] w-full overflow-y-auto gap-x-10 gap-y-2 md:gap-y-0">
                <div className="col-span-3 row-span-1 ">
                    <label htmlFor="title" className="font-semibold">
                        Title
                    </label>
                    <div className="flex items-center border border-slate-500 rounded">
                        <input
                            className="block w-full border-0"
                            type="text"
                            id="quiz_title"
                            placeholder="Enter Quiz Title"
                            value={quizSetting.quiz_title}
                            onChange={handleQuizSetting}
                        />
                        <span className="px-2 text-sm">{quizTitleCount}</span>
                    </div>
                </div>
                <div
                    className="md:col-span-2 h-full  md:row-span-4 flex flex-col md:h-auto
        "
                >
                    <p className="font-semibold">Thumbnail</p>
                    <div className="h-full rounded-lg grid place-items-center  bg-slate-300">
                        {quizSetting.thumbnail.length !== 0 ? (
                            <div className="relative">
                                <button
                                    className="absolute p-3 bg-white hover:bg-red-500"
                                    onClick={quiz_thumbnail}
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
                                    src={quizSetting.thumbnail}
                                    alt="Quiz Image"
                                    className="h-60 md:h-auto"
                                />
                            </div>
                        ) : (
                            <button
                                className="btn border-none font-bold bg-blue-700 
                text-slate-200 rounded hover:bg-blue-600 p-2 my-16"
                                onClick={() => {
                                    handleModal().toggleImagePicker();
                                    dispatch({
                                        type: "UPDATE_PIXABAY_SETTING",
                                        payload: {
                                            ...pixabaySetting,
                                            forThumbnail: true,
                                        },
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
                    <div className="flex h-full border border-slate-500 rounded-md">
                        <textarea
                            className="w-full rounded-lg border-transparent focus:border-transparent focus:ring-0 resize-none shadow-none outline-none md:h-full border-none h-40"
                            name="desc"
                            id="quiz_description"
                            value={quizSetting.quiz_description}
                            onChange={handleQuizSetting}
                        ></textarea>
                        <span className="p-1">{quizDescriptionCount}</span>
                    </div>
                </div>
                <div className="col-span-3 row-span-1">
                    <p className="font-semibold">Save To</p>
                    <div className="flex gap-x-1 ">
                        <input
                            className="w-full"
                            type="text"
                            id="save_to"
                            value={saveDirectory.path}
                            onChange={handleQuizSetting}
                            disabled
                        />
                        <button
                            className="btn-primary p-3"
                            onClick={handleModal().toggleDirectory}
                        >
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
                            checked={quizSetting.visibility == "private"}
                            onChange={handleQuizSetting}
                        />
                        <label htmlFor="html" className="me-4">
                            Private
                        </label>
                        <input
                            type="radio"
                            id="visibility"
                            name="visibility"
                            value="public"
                            checked={quizSetting.visibility == "public"}
                            onChange={handleQuizSetting}
                        />
                        <label htmlFor="css">Public</label>
                    </div>
                </div>
            </div>
            <div className="text-center  p-3 ">
                <button
                    className="btn-success px-4 py-2 mt-1"
                    onClick={handleModal().toggleSetting}
                >
                    Save
                </button>
            </div>
        </ReactModal>
    );
};
