import React, { createContext, useContext, useReducer, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { initialState, reducer } from "../reducer/CreateQuizReducer";

const CreateQuizState = createContext();
const CreateQuizDispatch = createContext();

export const useCreateQuizState = () => {
    return useContext(CreateQuizState);
};

export const useCreateQuizDispatch = () => {
    return useContext(CreateQuizDispatch);
};

export const CreateQuizProvider = ({
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
                    quiz_title: quizDetail.quiz_title,
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
        <CreateQuizState.Provider value={state}>
            <CreateQuizDispatch.Provider value={dispatch}>
                <Toaster />
                <div
                    className="h-screen flex flex-col
                md:grid 
                md:grid-cols-[minmax(0,_1fr)_minmax(80px,_120px)_repeat(10,_minmax(0,_1fr))]"
                >
                    {children}
                </div>
            </CreateQuizDispatch.Provider>
        </CreateQuizState.Provider>
    );
};
