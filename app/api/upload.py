from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from ..azure_service import upload_image_to_azure

upload_bp = Blueprint('upload', __name__)
UPLOAD_FOLDER = 'uploads/'

@upload_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        # Ensure the upload folder exists
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        url = upload_image_to_azure(file_path, filename)
        return jsonify({"url": url}), 200