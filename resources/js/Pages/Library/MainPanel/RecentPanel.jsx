import {
    useLibraryDispatch,
    useLibraryState,
} from "@/Components/context/LibraryContext";

const RecentPanel = () => {
    const { quizQuery } = useLibraryState();
    const dispatch = useLibraryDispatch();
    let timeoutId;

    const handleSearch = (e) => {
        const value = e.target.value;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            dispatch({
                type: "UPDATE_QUIZ_QUERY_DATA",
                payload: {
                    ...quizQuery,
                    offset: 5,
                    search: value,
                    stopFetch: false,
                },
            });
        }, 600);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">Recent</p>
                <input
                    type="text"
                    placeholder="Search"
                    className="h-8 border border-slate-400 rounded"
                    onChange={handleSearch}
                />
            </div>
        </>
    );
};

export default RecentPanel;
