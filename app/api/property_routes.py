from flask import Blueprint, jsonify, request
from app.models import Property, db
from app.models import User
from flask_login import current_user, login_required
from app.forms import PropertyForm
import joblib
import pandas as pd
import os

property_routes = Blueprint('properties', __name__)

# @property_routes.route("/search", methods=["GET", 'POST'])
# def search():
#     properties = Property.query.limit(200).all()
#     return {
#         "properties": [property.to_dict() for property in properties],
#         }

@property_routes.route("/<int:property_id>")
def get_property(property_id):

    property = Property.query.get(property_id)

    if property:
        return {"property": property.to_dict()}
    else:
        return {"errors": ["Something went wrong. Please try again"]}

@property_routes.route("/user/<int:user_id>")
@login_required
def get_user_properties(user_id):
    if current_user.id != user_id:
        return {"error": "Unauthorized access"}, 403

    properties = Property.query.filter_by(listing_agent_id=user_id).all()
    return {"properties": [property.to_dict() for property in properties]}
    
@property_routes.route("/", methods=["POST"])
@login_required
def add_property():
    form = PropertyForm(meta={'csrf': False})
    try:
        if form.validate_on_submit():
            new_property = Property(
                status=form.data["status"],
                street=form.data["street"],
                city=form.data["city"],
                state_id=form.data["state_id"],
                zip=form.data["zip"],
                type=form.data["type"],
                price=form.data["price"],
                bed=form.data["bed"],
                bath=form.data["bath"],
                sqft=form.data["sqft"],
                lot=form.data["lot"],
                listing_id=form.data["listing_id"],
                listing_date=form.data["listing_date"],
                listing_agent_id=current_user.id,
                built=form.data["built"],
                garage=form.data["garage"],
                lat=form.data["lat"],
                long=form.data["long"],
                front_img=form.data["front_img"],
                description=form.data["description"]
            )
            db.session.add(new_property)
            db.session.commit()
            return {"property": new_property.to_dict()}
        else:
            print("add_property: validation failed →", form.errors)
            return {'errors': form.errors}, 400

    except Exception as e:
        print("add_property: unexpected error →", e)
        return {'errors': ['Internal server error']}, 500

@property_routes.route("/<int:property_id>", methods=["PUT"])
@login_required
def update_property(property_id):
    property = Property.query.get(property_id)
    if not property:
        return {"errors": ["Property not found"]}, 404
    if property.listing_agent_id != current_user.id:
        return {"errors": ["Unauthorized"]}, 401

    form = PropertyForm(meta={'csrf': False})
    if form.validate_on_submit():
        property.status = form.data["status"]
        property.street = form.data["street"]
        property.city = form.data["city"]
        property.state_id = form.data["state_id"]
        property.zip = form.data["zip"]
        property.type = form.data["type"]
        property.price = form.data["price"]
        property.bed = form.data["bed"]
        property.bath = form.data["bath"]
        property.sqft = form.data["sqft"]
        property.lot = form.data["lot"]
        property.listing_id = form.data["listing_id"]
        property.listing_date = form.data["listing_date"]
        property.built = form.data["built"]
        property.garage = form.data["garage"]
        property.lat = form.data["lat"]
        property.long = form.data["long"]
        property.front_img = form.data["front_img"]
        property.description = form.data["description"]

        db.session.commit()
        return {"property": property.to_dict()}
    return {'errors': form.errors}, 400

@property_routes.route("/<int:property_id>", methods=["DELETE"])
@login_required
def delete_property(property_id):
    property = Property.query.get(property_id)
    if not property:
        return {"errors": ["Property not found"]}, 404
    if property.listing_agent_id != current_user.id:
        return {"errors": ["Unauthorized"]}, 401

    db.session.delete(property)
    db.session.commit()
    return {"message": "Property deleted successfully"}

@property_routes.route("/<int:property_id>/images")
def property_imgs(property_id):
    property = Property.query.get(property_id)
    return {
        "images": [image.to_dict() for image in property.images]
    }

@property_routes.route("/predict-price", methods=["POST"])
def predict_price():

    base_dir = os.path.dirname(os.path.dirname(__file__))  # Get the parent directory of 'api'
    model_path = os.path.join(base_dir, "price_estimator.pkl")
    columns_path = os.path.join(base_dir, "model_columns.pkl")

    # Load the trained model and columns
    model = joblib.load(model_path)
    model_columns = joblib.load(columns_path)
    #model = joblib.load("price_estimator.pkl")
    #model_columns = joblib.load("model_columns.pkl")

    # Get user input
    data = request.json

    """# Prepare input data
    input_data = pd.DataFrame([data])
    input_data = pd.get_dummies(input_data)

    # Ensure all columns match the training data
    for col in model_columns:
        if col not in input_data:
            input_data[col] = 0

    # Predict price
    predicted_price = model.predict(input_data)[0]
    return jsonify({"predicted_price": predicted_price})"""

    # 1) cast numeric fields
    for col in ("bed","bath","sqft","lot","garage","built"):
        data[col] = int(data.get(col, 0))

    # 2) build DF and one‑hot only the categorical cols
    input_data = pd.DataFrame([data])
    input_data = pd.get_dummies(input_data, columns=["type","city"])

    # 3) add any missing columns, then reorder
    for col in model_columns:
        if col not in input_data.columns:
            input_data[col] = 0
    input_data = input_data[model_columns]

    # 4) predict
    predicted_price = model.predict(input_data)[0]
    return jsonify({"predicted_price": float(predicted_price)})

@property_routes.route("/<int:property_id>/validate-price", methods=["GET"])
def validate_price(property_id):
    prop = Property.query.get(property_id)
    if not prop:
        return {"errors": ["Property not found"]}, 404

    # 1) load model & columns (you likely already have this above)
    base_dir = os.path.dirname(os.path.dirname(__file__))
    model = joblib.load(os.path.join(base_dir, "price_estimator.pkl"))
    model_columns = joblib.load(os.path.join(base_dir, "model_columns.pkl"))

    # 2) build a clean input dict with only the features your model uses
    data = {
        "bed": prop.bed,
        "bath": prop.bath,
        "sqft": prop.sqft,
        "lot": prop.lot,
        "garage": prop.garage,
        "built": prop.built,
        "type": prop.type,    # categorical
        "city": prop.city     # categorical
    }

    # 3) one‐hot encode
    df = pd.DataFrame([data])
    df = pd.get_dummies(df, columns=["type", "city"])

    # 4) ensure all model columns are present
    for col in model_columns:
        if col not in df.columns:
            df[col] = 0
    df = df[model_columns]

    # 5) predict
    predicted_price = model.predict(df)[0]

    return jsonify({
        "property_id": property_id,
        "listed_price": prop.price,
        "predicted_price": float(predicted_price),
        "difference": prop.price - predicted_price
    })