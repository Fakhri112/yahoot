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
import SearchPanel from "./MainPanel/SearchPanel";

const Index = ({ auth, pageTitle, folderId, path, recent, favorites }) => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <Head title={pageTitle + " - "} />
                <NavBar />
                <ProfileSidebar />
                <LibraryProvider
                    recent={recent}
                    auth={auth}
                    folderId={folderId}
                    path={path}
                    favorites={favorites}
                >
                    <LeftSideFolder />
                    <LibraryModal />
                    <RightSideMainPanel>
                        {recent || favorites ? (
                            <SearchPanel
                                recent={recent}
                                favorites={favorites}
                            />
                        ) : (
                            <Navigation />
                        )}
                        <QuizSelect />
                        <EmptyFolder>
                            {recent || favorites ? null : <FolderList />}
                            <QuizPanel />
                        </EmptyFolder>
                    </RightSideMainPanel>
                </LibraryProvider>
            </div>
        </>
    );
};

export default Index;
