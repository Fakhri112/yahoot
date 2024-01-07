import React from "react";
import ProfileSidebar from "@/Components/ProfileSidebar";
import ProfilePicture from "@/Components/svg/ProfilePicture";
import NavBar from "@/Components/NavBar";
import { Drive, Folder, NewFolder } from "@/Components/svg/FileExplorer";
import { Link } from "@inertiajs/react";
import { Menu } from "@headlessui/react";
import { LeftSideFolder } from "./LeftSideFolder";
import { RightSideMainPanel } from "./RightSideMainPanel";
import { Navigation } from "./MainPanel/Navigation";
import { FolderList } from "./MainPanel/FolderList";
import { QuizList } from "./MainPanel/QuizList";
import { LibraryProvider } from "@/Components/context/LibraryContext";

const Reports = ({ auth, quizzesData }) => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <LibraryProvider auth={auth} quizzesData={quizzesData}>
                    <LeftSideFolder />
                    <RightSideMainPanel>
                        <Navigation />
                        <FolderList />
                        <QuizList />
                    </RightSideMainPanel>
                </LibraryProvider>
            </div>
        </>
    );
};

export default Reports;
