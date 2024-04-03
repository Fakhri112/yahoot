import React from "react";
import EnterPin from "./EnterPin";
import { PlayerProvider } from "@/Components/context/PlayerContext";
import AvatarsList from "./modal/AvatarsList";
import EnterWrapper from "./EnterWrapper";
import EnterUsername from "./EnterUsername";
import EnteredPlayer from "./EnteredPlayer";
import QuizCountdown from "./QuizCountdown";
import QuestionCountdown from "./QuestionCountdown";
import ChoosingAnswer from "./ChoosingAnswer";
import PlayerInformationBar from "./PlayerInformationBar";
import AnswerResult from "./AnswerResult";
import MiddleGameEnteredPlayer from "./MiddleGameEnteredPlayer";
import PlayerFinalResult from "./PlayerFinalResult";
import { Head } from "@inertiajs/react";

const Index = () => {
    return (
        <div>
            <Head>
                <title>Play Game - </title>
                <meta http-equiv="cache-control" content="no-cache" />
                <meta http-equiv="expires" content="0" />
                <meta http-equiv="pragma" content="no-cache" />
            </Head>
            <PlayerProvider>
                <AvatarsList />
                <EnterWrapper>
                    <EnterPin />
                    <EnterUsername />
                    <EnteredPlayer />
                    <MiddleGameEnteredPlayer />
                </EnterWrapper>
                <PlayerInformationBar>
                    <QuizCountdown />
                    <QuestionCountdown />
                    <ChoosingAnswer />
                    <AnswerResult />
                </PlayerInformationBar>
                <PlayerFinalResult />
            </PlayerProvider>
        </div>
    );
};

export default Index;
