import React from 'react';

const Features = ({ formData, handleChange }) => (
  <div>
    <h2>Features</h2>
    <input type="number" name="bed" value={formData.bed} onChange={handleChange} placeholder="Bedrooms" required />
    <input type="number" name="bath" value={formData.bath} onChange={handleChange} placeholder="Bathrooms" required />
    <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} placeholder="Square Footage" required />
    <input type="number" name="lot" value={formData.lot} onChange={handleChange} placeholder="Lot Size" required />
    <input type="number" name="garage" value={formData.garage} onChange={handleChange} placeholder="Garage" required />
  </div>
);

export default Features;