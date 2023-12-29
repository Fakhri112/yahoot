import getCroppedImg from "@/Lib/croppedImage";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import ReactModal from "react-modal";

const ImageCropper = ({
    selectedImage,
    cropModal,
    cropShape,
    ratio,
    SetCropModal,
    SetCroppedImage,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(
                selectedImage,
                croppedAreaPixels,
                0
            );

            const file = await fetch(croppedImage)
                .then((res) => res.blob())
                .then(
                    (blob) =>
                        new File([blob], "uploadedFile.jpg", {
                            type: "image/jpeg",
                        })
                );

            SetCroppedImage({ image_file: file, image_link: croppedImage });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <ReactModal
                isOpen={cropModal}
                shouldCloseOnOverlayClick={true}
                appElement={document.getElementById("app")}
                onRequestClose={() => SetCropModal(!cropModal)}
                className="rounded bg-white w-[70%] h-[77%] p-3"
                overlayClassName="fixed border border-blue-800 inset-0 bg-slate-900 bg-opacity-30 z-[60] flex items-center justify-center"
            >
                <div className="w-full h-[90%] border border-red-900">
                    <div className="relative w-full h-full">
                        <Cropper
                            image={selectedImage}
                            crop={crop}
                            zoom={zoom}
                            cropShape={cropShape}
                            aspect={ratio}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                </div>
                <div className="gap-x-2 flex py-2">
                    <input
                        type="range"
                        name=""
                        id=""
                        defaultValue={1}
                        min={1}
                        max={3}
                        step={0.1}
                        className="grow"
                        onChange={(e) => setZoom(e.target.value)}
                    />
                    <button
                        className=" btn-primary py-2 px-3"
                        onClick={showCroppedImage}
                    >
                        Set Image
                    </button>
                </div>
            </ReactModal>
        </>
    );
};

export default ImageCropper;
