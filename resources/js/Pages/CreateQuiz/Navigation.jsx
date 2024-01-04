import {
    useCreateQuizDispatch,
    useCreateQuizState,
} from "@/Components/context/CreateQuizContext";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export const Navigation = () => {
    const dispatch = useCreateQuizDispatch();
    const { modal, questionData, quizSetting, saveDirectory } =
        useCreateQuizState();
    const { data, setData, post } = useForm({});

    const handleSave = (e) => {
        e.preventDefault();
        post(route("create.submit"), data);
    };

    useEffect(() => {
        let setting = JSON.parse(JSON.stringify(quizSetting));
        setting.path_id = saveDirectory.path_id;
        setData({ questionData, quizSettingData: setting });
    }, [questionData, quizSetting, saveDirectory]);

    const handleToggleSetting = () => {
        return dispatch({
            type: "UPDATE_MODAL",
            payload: { ...modal, setting: !modal.setting },
        });
    };

    return (
        <nav className="shadow-md py-3 px-5 col-span-12 flex justify-between items-center z-50">
            <div className="flex items-center gap-x-5 md:gap-x-16">
                <Link
                    href="/"
                    className="font-josefin font-semibold text-2xl text-violet-800"
                >
                    Yahoot!
                </Link>
                <button className="flex justify-between items-center border-slate-300 border font-semibold text-slate-800 rounded">
                    <p className="px-3 hidden md:block">
                        {quizSetting.quiz_title}
                    </p>
                    <p
                        onClick={handleToggleSetting}
                        className="bg-slate-300 px-3 py-2"
                    >
                        Setting
                    </p>
                </button>
            </div>
            <div className="flex items-center gap-x-10">
                <div>
                    <Link
                        href="/user"
                        className="shadow-lg py-2 px-3 btn-secondary"
                    >
                        Exit
                    </Link>
                    <button
                        className="shadow-lg py-2 px-3 btn-primary ms-4"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </nav>
    );
};
