import React, { useState } from 'react';
import UploadImage from '../UploadImage';

const Images = ({ handleImageUpload }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onUploadSuccess = (url) => {
    setError("");
    setSuccess("Image uploaded successfully.");
    handleImageUpload(url);
  };

  const onUploadError = () => {
    setSuccess(""); 
    setError("Image upload failed. Please try again.");
  };

  return (
    <div className="images-step">
      <h2>Upload Front Image</h2>
      <UploadImage onUpload={onUploadSuccess} onError={onUploadError} />
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Images;