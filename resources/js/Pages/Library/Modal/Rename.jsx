import { useEffect, useState } from "react";
import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";
import ReactModal from "react-modal";
import { Spinner } from "@/Components/svg/Spinner";
import toast from "react-hot-toast";
import axios from "axios";

export const Rename = () => {
    const { modal, folderId, rename, quizQuery } = useLibraryState();
    const dispatch = useLibraryDispatch();
    const [submitting, SetSubmitting] = useState(false);

    const handleClose = () => {
        dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                rename: !modal.rename,
            },
        });
        return handleResetData();
    };

    const handleChangeName = (e) => {
        return dispatch({
            type: "UPDATE_RENAME_DATA",
            payload: {
                ...rename,
                name: e.target.value,
            },
        });
    };

    const handleResetData = () => {
        return dispatch({
            type: "UPDATE_RENAME_DATA",
            payload: {
                name: "",
                type: "",
                id: "",
            },
        });
    };

    const handleRename = () => {
        if (
            (rename.name.length > 18 && rename.type == "folder") ||
            (rename.name.length > 50 && rename.type == "quiz")
        )
            return alert("Dude why you edit the HTML LOL!!");

        const payload = {
            name: rename.name,
            type: rename.type,
            id: rename.id,
        };
        SetSubmitting(true);
        let url = `/user/library/rename`;
        axios
            .patch(url, payload)
            .then(function (response) {
                SetSubmitting(false);
                handleClose();
                toast.success("Success");
                if (payload.type == "quiz") {
                    dispatch({
                        type: "RELOAD_QUIZZES_DATA",
                    });
                    return dispatch({
                        type: "UPDATE_QUIZ_QUERY_DATA",
                        payload: {
                            ...quizQuery,
                            offset: 5,
                            stopFetch: false,
                        },
                    });
                }
                if (payload.type == "folder") {
                    if (folderId) {
                        return dispatch({
                            type: "RELOAD_FOLDERS_DATA",
                        });
                    }
                    return dispatch({
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
            isOpen={modal.rename}
            shouldCloseOnOverlayClick={true}
            appElement={document.getElementById("app")}
            onRequestClose={handleClose}
            className="relative rounded  md:w-[40%] w-[80%]  h-40 p-3 bg-white flex flex-col"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl mb-1">Rename</h1>
                {submitting ? <Spinner classname={"w-5 "} /> : <></>}
            </div>
            <input
                maxLength={rename.type == "folder" ? 18 : 50}
                type="text"
                className="rounded"
                placeholder="Enter the Name"
                onChange={handleChangeName}
                value={rename.name}
            />
            <div className="flex mt-2 justify-center gap-x-2 items-center">
                <button className="btn-primary p-2 " onClick={handleRename}>
                    Submit
                </button>
                <button className="btn-secondary p-2 " onClick={handleClose}>
                    Cancel
                </button>
            </div>
        </ReactModal>
    );
};
