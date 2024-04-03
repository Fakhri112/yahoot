import React from "react";

import NavBar from "@/Components/NavBar";
import ProfileSidebar from "@/Components/ProfileSidebar";

import { Head } from "@inertiajs/react";
import { DetailPanel } from "./DetailPanel";
import { QuestionList } from "./QuestionList";
import { Toaster } from "react-hot-toast";

const Index = ({ title, quiz, questions, user, auth, favorite }) => {
    return (
        <>
            <Head title={title + " - "} />
            <Toaster />
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main
                    className="pb-20 md:pb-0 h-[calc(100vh-12%)] bg-slate-200 
                ms-0 md:ms-24 grid grid-cols-1 md:grid-cols-[minmax(80px,_120px)_repeat(11,_minmax(0,_1fr))] overflow-y-auto"
                >
                    <DetailPanel quiz={quiz} user={user} favorite={favorite} />
                    <QuestionList questions={questions} />
                </main>
            </div>
        </>
    );
};

export default Index;
