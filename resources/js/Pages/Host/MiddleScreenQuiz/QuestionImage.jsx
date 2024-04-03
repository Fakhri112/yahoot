import React from "react";

const QuestionImage = ({ time, img, totalAnswered }) => {
    return (
        <div className=" p-5 row-span-6 flex sm:flex-row flex-col-reverse items-center sm:items-center sm:justify-between w-full">
            <p
                className="hidden sm:block font-bold text-2xl sm:text-4xl rounded-full
                            bg-blue-400 text-black sm:py-5 sm:px-7 px-4 py-2"
            >
                {time}
            </p>
            <img
                src={img}
                className="mt-2 sm:mt-5 lg:max-w-[24em] sm:w-4/12 w-7/12 "
            />
            <div className=" text-center mb-[-2%] sm:mb-0">
                <p className="sm:text-2xl bg-blue-400 sm:py-5 rounded-full sm:px-7 px-4 py-4 font-semibold">
                    {totalAnswered}
                </p>
                <p className="sm:text-2xl font-semibold">Answer</p>
            </div>
        </div>
    );
};

export default QuestionImage;
