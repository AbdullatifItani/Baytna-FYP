import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../../store/favorites";
import PropertyCard from "../Search/List/PropertyCard";

const SavedHomes = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const properties = useSelector((state) => state.properties);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    return (
        <div className="saved-homes-page">
            <h1>Saved Homes</h1>
            {favorites.length > 0 ? (
                <div className="saved-homes-list">
                    {favorites.map((propertyId) => {
                        const property = properties[propertyId];
                        return (
                            <PropertyCard
                                key={propertyId}
                                property={property}
                                setOver={() => {}}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="no-saved-homes">
                    <p>You have no saved homes yet.</p>
                </div>
            )}
        </div>
    );
};

export default SavedHomes;