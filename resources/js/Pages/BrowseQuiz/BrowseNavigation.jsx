import {
    useBrowseQuizDispatch,
    useBrowseQuizState,
} from "@/Components/context/BrowseQuizContext";
import React from "react";
let timeoutId;

const BrowseNavigation = () => {
    const dispatch = useBrowseQuizDispatch();
    const { filter, quizQuery } = useBrowseQuizState();

    const handleSearch = (e) => {
        const value = e.target.value;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            dispatch({
                type: "UPDATE_FETCH_QUIZZES",
                payload: true,
            });

            dispatch({
                type: "UPDATE_QUIZ_QUERY_DATA",
                payload: {
                    ...quizQuery,
                    offset: 12,
                    search: value,
                    stopFetch: false,
                },
            });
        }, 600);
    };

    const handleFilter = (e) => {
        const filterObjectCopy = {
            latest: false,
            popular: false,
            oldest: false,
        };
        dispatch({
            type: "UPDATE_FETCH_QUIZZES",
            payload: true,
        });

        switch (e.target.name) {
            case "latest":
                filterObjectCopy.latest = true;
                dispatch({
                    type: "UPDATE_FILTER_DATA",
                    payload: filterObjectCopy,
                });
                break;
            case "popular":
                filterObjectCopy.popular = true;
                dispatch({
                    type: "UPDATE_FILTER_DATA",
                    payload: filterObjectCopy,
                });
                break;
            case "oldest":
                filterObjectCopy.oldest = true;
                dispatch({
                    type: "UPDATE_FILTER_DATA",
                    payload: filterObjectCopy,
                });
                break;
            default:
                break;
        }
    };

    return (
        <div className="mb-4">
            <input
                onChange={handleSearch}
                type="text"
                placeholder="Search"
                className="border w-full rounded border-slate-300"
            />
            <div className="flex flex-col items-center md:flex-row justify-between mt-2 ">
                <div data-theme="emerald">
                    <button
                        onClick={handleFilter}
                        name="latest"
                        className={`btn-sm px-2 py-1 ${
                            filter.latest ? "btn-primary" : " btn-secondary"
                        } `}
                    >
                        Latest
                    </button>
                    <button
                        onClick={handleFilter}
                        name="popular"
                        className={`mx-4 btn btn-sm  px-2 py-1 ${
                            filter.popular ? "btn-primary" : " btn-secondary"
                        } `}
                    >
                        Popular
                    </button>
                    <button
                        onClick={handleFilter}
                        name="oldest"
                        className={`btn-sm  px-2 py-1 ${
                            filter.oldest ? "btn-primary" : " btn-secondary"
                        } `}
                    >
                        Oldest
                    </button>
                </div>
                {quizQuery.search ? (
                    <p className="mt-2 md:mt-0">
                        Search result for "{quizQuery.search}"
                    </p>
                ) : null}
            </div>
        </div>
    );
};

export default BrowseNavigation;
