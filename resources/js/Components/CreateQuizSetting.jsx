import React from "react";

export const CreateQuizSetting = () => {
    return (
        <div>
            <p className="text-3xl font-bold mb-2">Quiz Setting</p>
            <div className="grid grid-cols-5 grid-rows-5 h-[90%] w-full overflow-y-auto gap-x-10">
                <div className="col-span-3 row-span-1 ">
                    <label htmlFor="title" className="font-semibold">
                        Title
                    </label>
                    <input
                        className="block w-full"
                        type="text"
                        id="title"
                        placeholder="Enter Quiz Title"
                    />
                </div>
                <div className="col-span-2 row-span-3 flex flex-col ">
                    <p className="font-semibold">Thumbnail</p>
                    <div className="h-full rounded-lg grid place-items-center bg-slate-300">
                        <button
                            className="btn border-none font-bold bg-blue-700 
                            text-slate-200 rounded hover:bg-blue-600 p-2"
                        >
                            Add Image
                        </button>
                    </div>
                </div>
                <div className="col-span-3 row-span-2 flex flex-col">
                    <label htmlFor="desc" className="font-semibold">
                        Description
                    </label>
                    <textarea
                        className="w-full h-full"
                        name="desc"
                        id="desc"
                    ></textarea>
                </div>
                <div className="col-span-3 row-span-1">
                    <p className="font-semibold">Save To</p>
                    <div className="flex ">
                        <input className="w-full" type="text" id="save_to" />
                        <button className="btn bg-blue-700 text-slate-200 rounded-none hover:bg-blue-600">
                            Choose
                        </button>
                    </div>
                </div>
                <div className="col-span-2 rows-span-1 flex flex-col justify-end">
                    <p className="font-semibold">Visiblity</p>
                    <div>
                        <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="private"
                        />
                        <label for="html" className="me-4">
                            Private
                        </label>
                        <input
                            type="radio"
                            id="css"
                            name="fav_language"
                            value="public"
                        />
                        <label for="css">Public</label>
                    </div>
                </div>
            </div>
        </div>
    );
};
