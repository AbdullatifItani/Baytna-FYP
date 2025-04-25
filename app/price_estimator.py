import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib

# Generate synthetic data for Lebanon
np.random.seed(42)

# Options
types = ["Apartment", "House", "Villa", "Chalet", "Single Family", "Condominium", "Townhouse", "Manufactured Home", "Cabin"]
cities = ["Beirut", "Tripoli", "Sidon", "Tyre", "Byblos"]
#State

def generate_price(row):
    base = row['sqft'] * 1000 + row['lot'] * 200
    if row['type'] == 'Villa':
        base += 200_000
    elif row['type'] == 'House':
        base += 100_000
    city_modifier = {
        "Beirut": 1.5,
        "Byblos": 1.2,
        "Sidon": 1.1,
        "Tyre": 1.0,
        "Tripoli": 0.9
    }
    base *= city_modifier[row['city']]
    base += row['garage'] * 10_000
    base -= (2025 - row['built']) * 500  # Older houses slightly cheaper
    return max(30_000, int(base))

# Generate synthetic dataset
n = 500  # Number of properties
data = pd.DataFrame({
    "bed": np.random.randint(1, 7, size=n),
    "bath": np.random.randint(1, 6, size=n),
    "sqft": np.random.randint(50, 500, size=n),
    "lot": np.random.randint(100, 2000, size=n),
    "type": np.random.choice(types, size=n),
    "city": np.random.choice(cities, size=n),
    "garage": np.random.randint(0, 4, size=n),
    "built": np.random.randint(1950, 2024, size=n),
})

# Add price column
data["price"] = data.apply(generate_price, axis=1)

# Save synthetic dataset to CSV
data.to_csv("lebanon_properties.csv", index=False)
print("Synthetic dataset saved as lebanon_properties.csv")

# Load synthetic data
data = pd.read_csv("lebanon_properties.csv")

# Include garage and year built in the feature set
X = data[["bed", "bath", "sqft", "lot", "type", "city", "garage", "built"]]
y = data["price"]

# One-hot encode categorical features
X = pd.get_dummies(X, columns=["type", "city"])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Evaluate model
predictions = model.predict(X_test)
print("Mean Absolute Error:", mean_absolute_error(y_test, predictions))

# Save model and columns
joblib.dump(model, "price_estimator.pkl")
joblib.dump(X.columns.tolist(), "model_columns.pkl")  # Save the column names for later use