import React from 'react';

const AddressInformation = ({ formData, handleChange }) => (
  <div>
    <h2>Address Information</h2>
    <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Street" required />
    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
    <input type="text" name="state_id" value={formData.state_id} onChange={handleChange} placeholder="State" required />
    <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Zip Code" required />
  </div>
);

export default AddressInformation;