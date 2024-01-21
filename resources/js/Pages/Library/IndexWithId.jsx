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

const IndexWithId = ({ auth, pageTitle, folderId, path }) => {
    return (
        <>
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <LibraryProvider auth={auth} folderId={folderId} path={path}>
                    <LeftSideFolder />
                    <LibraryModal />
                    <RightSideMainPanel>
                        <Navigation />
                        <EmptyFolder>
                            <FolderList />
                            <QuizSelect />
                            <QuizPanel />
                        </EmptyFolder>
                    </RightSideMainPanel>
                </LibraryProvider>
            </div>
        </>
    );
};

export default IndexWithId;
