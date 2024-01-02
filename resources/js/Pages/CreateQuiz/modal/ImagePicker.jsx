import ImageCropper from "@/Components/ImageCropper";
import {
    useCreateQuizDispatch,
    useCreateQuizState,
} from "@/Components/context/CreateQuizContext";
import React, { useCallback, useEffect } from "react";
import ReactModal from "react-modal";
export const ImagePicker = () => {
    const dispatch = useCreateQuizDispatch();
    const {
        modal,
        pixabaySetting,
        cropperCompSetting,
        questionData,
        quizSetting,
        selectedQuestion,
    } = useCreateQuizState();

    useEffect(() => {
        const getImage = async () => {
            const res = await fetch(
                "https://pixabay.com/api/?key=39472345-1f9f4091bb251e2fd5b2f1858&order=popular&per_page=18" +
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
            "https://pixabay.com/api/?key=39472345-1f9f4091bb251e2fd5b2f1858&order=popular&per_page=" +
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
        const targetElement = document.getElementById(
            pixabaySetting.intersectionIdName
        );
        if (targetElement) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        fetchImage();
                    }
                });
            });
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
        return dispatch({
            type: "UPDATE_PIXABAY_SETTING",
            payload: {
                ...pixabaySetting,
                intersectionIdName: "loading",
                search: "",
                forThumbnail: false,
                loadedCount: 0,
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
        return { toggleImagePicker, toggleSetting };
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
                    thumbnail: state.image_link,
                    thumbnail_file: state.image_file,
                },
            });
        else
            for (let index = 0; index < QuestionCopy.length; index++) {
                if (selectedQuestion === QuestionCopy[index].id) {
                    (QuestionCopy[index].image_link = state.image_link),
                        (QuestionCopy[index].image_file = state.image_file);
                }
            }
        dispatch({ type: "UPDATE_QUESTION_DATA", payload: [...QuestionCopy] });
        dispatch({
            type: "UPDATE_PIXABAY_SETTING",
            payload: {
                ...pixabaySetting,
                forThumbnail: false,
                loadedCount: 0,
            },
        });
        dispatch({
            type: "UPDATE_CROPPER_COMP_SETTING",
            payload: { ...cropperCompSetting, cropModal: false },
        });
    };

    return (
        <>
            <ImageCropper
                {...cropperCompSetting}
                SetCroppedImage={handleSetCropImage}
            ></ImageCropper>
            <ReactModal
                isOpen={modal.image_picker}
                shouldCloseOnOverlayClick={true}
                onRequestClose={handleModal().toggleSetting}
                appElement={document.getElementById("app")}
                className="relative rounded w-[40%] min-w-[400px] h-[86%] p-3 bg-white flex flex-col"
                overlayClassName="absolute inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
            >
                <div className="h-full overflow-y-auto">
                    <div className="text-center">
                        <input
                            onChange={(e) =>
                                dispatch({
                                    type: "UPDATE_PIXABAY_SETTING",
                                    payload: {
                                        ...pixabaySetting,
                                        image: [],
                                        search: e.target.value,
                                        loadedCount: 0,
                                    },
                                })
                            }
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
                        <div className="grid md:grid-cols-3 gap-3">
                            {pixabaySetting.image.map((item) => {
                                return (
                                    <img
                                        key={item.id}
                                        src={item.largeImageURL}
                                        className="col-span-1 self-stretch cursor-pointer"
                                        onLoad={() =>
                                            dispatch({
                                                type: "UPDATE_PIXABAY_SETTING",
                                                payload: {
                                                    ...pixabaySetting,
                                                    loadedCount:
                                                        pixabaySetting.loadedCount +
                                                        1,
                                                },
                                            })
                                        }
                                        onClick={chooseImage}
                                    />
                                );
                            })}
                        </div>
                        {pixabaySetting.loadedCount > 9 ? (
                            <p
                                id={pixabaySetting.intersectionIdName}
                                className="text-center p-3 text-lg"
                            >
                                Loading...
                            </p>
                        ) : null}
                    </div>
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
