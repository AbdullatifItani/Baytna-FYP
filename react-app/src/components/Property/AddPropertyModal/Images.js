import React from 'react';
import UploadImage from '../UploadImage';

const Images = ({ formData, handleChange, handleImageUpload }) => (
  <div>
    <h2>Images</h2>
    <input type="text" 
    name="front_img" 
    value={formData.front_img} 
    onChange={handleChange} 
    placeholder="Front Image URL" 
    />
    <UploadImage onUpload={handleImageUpload} />
  </div>
);

export default Images;