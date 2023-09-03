import React from "react";

const enter_pin = () => {
    return (
        <>
            <div className="bg-violet-800 h-screen grid grid-rows-[1fr]">
                <div className="grid place-items-center">
                    <div className="text-center">
                        <h4 className="font-josefin font-semibold text-5xl text-slate-100 mb-10">
                            Yahoot!
                        </h4>
                        <form
                            action=""
                            className="border p-3 rounded bg-white "
                        >
                            <input
                                type="text"
                                placeholder="Game PIN"
                                className="block w-[15rem] border-2 border-slate-300 text-center h-12 font-semibold rounded"
                            />
                            <div>
                                <button
                                    className="bg-slate-800 border-b-4 border-slate-700 mt-3 
                                w-full rounded text-slate-200 font-semibold py-3
                                h-13 hover:translate-y-1 hover:border-b-0 hover:mb-1"
                                >
                                    Enter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <p className="h-min row-span-1 font-semibold text-slate-200 text-center p-3">
                    Back To Home
                </p>
            </div>
        </>
    );
};

export default enter_pin;
