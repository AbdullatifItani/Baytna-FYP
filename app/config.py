import os


class Config:
    #SECRET_KEY = os.environ.get('SECRET_KEY')
    SECRET_KEY = "lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql').
    # so the connection uri must be updated here
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
    SESSION_COOKIE_SECURE = False  # Set to True in production
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=baytnastorage;AccountKey=3N7UoOKwMemVvpQ8HFy1XBCy4QNB73LwSgdXEZngvQol+8dPqE0kSxdEeanbxKzruz2002g4sbbg+AStHwJsXQ==;EndpointSuffix=core.windows.net"
    AZURE_CONTAINER_NAME = "houseimages"
