import axios from "axios";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import upload from "../../../assets/profile/upload_photo.svg";
import * as sessionActions from "../../../store/session";
//export const BASE_URL = "http://localhost:5000";
export const BASE_URL = "http://127.0.0.1:5000";

const UploadPhoto = () => {
    const dispatch = useDispatch();

    const agent = useSelector((state) => state.session.user);

    const [photo, setPhoto] = useState(null);
    const [photoLoading, setPhotoLoading] = useState(false);
    const [src, setSrc] = useState("");
    const [errors, setErrors] = useState([]);

    const inputRef = useRef();

    const submitPhoto = async () => {
        const formData = new FormData();
        formData.append("image", photo);

        setPhotoLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/photo`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true, // Include credentials if needed
            });

            const url = response.data;

            if (response.status === 200) {
                setPhotoLoading(false);
                // Dispatch to update URL
                dispatch(sessionActions.uploadPhoto(url));
                setSrc("");
            }
        } catch (error) {
            setPhotoLoading(false);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors(["Something went wrong. Please try again."]);
            }
        }
    };

    const updatePhoto = async (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        if (file) {
            setSrc(URL.createObjectURL(file));
        }
    };

    const cancel = () => {
        setPhoto(null);
        setSrc("");
        inputRef.current.value = "";
    };

    if (agent.photo) {
        return (
            <>
                <div
                    className="agent-profile-photo"
                    style={{ backgroundImage: `url("${agent.photo}")` }}
                    onClick={() => {
                        inputRef.current.click();
                    }}
                >
                    Upload Photo
                    {src && (
                        <img className="profile-upload-preview" src={src} alt="Upload" />
                    )}
                </div>
                <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={updatePhoto}
                    ref={inputRef}
                />
                {src && (
                    <div className="btn-wrap">
                        <button className="btn btn-bl" type="button" onClick={cancel}>
                            Cancel
                        </button>
                        <button className="btn" type="button" onClick={submitPhoto}>
                            Upload
                        </button>
                    </div>
                )}
                {photoLoading && <div>Loading...</div>}
                {errors && (
                    <div className="error-list">
                        {errors.map((err, idx) => (
                            <div key={idx}>{err}</div>
                        ))}
                    </div>
                )}
            </>
        );
    } else {
        return (
            <>
                <div
                    className="agent-profile-no-photo"
                    onClick={() => inputRef.current.click()}
                >
                    No Photo
                    {src && (
                        <img className="profile-upload-preview" src={src} alt="Upload" />
                    )}
                </div>
                <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={updatePhoto}
                    ref={inputRef}
                />
                {src && (
                    <div className="btn-wrap">
                        <button className="btn btn-bl" type="button" onClick={cancel}>
                            Cancel
                        </button>
                        <button className="btn" type="button" onClick={submitPhoto}>
                            Upload
                        </button>
                    </div>
                )}
                {photoLoading && <div>Loading...</div>}
            </>
        );
    }
};

export default UploadPhoto;