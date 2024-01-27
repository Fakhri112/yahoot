import React from "react";

import NavBar from "@/Components/NavBar";
import ProfileSidebar from "@/Components/ProfileSidebar";

import { Head } from "@inertiajs/react";
import { DetailPanel } from "./DetailPanel";
import { QuestionList } from "./QuestionList";

const Index = ({ title, quiz, questions, auth }) => {
    const user = auth.user;
    return (
        <>
            <Head title={title} />
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main
                    className="pb-20 md:pb-0 h-[calc(100vh-12%)] bg-slate-200 
                ms-0 md:ms-24 grid grid-cols-1 md:grid-cols-12 overflow-y-auto"
                >
                    <DetailPanel quiz={quiz} user={user} />
                    <QuestionList questions={questions} />
                </main>
            </div>
        </>
    );
};

export default Index;
