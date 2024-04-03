import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import ImageCropper from "@/Components/ImageCropper";

const UserData = () => {
    const user = usePage().props.auth.user;
    const { data, setData, post, errors } = useForm({
        name: user.name,
        email: user.email,
        profile_pic: "",
    });
    const [CropperComponent, SetCropperComponent] = useState({
        selectedImage: "",
        cropModal: false,
        cropShape: "round",
        ratio: 1 / 1,
    });

    useEffect(() => {
        setData("profile_pic", user.profile_pic);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update"), data);
    };

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            SetCropperComponent({
                ...CropperComponent,
                selectedImage: reader.result,
                cropModal: !CropperComponent.cropModal,
            });
        };
        reader.readAsDataURL(files[0]);
    };

    return (
        <>
            <ImageCropper
                {...CropperComponent}
                SetCroppedImage={(state) => {
                    SetCropperComponent({
                        ...CropperComponent,
                        cropModal: !CropperComponent.cropModal,
                    });
                    setData("profile_pic", state.image);
                }}
                SetCropModal={(state) => {
                    SetCropperComponent({
                        ...CropperComponent,
                        cropModal: !CropperComponent.cropModal,
                    });
                }}
            />
            <form
                onSubmit={submit}
                className="bg-white rounded drop-shadow-md"
                encType="multipart/form-data"
            >
                <div className="flex justify-between px-3 py-2 items-center">
                    <p className="text-lg font-semibold">User Information</p>
                    <button className="px-5 py-2 btn-success">Save</button>
                </div>
                <hr className="my-2 border-slate-200" />
                <div className="flex gap-x-9 md:w-8/12 px-3 py-2 pb-7">
                    {data.profile_pic ? null : (
                        <input
                            type="file"
                            id="inputProfile"
                            className="hidden"
                            name="profile_pic"
                            onChange={onChange}
                        />
                    )}

                    <label
                        htmlFor="inputProfile"
                        className="relative w-32 h-32 md:border border-slate-400 rounded-full 
                                        grid place-items-center hover:bg-blue-400 hover:cursor-pointer z-10
                                        "
                        onMouseUp={() => setData("profile_pic", "")}
                    >
                        {data.profile_pic ? (
                            <div>
                                <div
                                    className="hover:after:content-['Remove_Image'] hover:after:text-white hover:after:text-center
                                                    w-32 h-32 hover:bg-blue-700/75 rounded-full absolute after:absolute after:top-1/2 after:left-1/2 
                                                    after:transform after:-translate-x-1/2 after:-translate-y-1/2 "
                                ></div>
                                <img
                                    src={data.profile_pic}
                                    alt=""
                                    className="rounded-full z-50"
                                />
                            </div>
                        ) : (
                            "Add Image"
                        )}
                    </label>

                    <div className="flex flex-col shrink-0 gap-y-2 flex-1 shrink">
                        <label htmlFor="Username">
                            <b>Username</b>
                        </label>
                        <input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoComplete="name"
                            className="h-8 rounded border-slate-400"
                            type="text"
                            name=""
                            id="name"
                        />
                        <p className="text-sm text-red-800">{errors.name}</p>
                        <label htmlFor="Email">
                            <b>Email</b>
                        </label>
                        <input
                            className="h-8 rounded border-slate-400"
                            type="email"
                            name=""
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <p className="text-sm text-red-800">{errors.email}</p>
                    </div>
                </div>
            </form>
        </>
    );
};

export default UserData;
