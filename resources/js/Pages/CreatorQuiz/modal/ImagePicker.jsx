import ImageCropper from "@/Components/ImageCropper";
import {
    useCreatorQuizDispatch,
    useCreatorQuizState,
} from "@/Components/context/CreatorQuizContext";
import { Spinner } from "@/Components/svg/Spinner";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
export const ImagePicker = () => {
    const dispatch = useCreatorQuizDispatch();
    const {
        modal,
        pixabaySetting,
        cropperCompSetting,
        questionData,
        quizSetting,
        selectedQuestion,
    } = useCreatorQuizState();
    const [showMore, SetShowMore] = useState(false);
    const showMoreRef = useRef();
    const imageContainerRef = useRef();
    let timeoutId;

    useEffect(() => {
        const getImage = async () => {
            const res = await fetch(
                "https://pixabay.com/api/?key=39472345-1f9f4091bb251e2fd5b2f1858&orientation=horizontal&order=popular&per_page=18" +
                    `&q=${encodeURIComponent(pixabaySetting.search)}`
            );
            const data = await res.json();
            dispatch({
                type: "UPDATE_PIXABAY_SETTING",
                payload: { ...pixabaySetting, image: data.hits },
            });
        };

        getImage();
    }, [modal.image_picker, pixabaySetting.search]);

    const fetchImage = useCallback(async () => {
        let imageData = await fetch(
            "https://pixabay.com/api/?key=39472345-1f9f4091bb251e2fd5b2f1858&orientation=horizontal&order=popular&per_page=" +
                pixabaySetting.per_page +
                `&q=${encodeURIComponent(pixabaySetting.search)}`
        );

        let response = await imageData.json();

        return dispatch({
            type: "UPDATE_PIXABAY_SETTING",
            payload: {
                ...pixabaySetting,
                image: response.hits,
                per_page: pixabaySetting.per_page + 9,
            },
        });
    }, [modal.image_picker, pixabaySetting]);

    useEffect(() => {
        const targetElement = showMoreRef.current;
        if (targetElement) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            fetchImage();
                        }
                    });
                },
                { threshold: 0.5 }
            );
            observer.observe(targetElement);
            return () => {
                observer.unobserve(targetElement);
            };
        }
    });

    useEffect(() => {
        if (modal.image_picker)
            return dispatch({
                type: "UPDATE_PIXABAY_SETTING",
                payload: {
                    ...pixabaySetting,
                    intersectionIdName: "loading-true",
                },
            });
        SetShowMore(false);
        return dispatch({
            type: "UPDATE_PIXABAY_SETTING",
            payload: {
                ...pixabaySetting,
                intersectionIdName: "loading",
                search: "",
                forThumbnail: false,
            },
        });
    }, [modal.image_picker]);

    const chooseImage = (e) => {
        dispatch({
            type: "UPDATE_CROPPER_COMP_SETTING",
            payload: {
                ...cropperCompSetting,
                selectedImage: e.target.src,
                cropModal: !cropperCompSetting.cropModal,
            },
        });
        SetShowMore(false);
        dispatch({
            type: "UPDATE_PIXABAY_SETTING",
            payload: {
                ...pixabaySetting,
                intersectionIdName: "loading",
                search: "",
            },
        });

        handleModal().toggleImagePicker();
    };

    const handleModal = (e) => {
        const toggleSetting = () => {
            return dispatch({
                type: "UPDATE_MODAL",
                payload: { ...modal, setting: !modal.setting },
            });
        };
        const toggleImagePicker = () => {
            return dispatch({
                type: "UPDATE_MODAL",
                payload: {
                    ...modal,
                    image_picker: !modal.image_picker,
                },
            });
        };
        const toggleImageCropper = () => {
            return dispatch({
                type: "UPDATE_CROPPER_COMP_SETTING",
                payload: { ...cropperCompSetting, cropModal: false },
            });
        };
        return { toggleImagePicker, toggleSetting, toggleImageCropper };
    };

    const handleImageUpload = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            dispatch({
                type: "UPDATE_CROPPER_COMP_SETTING",
                payload: {
                    ...cropperCompSetting,
                    selectedImage: reader.result,
                    cropModal: !cropperCompSetting.cropModal,
                },
            });
        };
        reader.readAsDataURL(files[0]);
        handleModal().toggleImagePicker();
    };

    const handleSetCropImage = (state) => {
        const QuestionCopy = JSON.parse(JSON.stringify(questionData));
        if (pixabaySetting.forThumbnail)
            dispatch({
                type: "UPDATE_QUIZ_SETTING",
                payload: {
                    ...quizSetting,
                    thumbnail: state.image,
                    // thumbnail_file: state.image_file,
                },
            });
        if (!pixabaySetting.forThumbnail) {
            for (let index = 0; index < QuestionCopy.length; index++) {
                if (selectedQuestion === QuestionCopy[index].id) {
                    QuestionCopy[index].image_file = state.image;
                    // (QuestionCopy[index].image_file = state.image_file);
                }
            }
        }

        dispatch({ type: "UPDATE_QUESTION_DATA", payload: [...QuestionCopy] });
        SetShowMore(false);
        dispatch({
            type: "UPDATE_PIXABAY_SETTING",
            payload: {
                ...pixabaySetting,
                forThumbnail: false,
            },
        });
        handleModal().toggleImageCropper();
    };

    const handleSearch = (e) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            SetShowMore(false);
            dispatch({
                type: "UPDATE_PIXABAY_SETTING",
                payload: {
                    ...pixabaySetting,
                    image: [],
                    search: e.target.value,
                },
            });
        }, 700);
    };

    return (
        <>
            <ImageCropper
                {...cropperCompSetting}
                SetCroppedImage={handleSetCropImage}
                SetCropModal={handleModal().toggleImageCropper}
            ></ImageCropper>
            <ReactModal
                isOpen={modal.image_picker}
                shouldCloseOnOverlayClick={true}
                onRequestClose={handleModal().toggleImagePicker}
                appElement={document.getElementById("app")}
                className="relative rounded w-[40%] min-w-[400px] h-[86%] p-3 bg-white flex flex-col"
                overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
            >
                <div className="text-center">
                    <input
                        onChange={handleSearch}
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
                <div
                    className="overflow-y-auto h-full"
                    ref={imageContainerRef}
                    onScroll={() => {
                        if (
                            imageContainerRef.current.scrollHeight <=
                                imageContainerRef.current.offsetHeight ||
                            showMore
                        )
                            return;
                        SetShowMore(true);
                    }}
                >
                    <div
                        className={`grid md:grid-cols-3 gap-3 ${
                            pixabaySetting.image.length == 0 ? "h-full" : ""
                        }`}
                    >
                        {pixabaySetting.image.length == 0 ? (
                            <div className="h-full  grid place-items-center col-span-3 ">
                                <Spinner />
                            </div>
                        ) : (
                            pixabaySetting.image.map((item) => {
                                return (
                                    <img
                                        key={item.id}
                                        src={item.largeImageURL}
                                        className="col-span-1 self-stretch cursor-pointer"
                                        onClick={chooseImage}
                                    />
                                );
                            })
                        )}
                    </div>
                    {showMore ? (
                        <p
                            ref={showMoreRef}
                            className="flex justify-center w-full p-3 text-lg"
                        >
                            <Spinner />
                        </p>
                    ) : null}
                </div>

                <div className="h-[10%] pt-4">
                    <input
                        className="hidden mt-4"
                        type="file"
                        id="imageUpload"
                        accept="image"
                        onChange={handleImageUpload}
                    />
                    <label
                        htmlFor="imageUpload"
                        className=" btn-primary px-2 py-2"
                    >
                        Upload Image
                    </label>
                </div>
            </ReactModal>
        </>
    );
};
