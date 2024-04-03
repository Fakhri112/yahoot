import { BrowseQuizProvider } from "@/Components/context/BrowseQuizContext";
import React from "react";
import BrowseNavigation from "./BrowseNavigation";
import BrowseQuizzesResult from "./BrowseQuizzesResult";
import { Head } from "@inertiajs/react";

const Index = ({ pageTitle }) => {
    return (
        <div>
            <BrowseQuizProvider>
                <Head title={pageTitle + " - "} />
                <BrowseNavigation />
                <BrowseQuizzesResult />
            </BrowseQuizProvider>
        </div>
    );
};

export default Index;
