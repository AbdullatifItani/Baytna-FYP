# No need for DATABASE_URL to be set if developing from within a devcontainer

FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230
DATABASE_URL=postgresql://postgres:Abed12345@127.0.0.1:5432/baytna_app
S3_BUCKET=<your bucket name>
S3_KEY=<Access key Id>
S3_SECRET=<Secret access key>
