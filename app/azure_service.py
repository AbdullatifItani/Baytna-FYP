from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from .config import Config
import os

def upload_image_to_azure(file_path, file_name):
    config = Config()
    blob_service_client = BlobServiceClient.from_connection_string(config.AZURE_STORAGE_CONNECTION_STRING)
    blob_client = blob_service_client.get_blob_client(container=config.AZURE_CONTAINER_NAME, blob=file_name)

    with open(file_path, "rb") as data:
        blob_client.upload_blob(data)

    return blob_client.url