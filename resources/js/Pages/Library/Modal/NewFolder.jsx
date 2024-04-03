import { useState } from "react";
import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";
import ReactModal from "react-modal";
import { Spinner } from "@/Components/svg/Spinner";
import toast from "react-hot-toast";
import axios from "axios";

export const NewFolder = () => {
    const { modal, user, folderId } = useLibraryState();
    const dispatch = useLibraryDispatch();
    const [newFolderName, SetNewFolderName] = useState("");
    const [submitting, SetSubmitting] = useState(false);

    const handleClose = () => {
        dispatch({
            type: "UPDATE_MODAL",
            payload: { ...modal, new_folder: !modal.new_folder },
        });
    };

    const handleNewFolder = () => {
        if (newFolderName.length > 18)
            return alert("Dude why you edit the HTML LOL!!");
        const payload = {
            newFolder: newFolderName,
            user_id: user.id,
            folderId: folderId ? folderId : false,
        };
        SetSubmitting(true);
        axios
            .post("/user/library/new-folder/", payload)
            .then(function (response) {
                SetSubmitting(false);
                handleClose();
                toast.success("Success");
                if (folderId) {
                    return dispatch({
                        type: "RELOAD_FOLDERS_DATA",
                    });
                }
                return dispatch({
                    type: "RELOAD_MYDRIVE_DATA",
                });
            })
            .catch(function (error) {
                SetSubmitting(false);
                console.log(error);
            });
    };

    return (
        <ReactModal
            isOpen={modal.new_folder}
            shouldCloseOnOverlayClick={true}
            appElement={document.getElementById("app")}
            onRequestClose={handleClose}
            className="relative rounded  md:w-[40%] w-[80%]  h-40 p-3 bg-white flex flex-col"
            overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
        >
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl mb-1">Add New Folder</h1>
                {submitting ? <Spinner classname={"w-5 "} /> : <></>}
            </div>
            <input
                maxLength={18}
                type="text"
                className="rounded"
                placeholder="New Folder"
                onChange={(e) => SetNewFolderName(e.target.value)}
            />
            <div className="flex mt-2 justify-center gap-x-2 items-center">
                <button className="btn-primary p-2 " onClick={handleNewFolder}>
                    Submit
                </button>
                <button className="btn-secondary p-2 " onClick={handleClose}>
                    Cancel
                </button>
            </div>
        </ReactModal>
    );
};
