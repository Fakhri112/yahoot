import {
    Circle,
    Rhombus,
    Square,
    Triangle,
} from "@/Components/svg_component/Shape";

const create_quiz = (props) => {
    return (
        <>
            <div className="h-screen overflow-hidden">
                <nav className="shadow-md py-3 px-5 relative w-full flex justify-between items-center">
                    <div className="flex items-center gap-x-16">
                        <h4 className="font-josefin font-semibold text-2xl text-violet-800">
                            Yahoot!
                        </h4>
                        <button className="flex justify-between items-center border-slate-300 border font-semibold text-slate-800 rounded">
                            <p className="px-3">
                                Super duper quiz in the world
                            </p>
                            <p className="bg-slate-300 px-3 py-2">Setting</p>
                        </button>
                    </div>
                    <div className="flex items-center gap-x-10">
                        <div>
                            <button className="shadow-lg bg-slate-200 py-2 px-3 font-semibold text-slate-800 rounded">
                                Exit
                            </button>
                            <button className="shadow-lg bg-blue-700 py-2 px-3 font-semibold text-slate-100 rounded ms-4">
                                Save
                            </button>
                        </div>
                    </div>
                </nav>
                <ul className="-z-50 drop-shadow-2xl bg-blue-50 h-full w-48 fixed p-3 list-decimal">
                    <li className="ml-4">
                        <div className="border border-blue-700 border-2 flex flex-col align-items-center bg-white p-1 h-24 rounded-lg">
                            <p className="font-xs font-semibold text-slate-700 pb-3 text-center whitespace-nowrap text-ellipsis overflow-hidden">
                                Halo world sdadadadad
                            </p>
                            <div className="flex items-center gap-x-6 mb-2 mt-2">
                                <p className="rounded-full rounded border border-2 border-slate-300 px-1 text-slate-300">
                                    20
                                </p>
                                <svg
                                    className="fill-slate-300 text-center"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                                </svg>
                            </div>
                            <div className="grid grid-rows-2 grid-cols-2 gap-0.5 h-full">
                                <div className="bg-green-700 rounded"></div>
                                <div className="border border-slate-400 rounded"></div>
                                <div className="border border-slate-400 rounded"></div>
                                <div className="border border-slate-400 rounded"></div>
                            </div>
                        </div>
                    </li>
                </ul>
                <main className="h-[92%] ">
                    <div className="h-full overflow-auto ml-48  bg-blue-300 flex flex-col items-center justify-between p-4">
                        <input
                            className="w-full drop-shadow-lg border-none text-center self-stretch"
                            type="text"
                        />
                        <div className="flex justify-between items-center w-full my-[5vh]">
                            <select className="select invisible">
                                <option disabled selected>
                                    Duration
                                </option>
                            </select>
                            <div className="w-[50vh] h-[30vh] grid place-items-center bg-slate-400 drop-shadow-md rounded">
                                <button className="text-4xl bg-white px-2 drop-shadow-lg font-josefin">
                                    +
                                </button>
                            </div>
                            <select className="select">
                                <option disabled selected>
                                    Duration
                                </option>
                                <option>20 Sec</option>
                                <option>15 Sec</option>
                                <option>10 Sec</option>
                            </select>
                        </div>

                        <div className="self-stretch grid grid-cols-2 gap-3">
                            <div className="rounded flex self-start items-center h-32 py-2 bg-slate-100 drop-shadow-md">
                                <div className="rounded self-stretch flex items-center bg-red-700 mx-2">
                                    <Triangle className="p-1 h-10 fill-white"></Triangle>
                                </div>
                                <input
                                    className="font-semibold border-0 w-full self-center"
                                    type="text"
                                    placeholder="Add Question"
                                />
                            </div>
                            <div className="border rounded flex self-start items-center h-32 py-2 bg-slate-100 drop-shadow-md">
                                <div className="rounded self-stretch flex items-center bg-sky-700 mx-2">
                                    <Rhombus className="p-1 h-10 fill-white"></Rhombus>
                                </div>
                                <input
                                    className="font-semibold border-0 w-full self-center"
                                    type="text"
                                    placeholder="Add Question"
                                />
                            </div>
                            <div className="border rounded flex self-start items-center h-32 py-2 bg-slate-100 drop-shadow-md">
                                <div className="rounded self-stretch flex items-center bg-amber-600 mx-2">
                                    <Circle className="p-1 h-10 fill-white"></Circle>
                                </div>
                                <input
                                    className="font-semibold border-0 w-full self-center"
                                    type="text"
                                    placeholder="Add Question"
                                />
                            </div>
                            <div className="border rounded flex self-start items-center h-32 py-2 bg-slate-100 drop-shadow-md">
                                <div className="rounded self-stretch flex items-center bg-green-700 mx-2">
                                    <Square className="p-1 h-10 fill-white"></Square>
                                </div>
                                <input
                                    className="font-semibold border-0 w-full self-center"
                                    type="text"
                                    placeholder="Add Question"
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default create_quiz;
