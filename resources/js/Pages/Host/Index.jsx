import { HostProvider } from "@/Components/context/HostContext";
import React from "react";
import WaitingRoom from "./WaitingRoom";
import QuizCountdown from "./QuizCountdown";
import QuestionCountdown from "./QuestionCountdown";
import QuestionOnScreen from "./QuestionOnScreen";
import Scoreboard from "./Scoreboard";
import FinalResult from "./FinalResult";

const Index = ({ pin, quiz, questions }) => {
    return (
        <>
            <HostProvider quiz={quiz} questions={questions}>
                <WaitingRoom pin={pin} />
                <QuizCountdown />
                <QuestionCountdown />
                <QuestionOnScreen />
                <Scoreboard />
                <FinalResult />
            </HostProvider>
        </>
    );
};

export default Index;
