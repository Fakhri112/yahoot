import {
    useReportsListDispatch,
    useReportsListState,
} from "@/Components/context/ReportsListContext";
import { Spinner } from "@/Components/svg/Spinner";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactModal from "react-modal";

const DeletionConfirm = () => {
    const { selectedQuizReports, modal } = useReportsListState();
    const [submitting, SetSubmitting] = useState(false);
    const dispatch = useReportsListDispatch();

    const handleClose = () => {
        dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                deletion: !modal.deletion,
            },
        });
        return handleResetData();
    };

    const handleResetData = () => {
        return dispatch({
            type: "UPDATE_SELECTED_QUIZ_REPORTS_DATA",
            payload: [],
        });
    };

    const handleDeletion = () => {
        SetSubmitting(true);

        let url = `/user/reports/delete/`;
        axios
            .put(url, { selectedQuizReports })
            .then(async function (response) {
                SetSubmitting(false);
                handleClose();
                dispatch({ type: "UPDATE_FETCH_DATA", payload: true });
                dispatch({ type: "RELOAD_QUIZ_REPORTS_DATA" });
                toast.success("Success");
            })
            .catch(function (error) {
                SetSubmitting(false);
                console.log(error);
            });
    };

    return (
        <ReactModal
            isOpen={modal.deletion}
            shouldCloseOnOverlayClick={true}
            appElement={document.getElementById("app")}
            onRequestClose={handleClose}
            className="relative rounded md:w-[40%] w-[80%] p-3 bg-white flex flex-col"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl mb-1">Delete</h1>
                {submitting ? <Spinner classname={"w-5 "} /> : <></>}
            </div>
            <p className=" text-lg">
                Are you sure you want to delete this Report?
            </p>
            <div className="flex mt-2 justify-center gap-x-2 items-center">
                <button className="btn-danger p-2 " onClick={handleDeletion}>
                    Delete
                </button>
                <button className="btn-secondary p-2 " onClick={handleClose}>
                    Cancel
                </button>
            </div>
        </ReactModal>
    );
};

export default DeletionConfirm;
