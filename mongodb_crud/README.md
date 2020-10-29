## Node.js + MongoDB REST API

Credits: https://www.callicoder.com

### Instructions

Download the code

Unzip and change directory into app folder

Install the dependencies

```
npm install express body-parser mongoose --save
```

Start mongodb server

Start the app and go to localhost:3000

```
node server.js
```

### API End-points

Below are the API end-points that can be used in Postman to send requests:

```
POST /notes (Add notes)
GET /notes (Get all notes)
GET /notes/:id (Get note by ID)
GET /notes/:listName (Get notes by list name)
PUT /notes/:id (Update note by ID)
DELETE /notes/:id (Delete note by ID)
```
