import { FolderTreeProvider } from "@/Components/context/FolderTreeContext";
import { SaveTo } from "@/Pages/CreateQuiz/modal/SaveTo";
import { Head } from "@inertiajs/react";
import { QuizSetting } from "./modal/QuizSetting";
import { CreateQuizProvider } from "@/Components/context/CreateQuizContext";
import { Navigation } from "./Navigation";
import { ImagePicker } from "./modal/ImagePicker";
import { QuestionListPanel } from "./QuestionListPanel";
import { QuestionMainPanel } from "./QuestionMainPanel";

const create_quiz = ({
    pageTitle,
    rootFolder,
    quizDetail,
    quizQuestions,
    path,
    errors,
}) => {
    return (
        <>
            <Head title={pageTitle + " - "} />
            <CreateQuizProvider
                rootFolder={rootFolder}
                quizDetail={quizDetail}
                quizQuestions={quizQuestions}
                path={path}
                errors={errors}
            >
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
