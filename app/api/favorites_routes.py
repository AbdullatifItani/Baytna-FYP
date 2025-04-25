from flask import Blueprint, request
from app.models import db, Favorite
from flask_login import login_required, current_user

favorites_routes = Blueprint('favorites', __name__)

@favorites_routes.route('/', methods=['GET'])
@login_required
def get_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    return {'favorites': [favorite.property_id for favorite in favorites]}

@favorites_routes.route('/<int:property_id>', methods=['POST'])
@login_required
def add_favorite(property_id):
    favorite = Favorite(user_id=current_user.id, property_id=property_id)
    db.session.add(favorite)
    db.session.commit()
    return {'message': 'Property added to favorites'}

@favorites_routes.route('/<int:property_id>', methods=['DELETE'])
@login_required
def remove_favorite(property_id):
    favorite = Favorite.query.filter_by(user_id=current_user.id, property_id=property_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return {'message': 'Property removed from favorites'}
    return {'error': 'Favorite not found'}, 404