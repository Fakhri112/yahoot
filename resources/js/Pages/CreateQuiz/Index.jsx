import { FolderTreeProvider } from "@/Components/context/FolderTree";
import { SaveTo } from "@/Pages/CreateQuiz/modal/SaveTo";
import { Head } from "@inertiajs/react";
import { QuizSetting } from "./modal/QuizSetting";
import { CreateQuizProvider } from "@/Components/context/CreateQuizContext";
import { Navigation } from "./Navigation";
import { ImagePicker } from "./modal/ImagePicker";
import { QuestionListPanel } from "./QuestionListPanel";
import { QuestionMainPanel } from "./QuestionMainPanel";

const create_quiz = ({ pageTitle, userFolder }) => {
    return (
        <>
            <Head title={pageTitle} />
            <CreateQuizProvider folderData={JSON.parse(userFolder)[0]}>
                <QuizSetting />
                <FolderTreeProvider>
                    <SaveTo />
                </FolderTreeProvider>
                <ImagePicker />
                <Navigation />
                <QuestionListPanel />
                <QuestionMainPanel />
            </CreateQuizProvider>
        </>
    );
};

export default create_quiz;
