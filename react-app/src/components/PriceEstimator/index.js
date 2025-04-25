import React, { useState } from "react";
import axios from "axios"; // Import axios

const PriceEstimator = () => {
    const [formData, setFormData] = useState({
        bed: 0,
        bath: 0,
        sqft: 0,
        lot: 0,
        type: "",
        city: "",
        garage: 0,
        built: 2000,
    });
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/api/properties/predict-price",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setPredictedPrice(response.data.predicted_price);
        } catch (err) {
            console.error("Error fetching price:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="price-estimator">
            <form onSubmit={handleSubmit}>
                <input
                    name="bed"
                    type="number"
                    onChange={handleChange}
                    placeholder="Bedrooms"
                />
                <input
                    name="bath"
                    type="number"
                    onChange={handleChange}
                    placeholder="Bathrooms"
                />
                <input
                    name="sqft"
                    type="number"
                    onChange={handleChange}
                    placeholder="Square Feet"
                />
                <input
                    name="lot"
                    type="number"
                    onChange={handleChange}
                    placeholder="Lot Size"
                />
                <input
                    name="type"
                    type="text"
                    onChange={handleChange}
                    placeholder="Property Type"
                />
                <input
                    name="city"
                    type="text"
                    onChange={handleChange}
                    placeholder="City"
                />
                <input
                    name="garage"
                    type="number"
                    onChange={handleChange}
                    placeholder="Garage Spaces"
                />
                <input
                    name="built"
                    type="number"
                    onChange={handleChange}
                    placeholder="Year Built"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Estimating…" : "Estimate Price"}
                </button>
            </form>
            {predictedPrice !== null && (
                <div className="price-estimator__result">
                    Predicted Price: ${predictedPrice.toFixed(2)}
                </div>
            )}
        </div>
    );
};

export default PriceEstimator;