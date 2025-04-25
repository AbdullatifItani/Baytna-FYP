from flask import Blueprint, request, jsonify
from app.models import Property, User

chatbot_routes = Blueprint('chatbot', __name__)

@chatbot_routes.route("/", methods=["POST"])
def chatbot():
    user_message = request.json.get("message", "").lower()

    # Handle property-related queries with filters
    if "property" in user_message or "apartment" in user_message or "house" in user_message:
        # Extract filters from the user's message
        filters = {
            "city": None,
            "street": None,
            "type": None,
            "max_price": None,
            "bed": None,
            "bath": None,
            "size": None,
            "lot": None,
            "built": None,
            "garage": None,
        }

        # Parse filters from the user's message
        #if "in" in user_message:
        #    filters["city"] = user_message.split("in")[1].split()[0]
        #    print(f"City filter: {filters['city']}")
        if " in " in user_message:
            city_part = user_message.split(" in ", 1)[1].strip()
            filters["city"] = city_part.split(" ", 1)[0].strip()
            print(f"City filter: {filters['city']}")
        if " on " in user_message:
            filters["street"] = user_message.split(" on ")[1].split()[0]
        if "type" in user_message:
            filters["type"] = user_message.split("type")[1].split()[0]
        if "under" in user_message:
            try:
                filters["max_price"] = int(user_message.split("under")[1].split()[0].replace("$", "").replace(",", ""))
            except (ValueError, IndexError):
                pass
        if "bedroom" in user_message:
            try:
                filters["bed"] = int(user_message.split("bedroom")[0].split()[-1])
            except (ValueError, IndexError):
                pass
        if "bathroom" in user_message:
            try:
                filters["bath"] = int(user_message.split("bathroom")[0].split()[-1])
            except (ValueError, IndexError):
                pass
        if "size" in user_message:
            try:
                filters["size"] = int(user_message.split("size")[1].split()[0])
            except (ValueError, IndexError):
                pass
        if " lot " in user_message:
            try:
                filters["lot"] = int(user_message.split("lot")[1].split()[0])
            except (ValueError, IndexError):
                pass
        if "built" in user_message:
            try:
                filters["built"] = int(user_message.split("built")[1].split()[0])
            except (ValueError, IndexError):
                pass
        if "garage" in user_message:
            try:
                filters["garage"] = int(user_message.split("garage")[1].split()[0])
            except (ValueError, IndexError):
                pass

        # Build the query dynamically
        query = Property.query
        if filters["city"]:
            query = query.filter(Property.city.ilike(f"%{filters['city']}%"))
        if filters["street"]:
            query = query.filter(Property.street.ilike(f"%{filters['street']}%"))
        if filters["type"]:
            query = query.filter(Property.type.ilike(f"%{filters['type']}%"))
        if filters["max_price"]:
            query = query.filter(Property.price <= filters["max_price"])
        if filters["bed"]:
            query = query.filter(Property.bed == filters["bed"])
        if filters["bath"]:
            query = query.filter(Property.bath == filters["bath"])
        if filters["size"]:
            query = query.filter(Property.sqft >= filters["size"])
        if filters["lot"]:
            query = query.filter(Property.lot >= filters["lot"])
        if filters["built"]:
            query = query.filter(Property.built >= filters["built"])
        if filters["garage"]:
            query = query.filter(Property.garage >= filters["garage"])

        # Fetch results
        properties = query.limit(5).all()
        if properties:
            response = {
                "message": "Here are some properties matching your criteria:",
                "properties": [property.to_dict() for property in properties]
            }
        else:
            response = {
                "message": "Sorry, no properties match your criteria."
            }
        return jsonify(response)

    # Handle agent-related queries
    elif "agent" in user_message:
        agents = User.query.filter(User.agent == True).limit(5).all()
        response = {
            "message": "Here are some agents you can contact:",
            "agents": [agent.to_dict() for agent in agents]
        }
        return jsonify(response)

    # Default response
    return jsonify({"message": "I'm sorry, I didn't understand that. Can you rephrase?"})