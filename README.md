# Next JS HU Manager App
Before you run the app locally, you need to run the database:
```
docker-compose up -d
```
Local URL for connecting the db with Mongo Compass:
```
mongodb://localhost:27017/entriesDB
```
## Configure environment variables:
Rename .env.template to .env and fill in the values.
```
MONGODB_URL: your mongodb connection url
```
## Fill db with default test data:
Warning: this will delete all the current data in the db.
```
Make a GET request to localhost:3000/api/seed
```