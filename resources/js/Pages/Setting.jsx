import React, { useState } from "react";
import ProfileSidebar from "@/Components/ProfileSidebar";
import NavBar from "@/Components/NavBar";
import { useForm, usePage } from "@inertiajs/react";
import "rc-slider/assets/index.css";
import ImageCropper from "@/Components/ImageCropper";

const CROPPER_SETTING = {
    selectedImage: "",
    cropModal: false,
    croppedImage: data.profile_pic,
    cropShape: "round",
    ratio: 1 / 1,
};

const Setting = ({ auth, mustVerifyEmail, status }) => {
    const user = usePage().props.auth.user;
    const { data, setData, post } = useForm({
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
    });
    const [CropperComponent, SetCropperComponent] = useState(CROPPER_SETTING);

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
            <div className="h-screen bg-white overflow-hidden">
                <NavBar />
                <ProfileSidebar />
                <ImageCropper
                    {...CropperComponent}
                    SetCroppedImage={(state) =>
                        SetCropperComponent({
                            ...CropperComponent,
                            croppedImage: state.image_link,
                            cropModal: !CropperComponent.cropModal,
                        })
                    }
                    SetImageFile={(state) => setData("profile_pic", state)}
                />
                <main className="pb-24 md:ml-24 h-[calc(100vh)] bg-slate-50 p-2">
                    <div className=" h-full p-2 text-slate-800 overflow-auto ">
                        <h1 className="text-3xl font-semibold">Setting</h1>
                        <div className="grid grid-cols-1 gap-y-5 mt-4 md:gap-x-7 ">
                            <form
                                onSubmit={submit}
                                className="bg-white rounded drop-shadow-md"
                                encType="multipart/form-data"
                            >
                                <div className="flex justify-between px-3 py-2 items-center">
                                    <p className="text-lg font-semibold">
                                        User Information
                                    </p>
                                    <button className="px-6 py-2 btn-success">
                                        Save
                                    </button>
                                </div>
                                <hr className="my-2 border-slate-200" />
                                <div className="flex gap-x-9 md:w-8/12 px-3 py-2 pb-7">
                                    {CropperComponent.croppedImage ? null : (
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
                                        className="relative w-32 h-32 border border-slate-400 rounded-full 
                                        grid place-items-center hover:bg-blue-400 hover:cursor-pointer z-10
                                        "
                                        onMouseUp={() =>
                                            SetCropperComponent({
                                                ...CropperComponent,
                                                croppedImage: "",
                                            })
                                        }
                                    >
                                        {CropperComponent.croppedImage ? (
                                            <div>
                                                <div
                                                    className="hover:after:content-['Remove_Image'] hover:after:text-white hover:after:text-center
                                                    w-32 h-32 hover:bg-blue-700/75 rounded-full absolute after:absolute after:top-1/2 after:left-1/2 
                                                    after:transform after:-translate-x-1/2 after:-translate-y-1/2 "
                                                ></div>
                                                <img
                                                    src={
                                                        CropperComponent.croppedImage
                                                    }
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
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                            isFocused
                                            autoComplete="name"
                                            className="h-8 rounded border-slate-400"
                                            type="text"
                                            name=""
                                            id="name"
                                        />
                                        <label htmlFor="Email">
                                            <b>Email</b>
                                        </label>
                                        <input
                                            className="h-8 rounded border-slate-400"
                                            type="email"
                                            name=""
                                            id="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                            autoComplete="username"
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className="bg-white rounded drop-shadow-lg">
                                <div className="flex justify-between px-3 py-2">
                                    <p className="text-lg font-semibold">
                                        Change Password
                                    </p>
                                </div>
                                <hr className="my-2 border-slate-200" />
                                <div className="flex flex-col shrink-0 gap-y-2 p-3 px-3 md:w-8/12 flex-1 shrink">
                                    <label htmlFor="old_pw">
                                        <b>Old Password</b>
                                    </label>
                                    <input
                                        className="h-8 rounded border-slate-400"
                                        type="password"
                                        name=""
                                        id="old_pw"
                                    />
                                    <div className="flex gap-x-4 align-self">
                                        <div className="grow">
                                            <label htmlFor="new_pw">
                                                <b>New Password</b>
                                            </label>
                                            <input
                                                className="h-8 rounded border-slate-400 w-full"
                                                type="password"
                                                name=""
                                                id="new_pw"
                                            />
                                        </div>
                                        <div className="grow">
                                            <label htmlFor="re_new_pw">
                                                <b>Retype New Password</b>
                                            </label>
                                            <input
                                                className="h-8 rounded border-slate-400 w-full"
                                                type="password"
                                                name=""
                                                id="re_new_pw"
                                            />
                                        </div>
                                    </div>
                                    <button className="btn-success self-start py-2 px-5 mt-2">
                                        Save
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white rounded drop-shadow-lg mb-4">
                                <div className="flex justify-between px-3 py-2">
                                    <p className="text-lg font-semibold">
                                        Delete Account
                                    </p>
                                </div>
                                <hr className="my-2 border-slate-200" />
                                <div className="flex flex-col shrink-0 gap-y-2 p-3 px-3 md:w-8/12 flex-1 shrink">
                                    <p>
                                        Once your account is deleted, all of its
                                        resources and data will be permanently
                                        deleted. Before deleting your account,
                                        please download any data or information
                                        that you wish to retain.
                                    </p>
                                    <button className="btn-danger self-start py-2 px-5 mt-2">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Setting;
