from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
from ..azure_service import upload_image_to_azure

upload_bp = Blueprint('upload', __name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')

@upload_bp.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        filename = secure_filename(file.filename)

        # Ensure the upload folder exists
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        url = upload_image_to_azure(file_path, filename)
        return jsonify({"url": url}), 200

    except Exception as e:
        # log full traceback
        current_app.logger.exception("upload_file failed")
        return jsonify({
            "error": "Internal Server Error",
            "details": str(e)
        }), 500