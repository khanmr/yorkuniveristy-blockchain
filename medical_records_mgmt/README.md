## CSBC 1010 Database Design and Principles (Fall 2020)

### EMR (Electronic Medical Record Management System)

### Pre-requisites

- [Node.js](https://nodejs.org)
- [Xampp](https://www.apachefriends.org)

### Instructions

- Download or fork the repository.
- Unzip and go to app directory.
- Run `npm install` to download the dependencies.
- Open Xampp and start Apache and MySQL server.
- Open browser and go to `localhost/phpmyadmin`
- Create database and tables using the sql statements in `tables.sql` file.
- Run `npm start` or `node app.js` to start app. In case of errors, check if database username and password needs to be changed in .env file.
- Go to `localhost:3000`
- Login with admin using `username: admin` and `password: admin`. If admin doesn't exist use `localhost:3000/register` to register admin.
- Admin can search, create, read, update, delete patients and care providers.
- Add a care provider using admin's account.
- Login with care provider's username and password.
- Care providers can add patients, search patients by health card number, view patient details, update patient details, add notes on patients and delete patients.

### SQL Queries

Below are the line numbers in the controllers/auth.js file for the SQL queries:

- Login - Line 23
- Check if username exists - Line 100
- Add Care Provider - Line 114
- Get All Care Providers - Line 131
- Get Care Provider - Line 146
- Update Care Provider - Line 160
- Delete Care Provider - Line 172
- Check if patient email already exists - Line 185
- Add Patient - Line 196
- Get All Patients - Line 213
- Get Patient - Line 228
- View Patient - Line 241
- Update Patient - Line 260
- Delete Patient - Line 272
- Add note - Line 286
- Get notes - Line 298
- Search patient by health card number - Line 315
- Search care provider by id - Line 328
- Check user logged in - Line 348

#### Credits for Nodejs MySQL Authentication

- [Telmo Sampalo](https://gumroad.com/l/rbBXk)
