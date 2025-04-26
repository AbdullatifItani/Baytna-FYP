import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteProperty, removeFavoriteProperty } from "../../../../store/favorites";
import axios from "axios"; // Import axios
// If you have a base URL constant, import it; otherwise adjust the fetch URL below.
// import { BASE_URL } from "../../../../store/config";

import { Modal } from "../../../../context/Modal";
import Property from "../../../Property";

import PropertyTop from "./PropertyTop";

const PropertyCard = ({ property, setOver }) => {
    const [showModal, setShowModal] = useState(false);
    const [estimate, setEstimate] = useState(null);
    const dispatch = useDispatch();

    // Favorites from Redux
    const favorites = useSelector((state) => state.favorites.favorites);
    const isFavorite = favorites.includes(property.id);

    const toggleFavorite = (e) => {
        e.stopPropagation();
        if (isFavorite) dispatch(removeFavoriteProperty(property.id));
        else dispatch(addFavoriteProperty(property.id));
    };

    const onClose = () => {
        setTimeout(() => setShowModal(false), 1);
    };

    // fetch price estimate when the card mounts or property.id changes
    useEffect(() => {
        if (!property.id) return;
    
        async function fetchEstimate() {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:5000/api/properties/${property.id}/validate-price`,
                    {
                        withCredentials: true, // Include credentials (cookies)
                    }
                );
                
                if (response.status === 200) {
                    setEstimate(response.data.predicted_price);
                }
            } catch (err) {
                console.error("Estimate fetch failed:", err);
            }
        }
    
        fetchEstimate();
    }, [property.id]);

    return (
        <div
            className="property-card card-ctrl"
            onClick={() => setShowModal(true)}
            onMouseOver={() => setOver({ id: property.id })}
            onMouseOut={() => setOver({ id: 0 })}
        >
            <PropertyTop property={property} />
            <div className="card-btm">
                <div className="card-price">
                    {"$" +
                        property.price
                            .toFixed()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                </div>

                {estimate != null && (
                    <div className="card-estimate">
                        Estimated: $
                        {estimate
                            .toFixed()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    </div>
                )}

                <div className="card-desc">
                    {property.bed} bd
                    {property.bed > 1 && <span>s</span>}{" "}
                    {property.bath} ba {property.sqft} sqft{" "}
                    {property.status === "Active" && <span>- House for Sale</span>}
                </div>
                <div className="card-address">
                    {property.street}, {property.city}, {property.state}{" "}
                    {property.zip}
                </div>
                <div className="card-office">
                    {property.office.toUpperCase()}
                </div>
                <div className="favorite-btn" onClick={toggleFavorite}>
                    <i
                        className={`fa-solid fa-heart ${
                            isFavorite ? "favorite" : ""
                        }`}
                        style={{ color: isFavorite ? "red" : "gray" }}
                    />
                </div>
            </div>
            {showModal && (
                <Modal onClose={onClose}>
                    <Property property={property} onClose={onClose} />
                </Modal>
            )}
        </div>
    );
};

export default PropertyCard;