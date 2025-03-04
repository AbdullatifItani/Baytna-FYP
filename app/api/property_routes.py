from flask import Blueprint, jsonify, request
from app.models import Property, db
from app.models import User
from flask_login import current_user, login_required
from app.forms import PropertyForm

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
    form = PropertyForm(csrf_enabled=False)
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
    return {'errors': form.errors}, 400

@property_routes.route("/<int:property_id>", methods=["PUT"])
@login_required
def update_property(property_id):
    property = Property.query.get(property_id)
    if not property:
        return {"errors": ["Property not found"]}, 404
    if property.listing_agent_id != current_user.id:
        return {"errors": ["Unauthorized"]}, 401

    form = PropertyForm(csrf_enabled=False)
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
