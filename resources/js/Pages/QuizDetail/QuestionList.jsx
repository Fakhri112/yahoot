import React from "react";
import { Rhombus, Circle, Square, Triangle } from "@/Components/svg/Shape";
import { Disclosure } from "@headlessui/react";

export const QuestionList = ({ questions }) => {
    return (
        <div className="col-span-8 w-full md:overflow-y-auto border-black text-slate-900 px-4 py-6">
            <p className="font-semibold text-xl">
                Question ({questions.length})
            </p>
            {questions.map((question, index) => (
                <Disclosure
                    as="div"
                    key={index}
                    className="bg-base-200 rounded-none border shadow-lg mb-2"
                >
                    <Disclosure.Button
                        as="div"
                        className="p-0 flex h-24 justify-between bg-white cursor-pointer hover:bg-blue-300"
                    >
                        <div className="p-4 text-sm">
                            <p>{index + 1}. Quiz</p>
                            <b>{question.question_title}</b>
                        </div>
                        <div className="relative flex ">
                            <img
                                src={question.question_image}
                                alt=""
                                className="grow"
                            />{" "}
                            <p className="absolute text-slate-700 font-semibold rounded m-1 text-sm bg-slate-50 px-1 top-0">
                                {question.duration} Sec
                            </p>
                        </div>
                    </Disclosure.Button>
                    <Disclosure.Panel
                        as="div"
                        className="collapse-content flex flex-col gap-y-4 bg-white px-3 pb-2"
                    >
                        <div className="flex justify-between items-center mt-1">
                            <div className="flex gap-x-2 items-center">
                                <Triangle className="bg-red-700 p-2 fill-white h-10 w-10 rounded" />
                                <p> {question.A}</p>
                            </div>
                            {question.correct_answer == "A" ? (
                                <>&#10004;</>
                            ) : (
                                <> &#10060;</>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-x-2 items-center">
                                <Rhombus className="bg-blue-600 p-2 fill-white h-10 w-10 rounded" />
                                <p>{question.B} </p>
                            </div>
                            {question.correct_answer == "B" ? (
                                <>&#10004;</>
                            ) : (
                                <> &#10060;</>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-x-2 items-center">
                                <Circle className="bg-amber-500 p-2 fill-white h-10 w-10 rounded" />
                                <p>{question.C} </p>
                            </div>
                            {question.correct_answer == "C" ? (
                                <>&#10004;</>
                            ) : (
                                <> &#10060;</>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-x-2 items-center">
                                <Square className="fill-white bg-green-600 p-2 h-10 w-10 rounded" />
                                <p> {question.D} </p>
                            </div>
                            {question.correct_answer == "D" ? (
                                <>&#10004;</>
                            ) : (
                                <> &#10060;</>
                            )}
                        </div>
                    </Disclosure.Panel>
                </Disclosure>
            ))}
        </div>
    );
};
