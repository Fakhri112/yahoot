import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const CreatorQuizState = createContext();
const CreatorQuizDispatch = createContext();

export const useCreatorQuizState = () => {
    return useContext(CreatorQuizState);
};

export const useCreatorQuizDispatch = () => {
    return useContext(CreatorQuizDispatch);
};

export const CreatorQuizProvider = ({
    children,
    rootFolder,
    quizDetail,
    quizQuestions,
    path,
    errors,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (quizDetail && quizQuestions) {
            dispatch({
                type: "UPDATE_QUESTION_DATA",
                payload: quizQuestions.map((value, index) => {
                    return {
                        id: index + 1,
                        question: value.question_title,
                        duration: value.duration,

                        image_file: value.question_image,
                        answer: {
                            A: value.A,
                            B: value.B,
                            C: value.C,
                            D: value.D,
                        },
                        correct_answer: value.correct_answer,
                    };
                }),
            });
            dispatch({
                type: "UPDATE_QUIZ_SETTING",
                payload: {
                    id: quizDetail.id,
                    quiz_title: quizDetail.quiz_name,
                    quiz_description: quizDetail.quiz_description,
                    thumbnail: quizDetail.thumbnail,
                    prev_thumbnail: quizDetail.thumbnail,
                    visibility: quizDetail.visibility,
                },
            });
        }

        dispatch({
            type: "UPDATE_SAVE_DIRECTORY",
            payload: {
                path: path ? path : "My Drive",
                path_id: quizDetail ? quizDetail.folder_id : rootFolder,
            },
        });
    }, []);

    useEffect(() => {
        if (Object.keys(errors).length == 0) return;
        for (const property in errors) {
            toast.error(errors[property]);
        }
    }, [errors]);

    return (
        <CreatorQuizState.Provider value={state}>
            <CreatorQuizDispatch.Provider value={dispatch}>
                <Toaster />
                <div
                    className="h-screen flex flex-col
                md:grid md:grid-rows-[repeat(8,_minmax(0,_1fr))]
                md:grid-cols-[minmax(0,_1fr)_minmax(80px,_120px)_repeat(10,_minmax(0,_1fr))]"
                >
                    {children}
                </div>
            </CreatorQuizDispatch.Provider>
        </CreatorQuizState.Provider>
    );
};

export const stateList = {
    questionData: [
        {
            id: 1,
            question: "New Question",
            duration: "",

            image_file: "",
            answer: {
                A: "",
                B: "",
                C: "",
                D: "",
            },
            correct_answer: "",
        },
    ],
    quizSetting: {
        id: 0,
        quiz_title: "New Quiz",
        quiz_description: "",
        thumbnail: "",
        prev_thumbnail: "",
        visibility: "public",
    },
    pixabaySetting: {
        forThumbnail: false,
        image: [],
        per_page: 36,
        search: "",
    },
    modal: {
        image_picker: false,
        setting: false,
        open_directory: false,
    },
    cropperCompSetting: {
        selectedImage: "",
        cropModal: false,
        cropShape: "rect",
        ratio: 52 / 32,
    },
    saveDirectory: {
        path: "My Drive",
        path_id: 0,
    },
    selectedQuestion: 1,
    folderData: "",
};

const initialState = { ...stateList };

const reducer = (state, action) => {
    switch (action.type) {
        // Define actions to update specific parts of the state
        case "UPDATE_QUESTION_DATA":
            return { ...state, questionData: action.payload };
        case "UPDATE_QUIZ_SETTING":
            return { ...state, quizSetting: action.payload };
        case "UPDATE_PIXABAY_SETTING":
            return { ...state, pixabaySetting: action.payload };
        case "UPDATE_MODAL":
            return { ...state, modal: action.payload };
        case "UPDATE_CROPPER_COMP_SETTING":
            return { ...state, cropperCompSetting: action.payload };
        case "UPDATE_SAVE_DIRECTORY":
            return { ...state, saveDirectory: action.payload };
        case "UPDATE_SELECTED_QUESTION":
            return { ...state, selectedQuestion: action.payload };
        case "INSERT_FOLDER_DATA":
            return { ...state, folderData: action.payload };
        default:
            return state;
    }
};
