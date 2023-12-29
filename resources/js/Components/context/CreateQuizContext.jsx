import React, { createContext, useContext, useReducer, useEffect } from "react";

const CreateQuizState = createContext();
const CreateQuizDispatch = createContext();

export const useCreateQuizState = () => {
    return useContext(CreateQuizState);
};

export const useCreateQuizDispatch = () => {
    return useContext(CreateQuizDispatch);
};

export const CreateQuizProvider = ({ children, folderData }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
            type: "INSERT_FOLDER_DATA",
            payload: folderData,
        });
    }, []);

    return (
        <CreateQuizState.Provider value={state}>
            <CreateQuizDispatch.Provider value={dispatch}>
                <div
                    className="h-screen flex flex-col
                md:grid md:grid-rows-[repeat(8,_minmax(0,_1fr))]
                md:grid-cols-[minmax(0,_1fr)_minmax(80px,_120px)_repeat(10,_minmax(0,_1fr))]"
                >
                    {children}
                </div>
            </CreateQuizDispatch.Provider>
        </CreateQuizState.Provider>
    );
};

export const stateList = {
    questionData: [
        {
            id: 1,
            question: "New Question",
            duration: 0,
            image: "",
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
        quiz_title: "New Quiz",
        quiz_description: "",
        thumbnail: "",
        thumbnail_file: "",
        visibility: "",
    },
    pixabaySetting: {
        intersectionIdName: "loading",
        forThumbnail: false,
        image: [],
        per_page: 36,
        search: "",
        loadedCount: 0,
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
    saveDirectory: "My Drive",
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