import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import axios from "axios";
import getCroppedImg from './utils/getCroppedImg';

function AvatarUploader({ onUploadSuccess }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [uploading, setUploading] = useState(false);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        setUploading(true);
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            const formData = new FormData();
            formData.append("avatar", croppedImage, "avatar.jpg");

            const res = await axios.post("/api/user/upload-avatar", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (onUploadSuccess) onUploadSuccess(res.data);
            alert("Image enregistrée !");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'enregistrement.");
        }
        setUploading(false);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {imageSrc && (
                <div style={{ position: "relative", width: 300, height: 300 }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
            )}

            {imageSrc && (
                <button onClick={handleUpload} disabled={uploading}>
                    {uploading ? "Envoi..." : "Enregistrer l'image"}
                </button>
            )}
        </div>
    );
}

export default AvatarUploader;
