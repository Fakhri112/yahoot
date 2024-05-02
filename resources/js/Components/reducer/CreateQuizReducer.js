const initialState = {
    questionData: [
        {
            id: 1,
            question: "Hello?",
            duration: 20,

            image_file: "",
            answer: {
                A: "Hello",
                B: "World",
                C: "I",
                D: "Love You",
            },
            correct_answer: "A",
        },
        {
            id: 2,
            question: "Node.js is",
            duration: 15,
            image_file: "",
            answer: {
                A: "JavaScript",
                B: "Java",
                C: "C",
                D: "Go",
            },
            correct_answer: "A",
        },
    ],
    quizSetting: {
        id: 0,
        quiz_title: "Simple Quiz",
        quiz_description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
