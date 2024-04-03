const initialState = {
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
const reducer = (state, action) => {
    switch (action.type) {
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

export { initialState, reducer };
