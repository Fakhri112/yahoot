import React from "react";

const WaitingRoom = () => {
    return (
        <div>
            <main
                className="bg-[url('https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]
                h-screen bg-cover grid grid-cols-12
            "
            >
                <div class="absolute inset-0 bg-black opacity-50"></div>
                <section className="col-span-3  brightness-100 p-4 flex flex-col justify-center">
                    <div className="bg-white p-1 rotate-2 animate-jump-in animate-delay-300 animate-once">
                        <p className="text-4xl font-bold text-black ">
                            Game PIN
                        </p>
                        <p className="text-2xl">934224</p>
                    </div>
                    <div className="flex gap-x-2 mt-2">
                        <button className="bg-white rounded px-2 py-1 font-semibold">
                            Lock
                        </button>
                        <button className="bg-blue-700 text-white flex-1 rounded px-2 py-1 font-semibold">
                            Start
                        </button>
                    </div>
                </section>
                <section className="brightness-100 col-span-8 grid grid-cols-5 p-4 grid-rows-6">
                    <div>
                        <button className="bg-purple-600 rotate-1 items-center flex">
                            <img
                                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                alt="avatar"
                                className="h-10"
                            />
                            <p className="text-white mx-2">Dimas Adriandi</p>
                        </button>
                    </div>
                    <div className="flex self-start justify-center ">
                        <button className="bg-purple-600 rotate-1 items-center flex">
                            <img
                                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                alt="avatar"
                                className="h-10"
                            />
                            <p className="text-white mx-2">Sofyan</p>
                        </button>
                    </div>
                    <div className="flex self-start justify-center">
                        <button className="bg-purple-600 rotate-1 items-center flex">
                            <img
                                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                alt="avatar"
                                className="h-10"
                            />
                            <p className="text-white mx-2">Yamamoto</p>
                        </button>
                    </div>
                    <div className="flex self-start justify-center">
                        <button className="bg-purple-600 rotate-1 items-center flex">
                            <img
                                src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Mimi"
                                alt="avatar"
                                className="h-10"
                            />
                            <p className="text-white mx-2">Dimas Adriandi</p>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default WaitingRoom;
