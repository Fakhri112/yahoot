import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";

export const QuizSelect = () => {
    const dispatch = useLibraryDispatch();
    const { quizzesData, selectedQuizzes, bulkSelect, modal, status } =
        useLibraryState();

    const handleSelectAll = (e) => {
        let allCheckboxIds = [];
        if (e.target.checked)
            allCheckboxIds = quizzesData.map((item) => item.id);

        if (allCheckboxIds.length == 0)
            dispatch({ type: "UPDATE_BULK_SELECT", payload: false });

        return dispatch({
            type: "UPDATE_SELECTED_QUIZZES_DATA",
            payload: allCheckboxIds,
        });
    };

    const handleMove = () => {
        dispatch({
            type: "UPDATE_STATUS_DATA",
            payload: { ...status, isMove: true },
        });
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                open_directory: !modal.open_directory,
            },
        });
    };

    const handleDelete = () => {
        dispatch({
            type: "UPDATE_STATUS_DATA",
            payload: { ...status, isDeletion: true },
        });
        return dispatch({
            type: "UPDATE_MODAL",
            payload: {
                ...modal,
                deletion: !modal.deletion,
            },
        });
    };

    return (
        <>
            {selectedQuizzes.length != 0 &&
            bulkSelect &&
            Array.isArray(selectedQuizzes) ? (
                <div className="flex justify-between p-2 bg-blue-700 rounded my-2 items-center">
                    <div className="flex items-center gap-x-4">
                        <input
                            type="checkbox"
                            name=""
                            id="select_all"
                            onChange={handleSelectAll}
                        />
                        <label
                            htmlFor="select_all"
                            className="font-bold text-slate-100"
                        >
                            Select All
                        </label>
                    </div>
                    <p className="font-bold text-slate-100 hidden sm:block">
                        {selectedQuizzes.length} Selected
                    </p>
                    <div>
                        <button
                            onClick={handleMove}
                            className="me-4 border border-white
                                         rounded p-1 px-3 font-semibold text-white hover:bg-blue-800"
                        >
                            Move
                        </button>
                        <button
                            onClick={handleDelete}
                            className=" border border-white
                                         rounded p-1 px-3 font-semibold text-white hover:bg-blue-800"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
