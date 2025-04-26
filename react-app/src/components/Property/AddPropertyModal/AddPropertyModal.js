import React, { useState } from 'react';
import PropertyDetails from './PropertyDetails';
import AddressInformation from './AddressInformation';
import Features from './Features';
import Location from './Location';
import Images from './Images';
import StepNavigation from './StepNavigation';

const AddPropertyModal = ({ onSave, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    status: "",
    street: "",
    city: "",
    state_id: "",
    zip: "",
    type: "",
    price: "",
    bed: "",
    bath: "",
    sqft: "",
    lot: "",
    listing_id: "",
    listing_date: "",
    built: "",
    garage: "",
    lat: "",
    long: "",
    front_img: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (url) => {
    setFormData({ ...formData, front_img: url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="add-property-modal">
      <div className="add-property-modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <PropertyDetails
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {step === 2 && (
            <AddressInformation
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {step === 3 && (
            <Features
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {step === 4 && (
            <Location
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {step === 5 && (
            <Images
              handleImageUpload={handleImageUpload}
            />
          )}
          <div className="step-navigation">
            <StepNavigation step={step} setStep={setStep} />
          </div>
          {step === 5 && <button type="submit">Submit</button>}
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;