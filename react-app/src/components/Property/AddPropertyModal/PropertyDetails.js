import React from 'react';

const PropertyDetails = ({ formData, handleChange }) => (
  <div>
    <h2>Property Details</h2>
    <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
    <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Type" required />
    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
    <input type="text" name="listing_id" value={formData.listing_id} onChange={handleChange} placeholder="Listing ID" required />
    <input type="date" name="listing_date" value={formData.listing_date} onChange={handleChange} placeholder="Listing Date" required />
    <input type="number" name="built" value={formData.built} onChange={handleChange} placeholder="Built Year" required />
    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
  </div>
);

export default PropertyDetails;