import React from 'react';
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal';

const PropertyForm = ({ property, onSave, onClose }) => {
  return (
    <div>
      <AddPropertyModal
        onSave={onSave}
        onClose={onClose}
      />
    </div>
  );
};

export default PropertyForm;