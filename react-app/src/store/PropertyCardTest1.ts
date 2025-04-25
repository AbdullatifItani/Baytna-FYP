import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteProperty, removeFavoriteProperty } from "../../../../store/favorites";

import { Modal } from "../../../../context/Modal";
import Property from "../../../Property";

import PropertyTop from "./PropertyTop";

const PropertyCard = ({ property, setOver }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    // Get the list of favorite property IDs from the Redux store
    const favorites = useSelector((state) => state.favorites.favorites);
    const isFavorite = favorites.includes(property.id);

    const toggleFavorite = (e) => {
        e.stopPropagation(); // Prevent triggering the modal when clicking the heart button
        if (isFavorite) {
            dispatch(removeFavoriteProperty(property.id));
        } else {
            dispatch(addFavoriteProperty(property.id));
        }
    };

    const onClose = () => {
        setTimeout(() => {
            setShowModal(false);
        }, 1);
    };

    return (
        <div
            className="card-ctrl"
            onClick={() => setShowModal(true)}
            onMouseOver={() => setOver({ id: property.id })}
            onMouseOut={() => setOver({ id: 0 })}
        >
            <PropertyTop property={property} />
            <div className="card-btm">
                <div className="card-price">
                    {"$" +
                        property?.price.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                </div>
                <div className="card-desc">
                    {property?.bed} bd{property?.bed > 1 && <span>s</span>}{" "}
                    {property?.bath} ba {property?.sqft} sqft{" "}
                    {property?.status === "Active" && <span>- House for Sale</span>}
                </div>
                <div className="card-address">
                    {property?.street}, {property?.city}, {property?.state}{" "}
                    {property?.zip}
                </div>
                <div className="card-office">{property?.office?.toUpperCase()}</div>
                <div className="favorite-btn" onClick={toggleFavorite}>
                    <i
                        className={`fa-solid fa-heart ${isFavorite ? "favorite" : ""}`}
                        style={{ color: isFavorite ? "red" : "gray" }}
                    ></i>
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