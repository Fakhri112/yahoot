import { ReportsListProvider } from "@/Components/context/ReportsListContext";
import React from "react";
import ReportNav from "./ReportNav";
import QuizReportsList from "./QuizReportsList";
import Rename from "./Modal/Rename";
import DeletionConfirm from "./Modal/DeletionConfirm";
import EmptyDataWrapper from "./EmptyDataWrapper";
import { Head } from "@inertiajs/react";

const Index = ({ pageTitle }) => {
    return (
        <ReportsListProvider>
            <Head title={pageTitle + " - "} />
            <EmptyDataWrapper>
                <DeletionConfirm />
                <Rename />
                <ReportNav />
                <QuizReportsList />
            </EmptyDataWrapper>
        </ReportsListProvider>
    );
};

export default Index;
