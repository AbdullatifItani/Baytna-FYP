import React from "react";

const PropertyCard = ({ property, onEdit, onDelete }) => {
  return (
    <div className="property-card">
      <img src={property.front_img} alt={property.street} />
      <h2>{property.street}</h2>
      <p>{property.city}, {property.state} {property.zip}</p>
      <p>Price: ${property.price}</p>
      <p>Beds: {property.bed} Baths: {property.bath}</p>
      <p>Sqft: {property.sqft}</p>
      <p>Lot: {property.lot}</p>
      <p>Built: {property.built}</p>
      <p>Garage: {property.garage}</p>
      <p>Description: {property.description}</p>
      <button
        style={{ backgroundColor: "orange", color: "white", border: "none", padding: "10px 20px", margin: "10px", borderRadius: "5px", fontSize: "14px" }}
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        style={{ backgroundColor: "red", color: "white", border: "none", padding: "10px 20px", margin: "10px", borderRadius: "5px", fontSize: "14px" }}
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default PropertyCard;