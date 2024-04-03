import {
    useCreateQuizDispatch,
    useCreateQuizState,
} from "@/Components/context/CreateQuizContext";
import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

export const Navigation = () => {
    const user = usePage().props.auth.user;
    const dispatch = useCreateQuizDispatch();
    const { modal, questionData, quizSetting, saveDirectory } =
        useCreateQuizState();
    const { data, setData, post, patch } = useForm({});

    const handleSave = (e) => {
        e.preventDefault();
        if (quizSetting.id == 0) {
            return post(route("create.submit"), data);
        }
        return patch(route("create.update"), data);
    };

    useEffect(() => {
        let setting = JSON.parse(JSON.stringify(quizSetting));
        let unchangedImage =
            quizSetting.id == 0
                ? null
                : questionData
                      .filter((value) =>
                          value.image_file.includes("/user_quiz/")
                      )
                      .map((value, index) => {
                          return value.image_file;
                      });

        setting.path_id = saveDirectory.path_id;
        setData({ questionData, quizSettingData: setting, unchangedImage });
    }, [questionData, quizSetting, saveDirectory]);

    const handleToggleSetting = () => {
        return dispatch({
            type: "UPDATE_MODAL",
            payload: { ...modal, setting: !modal.setting },
        });
    };

    return (
        <nav className="shadow-md py-3 px-5 col-span-12 flex items-center z-50">
            <Link
                href="/"
                className="font-josefin font-semibold text-2xl text-violet-800 sm:me-9 me-5"
            >
                Yahoot!
            </Link>
            <div
                onClick={handleToggleSetting}
                className="cursor-pointer flex border border-slate-300 font-semibold text-slate-800 rounded 
            max-w-[320px] sm:w-[45%] w-0 justify-between items-center "
            >
                <div className="sm:block hidden  py-2 px-3 truncate w-full h-full">
                    {quizSetting.quiz_title}
                </div>
                <p className="bg-slate-300 px-3 py-2">Setting</p>
            </div>
            <div className="flex flex-1"></div>
            <div>
                <Link
                    href={"/user/" + user.id}
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
        </nav>
    );
};
