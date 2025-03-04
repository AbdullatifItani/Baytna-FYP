import React from 'react';

const Images = ({ formData, handleChange }) => (
  <div>
    <h2>Images</h2>
    <input type="text" name="front_img" value={formData.front_img} onChange={handleChange} placeholder="Front Image URL" />
  </div>
);

export default Images;