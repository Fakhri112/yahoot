import {
    useReportsListDispatch,
    useReportsListState,
} from "@/Components/context/ReportsListContext";
import { Spinner } from "@/Components/svg/Spinner";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactModal from "react-modal";

const Rename = () => {
    const [submitting, SetSubmitting] = useState(false);
    const { modal, rename } = useReportsListState();
    const dispatch = useReportsListDispatch();

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
        if (rename.name.length > 50)
            return alert("Dude why you edit the HTML LOL!!");
        const payload = {
            name: rename.name,
            id: rename.id,
        };
        SetSubmitting(true);
        let url = `/user/reports/rename/`;
        axios
            .patch(url, payload)
            .then(function (response) {
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
            isOpen={modal.rename}
            shouldCloseOnOverlayClick={true}
            appElement={document.getElementById("app")}
            onRequestClose={handleClose}
            className="relative rounded md:w-[40%] w-[80%] h-40 p-3 bg-white flex flex-col"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl mb-1">Rename</h1>
                {submitting ? <Spinner classname={"w-5 "} /> : <></>}
            </div>
            <input
                type="text"
                maxLength={50}
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

export default Rename;
