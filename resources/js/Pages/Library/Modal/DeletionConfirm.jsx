import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";
import { Spinner } from "@/Components/svg/Spinner";
import React, { useState } from "react";
import ReactModal from "react-modal";

const DeletionConfirm = () => {
    const { modal, selectedQuizzes, user, selectedFolder, folderId } =
        useLibraryState();
    const dispatch = useLibraryDispatch();
    const [submitting, SetSubmitting] = useState(false);

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
        dispatch({
            type: "UPDATE_SELECTED_QUIZZES_DATA",
            payload: [],
        });
        return dispatch({
            type: "UPDATE_SELECTED_FOLDER",
            payload: "",
        });
    };

    const handleNewFolder = () => {
        SetSubmitting(true);
        const payload = {};

        if (selectedQuizzes.length != 0) {
            if (typeof selectedQuizzes == "string") {
                let toArray = [selectedQuizzes];
                payload.selectedQuizzes = toArray;
            }
            if (Array.isArray(selectedQuizzes)) {
                payload.selectedQuizzes = selectedQuizzes;
            }
        }
        if (selectedFolder != "") payload.selectedFolder = selectedFolder;

        let url = `/user/library/delete/`;
        axios
            .post(url, payload, {
                headers: {
                    "X-Xsrf-Token": user.xsrf,
                },
            })
            .then(function (response) {
                SetSubmitting(false);
                handleClose();
                if (selectedQuizzes.length > 0) {
                    dispatch({
                        type: "RELOAD_QUIZZES_DATA",
                    });
                }
                if (selectedFolder != "") {
                    if (folderId) {
                        dispatch({
                            type: "RELOAD_FOLDERS_DATA",
                        });
                    } else
                        dispatch({
                            type: "RELOAD_MYDRIVE_DATA",
                        });
                }
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
            className="relative rounded w-[33%] p-3 bg-white flex flex-col"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl mb-1">Delete</h1>
                {submitting ? <Spinner classname={"w-5 "} /> : <></>}
            </div>
            <p className=" text-lg">
                Are you sure you want to delete this{" "}
                {selectedFolder == "" ? "folder" : "quiz"}?
            </p>
            <div className="flex mt-2 justify-center gap-x-2 items-center">
                <button className="btn-primary p-2 " onClick={handleNewFolder}>
                    Submit
                </button>
                <button className="btn-danger p-2 " onClick={handleClose}>
                    Cancel
                </button>
            </div>
        </ReactModal>
    );
};

export default DeletionConfirm;
