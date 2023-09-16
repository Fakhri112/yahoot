import {
    Circle,
    Rhombus,
    Square,
    Triangle,
} from "@/Components/svg_component/Shape";
import { Head, Link } from "@inertiajs/react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import Swal from "sweetalert2";

const create_quiz = (props) => {
    const [pixabayData, SetPixabayData] = useState({
        image: [],
        per_page: 36,
        search: "",
    });
    const [modalIsOpen, SetModalIsOpen] = useState(false);
    const [settingIsOpen, SetSettingIsOpen] = useState(false);
    const loading = useRef(null);

    const openSetting = useCallback(() => {
        Swal.fire({
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            showCancelButton: true,
            width: "70%",
            html: `<div class='text-start'>
            <p class="text-3xl font-bold mb-2 text-start">Quiz Setting</p>
            <div class="grid grid-cols-5 grid-rows-5 h-[90%] w-full overflow-y-auto gap-x-10 gap-y-2">
                <div class="col-span-3 row-span-1 ">
                    <label htmlFor="title" class="font-semibold">
                        Title
                    </label>
                    <input
                        class="block w-full"
                        type="text"
                        id="title"
                        placeholder="Enter Quiz Title"
                    />
                </div>
                <div class="col-span-2 row-span-3 flex flex-col ">
                    <p class="font-semibold">Thumbnail</p>
                    <div class="h-full rounded-lg grid place-items-center bg-slate-300">
                        <button
                            class="btn border-none font-bold bg-blue-700 
                            text-slate-200 rounded hover:bg-blue-600 p-2"
                        >
                            Add Image
                        </button>
                    </div>
                </div>
                <div class="col-span-3 row-span-2 flex flex-col">
                    <label htmlFor="desc" class="font-semibold">
                        Description
                    </label>
                    <textarea
                        class="w-full h-full"
                        name="desc"
                        id="desc"
                    ></textarea>
                </div>
                <div class="col-span-3 row-span-1">
                    <p class="font-semibold">Save To</p>
                    <div class="flex ">
                        <input
                            class="w-full"
                            type="text"
                            id="save_to"
                        />
                        <button class="btn bg-blue-700 text-slate-200 rounded-none hover:bg-blue-600">
                            Choose
                        </button>
                    </div>
                </div>
                <div class="col-span-2 rows-span-1 flex flex-col">
                    <p class="font-semibold">Visiblity</p>
                    <div>
                        <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="private"
                        />
                        <label for="html" class="me-4">
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
            </div>`,
            customClass: {
                popup: "",
                confirmButton:
                    "btn bg-green-700 hover:bg-green-800 text-white py-1 px-2 rounded",
                cancelButton:
                    "btn bg-slate-400 hover:bg-slate-500 text-white py-1 px-2 rounded ms-2",
            },
            buttonsStyling: false,
        });
    });

    useEffect(() => {
        const getComments = async () => {
            const res = await fetch(
                "https://pixabay.com/api/?key=39472345-1f9f4091bb251e2fd5b2f1858&order=popular&per_page=18"
                // For json server use url below
                // `http://localhost:3004/comments?_page=1&_limit=20`
            );
            const data = await res.json();
            SetPixabayData({ ...pixabayData, image: data.hits });
        };

        getComments();
    }, []);

    const fetchImage = useCallback(async () => {
        let imageData = await fetch(
            "https://pixabay.com/api/?key=39472345-1f9f4091bb251e2fd5b2f1858&order=popular&per_page=" +
                pixabayData.per_page
        );
        let response = await imageData.json();
        return SetPixabayData({
            ...pixabayData,
            image: response.hits,
            per_page: pixabayData.per_page + 18,
        });
    }, [pixabayData, modalIsOpen]);

    useEffect(() => {
        const observe = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    fetchImage();
                }
            });
        });
        // observe.observe(loading.current);
    });

    return (
        <>
            <Head title={props.title} />
            <div className="h-screen overflow-hidden">
                <ReactModal
                    isOpen={modalIsOpen}
                    shouldCloseOnOverlayClick={true}
                    appElement={document.getElementById("app")}
                    onRequestClose={() => SetModalIsOpen(!modalIsOpen)}
                    className=" rounded w-[40%] h-[86%] p-3 bg-white"
                    overlayClassName="fixed inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
                >
                    <div className="h-[90%] overflow-y-auto">
                        <div className="text-center">
                            <input
                                type="text"
                                placeholder="search"
                                className="w-[80%]"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <p>
                                <b>Popular Image</b>
                            </p>
                            <p>Provided by Pixabay</p>
                        </div>
                        <hr />
                        <div>
                            <div className="grid grid-cols-3 gap-3">
                                {pixabayData.image.map((item) => {
                                    return (
                                        <img
                                            key={item.id}
                                            src={item.largeImageURL}
                                            className="col-span-1 self-stretch"
                                        />
                                    );
                                })}
                            </div>
                            {pixabayData.image.length == 0 ? null : (
                                <p
                                    ref={loading}
                                    className="text-center p-3 text-lg"
                                >
                                    Loading...
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="h-[10%]">
                        <input type="file" name="" id="label" accept="image" />
                    </div>
                </ReactModal>
                <ReactModal
                    isOpen={settingIsOpen}
                    shouldCloseOnOverlayClick={true}
                    appElement={document.getElementById("app")}
                    onRequestClose={() => SetSettingIsOpen(!settingIsOpen)}
                    className="rounded bg-white w-[70%] h-[77%] p-3"
                    overlayClassName="fixed inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
                >
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
                                <input
                                    className="w-full"
                                    type="text"
                                    id="save_to"
                                />
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
                </ReactModal>
                <nav className="shadow-md py-3 px-5 relative w-full flex justify-between items-center z-50">
                    <div className="flex items-center gap-x-5 md:gap-x-16">
                        <Link
                            href="/"
                            className="font-josefin font-semibold text-2xl text-violet-800"
                        >
                            Yahoot!
                        </Link>
                        <button className="flex justify-between items-center border-slate-300 border font-semibold text-slate-800 rounded">
                            <p className="px-3 hidden md:block">
                                Super duper quiz in the world
                            </p>
                            <p
                                onClick={openSetting}
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
                                className="shadow-lg bg-slate-200 py-2 px-3 font-semibold text-slate-800 rounded"
                            >
                                Exit
                            </Link>
                            <button className="shadow-lg bg-blue-700 py-2 px-3 font-semibold text-slate-100 rounded ms-4">
                                Save
                            </button>
                        </div>
                    </div>
                </nav>
                <ul
                    className="z-50 absolute bottom-0 border border-slate-400
                    flex items-stretch drop-shadow-2xl bg-blue-50 w-full p-3 list-decimal
                    md:fixed md:bottom-[unset] md:flex-col md:w-48 md:h-full
                    "
                >
                    <li className="ml-4">
                        <div
                            className="border border-blue-700 border 
                            flex flex-col align-items-center bg-white 
                            p-1 h-24 w-32 rounded-lg md:w-full
                            "
                        >
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
                    <button
                        className="before:content-['+'] md:before:content-['Add_Quiz'] ml-2 h-auto cursor-pointer 
                        btn bg-blue-700 hover:bg-blue-400 py-1 z-10 text-white 
                        md:w-full md:mt-2 md:ml-0"
                        onClick={() => SetModalIsOpen(!modalIsOpen)}
                    ></button>
                </ul>

                <main className="h-[92%]">
                    <div className="h-full overflow-auto ml-0 md:ml-48 bg-blue-300 flex flex-col items-center justify-between p-4">
                        <input
                            className="w-full drop-shadow-lg border-none text-center self-stretch"
                            type="text"
                            placeholder="Enter Title"
                        />
                        <div className="flex justify-between items-start w-full my-[5vh]">
                            <div className="flex flex-col">
                                <div className="dropdown dropdown-bottom ">
                                    <label
                                        tabIndex={0}
                                        className="btn rounded font-bold text-2xl"
                                    >
                                        &#8942;
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 absolute w-52 mt-2"
                                    >
                                        <li>
                                            <a>Duplicate</a>
                                        </li>
                                        <li>
                                            <a>Delete</a>
                                        </li>
                                    </ul>
                                </div>
                                <select className="select invisible">
                                    <option disabled selected>
                                        Duration
                                    </option>
                                </select>
                            </div>
                            <div className="w-[50vh] h-[32vh] grid place-items-center bg-slate-400 drop-shadow-md rounded">
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

                        <div className="self-stretch grid grid-cols-2 gap-3 mb-36 md:mb-2">
                            <div className="rounded flex self-start items-center h-[19vh] py-2 bg-slate-100 drop-shadow-md">
                                <div className="rounded self-stretch flex items-center bg-red-700 mx-2">
                                    <Triangle className="p-1 h-10 fill-white"></Triangle>
                                </div>
                                <input
                                    className="font-semibold border-0 w-full self-center"
                                    type="text"
                                    placeholder="Add Question"
                                />
                            </div>
                            <div className="border rounded flex self-start items-center h-[19vh] py-2 bg-slate-100 drop-shadow-md">
                                <div className="rounded self-stretch flex items-center bg-sky-700 mx-2">
                                    <Rhombus className="p-1 h-10 fill-white"></Rhombus>
                                </div>
                                <input
                                    className="font-semibold border-0 w-full self-center"
                                    type="text"
                                    placeholder="Add Question"
                                />
                            </div>
                            <div className="border rounded flex self-start items-center h-[19vh] py-2 bg-slate-100 drop-shadow-md">
                                <div className="rounded self-stretch flex items-center bg-amber-600 mx-2">
                                    <Circle className="p-1 h-10 fill-white"></Circle>
                                </div>
                                <input
                                    className="font-semibold border-0 w-full self-center"
                                    type="text"
                                    placeholder="Add Question"
                                />
                            </div>
                            <div className="border rounded flex self-start items-center h-[19vh] py-2 bg-slate-100 drop-shadow-md">
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
