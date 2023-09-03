const FinalResult = () => {
    return (
        <div>
            <main
                className="bg-[url('https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]
                h-screen bg-cover grid grid-cols-12
            "
            >
                <div class="absolute inset-0 bg-black opacity-50"></div>
                <section className="col-span-5 m-5 brightness-100 p-4 flex flex-col border rounded border-2 overflow-auto">
                    <div className=" p-5">
                        <div className="mb-2 flex  items-center text-white justify-between p-2 bg-slate-500/60 ">
                            <div className="flex items-center gap-x-2">
                                <p>4</p>
                                <img
                                    src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                    alt=""
                                    className="h-10"
                                />
                                <p className="font-semibold text-xl ">
                                    Anak_baik
                                </p>
                            </div>

                            <p className="font-semibold text-xl ">988</p>
                        </div>
                        <div className="mb-2 flex  items-center justify-between p-2 text-white bg-slate-500/60">
                            <div className="flex items-center gap-x-2 ">
                                <p>5</p>
                                <img
                                    src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                    alt=""
                                    className="h-10"
                                />
                                <p className="font-semibold text-xl ">
                                    Anak_baik
                                </p>
                            </div>
                            <p className="font-semibold text-xl text-white">
                                988
                            </p>
                        </div>
                        <div className="mb-2 flex text-white items-center justify-between p-2 bg-slate-500/60">
                            <div className="flex items-center gap-x-2 ">
                                <p>6</p>
                                <img
                                    src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                    alt=""
                                    className="h-10"
                                />
                                <p className="font-semibold text-xl ">
                                    Anak_baik
                                </p>
                            </div>
                            <p className="font-semibold text-xl text-white">
                                988
                            </p>
                        </div>
                        <div className="mb-2 flex text-white items-center justify-between p-2 bg-slate-500/60">
                            <div className="flex items-center gap-x-2 ">
                                <p>7</p>
                                <img
                                    src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                    alt=""
                                    className="h-10"
                                />
                                <p className="font-semibold text-xl ">
                                    Anak_baik
                                </p>
                            </div>
                            <p className="font-semibold text-xl text-white">
                                988
                            </p>
                        </div>
                        <div className="mb-2 flex text-white items-center justify-between p-2 bg-slate-500/60">
                            <div className="flex items-center gap-x-2 ">
                                <p>8</p>
                                <img
                                    src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                    alt=""
                                    className="h-10"
                                />
                                <p className="font-semibold text-xl ">
                                    Anak_baik
                                </p>
                            </div>
                            <p className="font-semibold text-xl text-white">
                                988
                            </p>
                        </div>
                    </div>
                </section>
                <section className="brightness-100  col-span-7 grid row-cols-6 ">
                    <div className="font-semibold text-xl row-span-1 flex justify-center items-center justify-between">
                        <p className="border bg-white w-fit h-fit py-2 px-20  ">
                            Trivia Ibu Kota Negara
                        </p>
                        <button className="btn me-3">Back to Home</button>
                    </div>
                    <div className="row-span-5  flex items-end justify-center pb-5">
                        <div className=" w-40 h-[44%] flex flex-col items-center bg-blue-700">
                            <img
                                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                alt=""
                                className="h-20 absolute mt-[-5rem]"
                            />
                            <p className="rounded-full bg-orange-700 mt-2 w-fit py-4 px-6 text-3xl font-bold text-white">
                                3
                            </p>
                            <p className="text-white text-xl font-semibold">
                                Anak_tiga
                            </p>
                            <p className="text-white text-xl font-semibold">
                                999
                            </p>
                        </div>
                        <div className="bg-cyan-500 shadow-lg shadow-cyan-500/50 w-40 h-[94%] flex flex-col bg-blue-700 items-center">
                            <img
                                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                alt=""
                            />
                            <p className="rounded-full bg-amber-400 mt-2 w-fit py-4 px-7 text-3xl font-bold text-white">
                                1
                            </p>
                            <p className="text-white text-xl font-semibold">
                                Anak_satu
                            </p>
                            <p className="text-white text-xl font-semibold">
                                999
                            </p>
                        </div>
                        <div className="w-40 h-[55%] flex flex-col bg-blue-700 items-center">
                            <img
                                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                alt=""
                                className="h-20 absolute mt-[-5rem]"
                            />
                            <p className="rounded-full bg-slate-400 mt-2 w-fit py-4 px-7 text-3xl font-bold text-white">
                                2
                            </p>
                            <p className="text-white text-xl font-semibold">
                                Anak_dua
                            </p>
                            <p className="text-white text-xl font-semibold">
                                999
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default FinalResult;
