## CSBC 1000 Fundamentals of Back-End and Blockchain Development

#### Milestone 2

#### Group 1

Abhinav Jaswal
Rizwan Khan

### Summary

In this project, we will be building a simple CRUD application for the distributor logistics app.

The distributor can:

- create an account
- place an order for delivery

The logistics company can:

- create an account
- view existing delivery jobs
- confirm an order
- update order status

### Pre-requisites

- Download Node.js
- Create a Firebase account
- Download Postman

### Project Setup

1. Install the firebase CLI by running `npm install -g firebase-tools`
2. Change working directory to `/functions`
3. Run `npm install` to install the dependencies in the local node_modules folder.
4. Run `firebase login` to connect to your firebase account
5. Create project from Firebase console.
6. Create database from Firebase console.
7. Run `firebase deploy` to deploy code

### End-points

Below are the end-points for the API that can be used in Postman to send requests:

**GET REQUESTS**

GET /order/:id (Get order by ID)

**POST REQUESTS**

POST /distributors (Create distributor profile)

```
{
    "name": "toronto distributors",
    "address": "toronto, ON"
}
```

POST /logistics (Create logistics profile)

```
{
    "name": "toronto logistics",
    "address": "toronto"
}
```

POST /orders (Create an order)

```
{
    "distributorID": "392db115-cd46-4b9c-ae17-88f5d63b8c60",
    "logisticsID": "",
    "pickup": "toronto",
    "delivery": "brampton",
    "distance": 50,
    "status": "open"
}
```

**PUT REQUESTS**

PUT /orders/:id (Update order)

```
{
    "status": "confirmed"
}
```

### Dependencies

Below are the project dependencies.

"body-parser": "^1.19.0"
"express": "^4.17.1"
"firebase-admin": "^8.10.0"
"firebase-functions": "^3.6.1"
"uuid": "^8.3.0"
