import React, { useCallback, useEffect, useRef, useState } from "react";
import ProfilePicture from "../Components/svg/ProfilePicture";
import ProfileSidebar from "@/Components/ProfileSidebar";
import NavBar from "@/Components/NavBar";
import CardQuiz from "@/Components/CardQuiz";
import toast, { Toaster } from "react-hot-toast";
import { Head, Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { Spinner } from "@/Components/svg/Spinner";

const user_home = ({
    user,
    flash,
    totalPlayersAllQuiz,
    totalPlaysAllQuiz,
    totalQuizzes,
    pageTitle,
}) => {
    const currentUser = usePage().props.auth.user;
    const [quizQuery, SetQuizQuery] = useState({
        offset: 8,
        limit: 4,
        showMore: false,
        stopFetch: false,
    });
    const [fetchQuizzes, SetFetchQuizzes] = useState(true);
    const [quizzesData, SetQuizzesData] = useState([]);
    const userPage = useRef(null);
    const loading = useRef(null);

    useEffect(() => {
        if (flash.message) toast.success(flash.message);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    useEffect(() => {
        axios
            .post(window.location.href, {
                offset: 0,
                limit: 8,
            })
            .then((res) => {
                SetQuizzesData(res.data);
                SetFetchQuizzes(false);
            });
    }, []);

    const fetchMoreQuiz = useCallback(async () => {
        if (quizzesData.length == 0) return;
        let response = await axios.post(window.location.href, {
            offset: quizQuery.offset,
            limit: quizQuery.limit,
        });
        if (response.data.length == 0) {
            SetQuizQuery({
                ...quizQuery,
                showMore: false,
                stopFetch: true,
            });
            return;
        }
        SetQuizQuery({
            ...quizQuery,
            offset: quizQuery.offset + 8,
        });
        SetQuizzesData([...quizzesData, ...response.data]);
    }, [quizzesData, quizQuery.search]);

    useEffect(() => {
        if (quizzesData.length == 0 || fetchQuizzes || !loading.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!quizQuery.showMore) return;
                        fetchMoreQuiz();
                    }
                });
            },
            { threshold: 0.75 }
        );
        observer.observe(loading.current);
        return () => {
            observer.disconnect();
        };
    });

    return (
        <>
            <Toaster />
            <Head title={pageTitle + " - "} />
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <main className="h-[89%] bg-slate-50 p-4 m-0 pb-24 md:pb-0 md:ml-24">
                    <div
                        ref={userPage}
                        className="h-full flex flex-col justify-stretch px-4 overflow-y-auto"
                        onScroll={() => {
                            if (
                                userPage.current.scrollHeight <=
                                    userPage.current.offsetHeight ||
                                quizQuery.showMore ||
                                quizQuery.stopFetch ||
                                user.id == currentUser.id
                            )
                                return;
                            SetQuizQuery({
                                ...quizQuery,
                                showMore: true,
                            });
                        }}
                    >
                        <div
                            className="flex justify-between mb-6 flex-col items-center
                            md:flex-row
                        "
                        >
                            <div className="flex flex-col items-center md:flex-row">
                                <ProfilePicture
                                    profilePic={user.profile_pic ?? null}
                                    className="h-20 me-2"
                                />

                                <p className="font-bold text-2xl text-slate-600">
                                    {user.name}
                                </p>
                            </div>
                            <div
                                className="grid grid-cols-3 gap-x-6 
                                        font-semibold text-xl text-slate-600 justify-center mt-3 md:mt-0"
                            >
                                <div className="text-center">
                                    <p className="text-md">Quiz</p>
                                    <p className="text-md">{totalQuizzes}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-md">Plays</p>
                                    <p className="text-md">
                                        {totalPlaysAllQuiz}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-md">Players</p>
                                    <p className="text-md">
                                        {totalPlayersAllQuiz}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {quizzesData.length > 0 && !fetchQuizzes ? (
                            <>
                                <div className="text-slate-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
                                    {quizzesData.map((data, index) => (
                                        <CardQuiz
                                            profilePic={
                                                user.profile_pic ?? null
                                            }
                                            key={index}
                                            data={{ ...data }}
                                            quizId={data.id}
                                            username={user.name}
                                        />
                                    ))}
                                </div>
                                {quizQuery.showMore && (
                                    <div
                                        className={`grid place-items-center`}
                                        ref={loading}
                                    >
                                        <Spinner />
                                    </div>
                                )}
                            </>
                        ) : fetchQuizzes ? (
                            <div className="h-full text-slate-900 grid place-items-center gap-x-4 gap-y-4">
                                <Spinner />
                            </div>
                        ) : quizzesData.length == 0 && !fetchQuizzes ? (
                            <div className=" h-full grid place-items-center">
                                {user.id == currentUser.id ? (
                                    <div className="text-center">
                                        <p className="text-slate-500 text-xl mb-4">
                                            You have no quiz to display here😓
                                        </p>

                                        <Link
                                            href="/create"
                                            className="btn-primary py-2 px-3"
                                        >
                                            Create Quiz Now!
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-slate-500 text-xl mb-4">
                                            This Guy doesn't have any quiz🥱
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </main>
            </div>
        </>
    );
};

export default user_home;
