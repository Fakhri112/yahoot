import { FolderTreeProvider } from "@/Components/context/FolderTree";
import { SaveTo } from "@/Pages/CreatorQuiz/modal/SaveTo";
import { Head } from "@inertiajs/react";
import { QuizSetting } from "./modal/QuizSetting";
import { CreatorQuizProvider } from "@/Components/context/CreatorQuizContext";
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
            <Head title={pageTitle} />
            <CreatorQuizProvider
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
            </CreatorQuizProvider>
        </>
    );
};

export default create_quiz;
