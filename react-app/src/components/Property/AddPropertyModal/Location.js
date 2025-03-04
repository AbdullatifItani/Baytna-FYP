import React from 'react';

const Location = ({ formData, handleChange }) => (
  <div>
    <h2>Location</h2>
    <input type="number" name="lat" value={formData.lat} onChange={handleChange} placeholder="Latitude" required />
    <input type="number" name="long" value={formData.long} onChange={handleChange} placeholder="Longitude" required />
  </div>
);

export default Location;