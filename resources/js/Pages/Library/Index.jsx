import React from "react";
import ProfileSidebar from "@/Components/ProfileSidebar";
import NavBar from "@/Components/NavBar";
import { LeftSideFolder } from "./LeftSideFolder";
import { RightSideMainPanel } from "./RightSideMainPanel";
import { Navigation } from "./MainPanel/Navigation";
import { FolderList } from "./MainPanel/FolderList";
import { QuizSelect } from "./MainPanel/QuizSelect";
import { LibraryProvider } from "@/Components/context/LibraryContext";
import { QuizPanel } from "./MainPanel/QuizPanel";
import LibraryModal from "./Modal/LibraryModal";
import { EmptyFolder } from "./MainPanel/EmptyFolder";
import { Head } from "@inertiajs/react";
import RecentPanel from "./MainPanel/RecentPanel";

const Index = ({ auth, pageTitle, folderId, path, recent }) => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <Head title={pageTitle} />
                <NavBar />
                <ProfileSidebar />
                <LibraryProvider
                    recent={recent}
                    auth={auth}
                    folderId={folderId}
                    path={path}
                >
                    <LeftSideFolder />
                    <LibraryModal />
                    <RightSideMainPanel>
                        {recent ? <RecentPanel /> : <Navigation />}
                        <QuizSelect />
                        <EmptyFolder>
                            {recent ? null : <FolderList />}
                            <QuizPanel />
                        </EmptyFolder>
                    </RightSideMainPanel>
                </LibraryProvider>
            </div>
        </>
    );
};

export default Index;
