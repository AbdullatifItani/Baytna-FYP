import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import PropertyForm from "./PropertyForm";
import { createProperty, updateProperty, removeProperty } from "../../../store/property";
import { fetchUserProperties } from "../../../store/userProperties";

const Properties = () => {
  const [editingProperty, setEditingProperty] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const user = useSelector((state) => state.session.user);
  const properties = useSelector((state) => state.userProperties);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchUserProperties(user.id));
    } else {
      console.error("User ID is not defined");
    }
  }, [user, dispatch]);

  const handleAddProperty = async (property) => {
    const newProperty = await dispatch(createProperty(property));
    setEditingProperty(null);
    setIsFormVisible(false);
  };

  const handleUpdateProperty = async (property) => {
    const updatedProperty = await dispatch(updateProperty(property));
    setEditingProperty(null);
    setIsFormVisible(false);
  };

  const handleDeleteProperty = async (propertyId) => {
    await dispatch(removeProperty(propertyId));
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="properties-page">
      <button className="add-property-button" onClick={() => setIsFormVisible(true)}>Add a property</button>
      {isFormVisible && (
        <div className="property-form">
          <h2>{editingProperty ? "Edit Property" : "Add Property"}</h2>
          <PropertyForm
            property={editingProperty}
            onSave={editingProperty ? handleUpdateProperty : handleAddProperty}
            onClose={() => setIsFormVisible(false)}
          />
        </div>
      )}
      <h1>My Listings</h1>
      <div className="properties-list">
        {properties && Object.keys(properties).length > 0 ? (
          Object.values(properties).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => {
                setEditingProperty(property);
                setIsFormVisible(true);
              }}
              onDelete={() => handleDeleteProperty(property.id)}
            />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Properties;