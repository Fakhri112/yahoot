import React from "react";
import {
    Triangle,
    Rhombus,
    Circle,
    Square,
} from "@/Components/svg_component/Shape";

const QuizOnScreen = () => {
    return (
        <div className="h-screen flex  items-center flex-col bg-blue-500">
            {/*<div className="h-screen grid grid-rows-3 bg-blue-400">*/}
            {/* <p className="m-5 drop-shadow-lg border-none text-center h-fit bg-white p-2 text-2xl font-semibold">
                Siapakah Bapak Proklamasi Indonesia
            </p>
            <div className="row-span-3 flex items-center justify-center w-full"> */}

            {/* Quiz Image */}
            {/* <p
                        className="font-bold text-4xl rounded-full bg-purple-700
                        text-white py-5 px-7
                    "
                    >
                        3
                    </p>
                    <img
                        src="/soekarno.jfif"
                        className="w-[calc(100vh-19%)] mt-6"
                    />
                    <div className="text-center">
                        <p className="text-2xl font-semibold">0</p>
                        <p className="text-2xl font-semibold">Answer</p>
                    </div> */}

            {/* <div className="h-40 flex gap-x-10 items-end">
                    <div className="h-4/6 w-20 bg-red-700 flex items-end">
                        <p className="bg-red-600 text-white w-full flex justify-center">
                            <Triangle className="px-1 fill-white w-6 rounded" />
                            9
                        </p>
                    </div>
                    <div className="h-full w-20 bg-sky-700 flex items-end">
                        <p className="bg-sky-600 text-white w-full flex items-center justify-center">
                            <Rhombus className="px-1 fill-white w-6 rounded" />
                            12
                        </p>
                    </div>
                    <div className="h-full w-20 bg-amber-700 flex items-end">
                        <p className="bg-amber-600 text-white w-full flex items-center justify-center">
                            <Circle className="px-1 fill-white w-6 rounded" />
                            12
                        </p>
                    </div>
                    <div className="h-full w-20 bg-green-700 flex items-end">
                        <p className="bg-green-600 text-white w-full flex items-center justify-center">
                            <Square className="px-1 fill-white w-6 rounded" />
                            12
                        </p>
                    </div>
                </div>
            </div>

            <div className=" p-5 self-stretch grid grid-cols-2 gap-3 mt-[5vh]">
                <div className="bg-red-700 rounded flex self-start items-center h-28 py-2 drop-shadow-md">
                    <div className=" rounded self-stretch flex items-center  mx-2">
                        <Triangle className="px-1 fill-white w-10 rounded" />
                    </div>
                    <p className="font-semibold border-0 w-full self-center text-white text-xl">
                        Soekarno 
                    </p>
                </div>
                <div className=" rounded flex self-start items-center h-28 py-2 bg-sky-700 drop-shadow-md">
                    <div className="rounded self-stretch flex items-center mx-2">
                        <Rhombus className="px-1 fill-white w-10 rounded" />
                    </div>
                    <p className="font-semibold border-0 w-full self-center text-white text-xl">
                        Mohammad Hatta
                    </p>
                </div>
                <div className=" rounded flex self-start items-center h-28 py-2 bg-amber-600 drop-shadow-md">
                    <div className="rounded self-stretch flex items-center  mx-2">
                        <Circle className="px-1 fill-white w-10 rounded" />
                    </div>
                    <p className="font-semibold border-0 w-full self-center text-white text-xl">
                        Bung Tomo
                    </p>
                </div>
                <div className=" rounded flex self-start items-center bg-green-700 h-28 py-2  drop-shadow-md">
                    <div className="rounded self-stretch flex items-center  mx-2">
                        <Square className="px-1 fill-white w-10 rounded" />
                    </div>
                    <p className="font-semibold border-0 w-full self-center text-white text-xl">
                        Soeharto
                    </p>
                </div>
            </div> */}
            <div className="flex justify-between w-full p-5">
                <button className="p-2 bg-white px-3 opacity-0">Next</button>
                <p className="m-5 rotate-2 drop-shadow-lg border-none text-center h-fit bg-white p-2 text-2xl font-semibold">
                    Scoreboard
                </p>
                <button className="bg-white p-2 self-center font-semibold px-3">
                    Next
                </button>
            </div>
            <div className="w-8/12 p-5">
                <div className="mb-5 flex border border-white items-center justify-between p-2 bg-white">
                    <p className="font-semibold text-2xl">Anak_baik</p>
                    <p className="font-semibold text-2xl ">988</p>
                </div>
                <div className="mb-5 flex border border-white items-center justify-between p-2 ">
                    <p className="font-semibold text-2xl text-white">
                        Anak_baik
                    </p>
                    <p className="font-semibold text-2xl text-white">988</p>
                </div>
                <div className="mb-5 flex border border-white items-center justify-between p-2 ">
                    <p className="font-semibold text-2xl text-white">
                        Anak_baik
                    </p>
                    <p className="font-semibold text-2xl text-white">988</p>
                </div>
                <div className="mb-5 flex border border-white items-center justify-between p-2 ">
                    <p className="font-semibold text-2xl text-white">
                        Anak_baik
                    </p>
                    <p className="font-semibold text-2xl text-white">988</p>
                </div>
                <div className="mb-5 flex border border-white items-center justify-between p-2 ">
                    <p className="font-semibold text-2xl text-white">
                        Anak_baik
                    </p>
                    <p className="font-semibold text-2xl text-white">988</p>
                </div>
            </div>
        </div>
    );
};

export default QuizOnScreen;
