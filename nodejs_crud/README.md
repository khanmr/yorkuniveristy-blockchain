# NodeJS-ExpressJS-MYSQL CRUD app

Credits: Atauba Prince, https://dev.to/achowba/build-a-simple-app-using-node-js-and-mysql-19me

## Instructions

- Download the code

```
download and unzip the repo
```

- Go into app folder

```
cd into nodejs_crud folder
```

- Install the dependencies

```
npm install express express-fileupload body-parser mysql ejs req-flash --save
```

- Install nodemon globally

```
npm install nodemon -g
```

- Run MySQL script below to create the database and table
- Start the app

```
nodemon app.js
```

- If nodemon does not work please start the script by

```
node app.js
```

Open the browser and go to http://localhost:5000

## MySQL Script

```
CREATE DATABASE socka;
CREATE TABLE IF NOT EXISTS `players` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `number` int(11) NOT NULL,
  `ranking` varchar(10) not null,
  `salary` decimal(9,2) not null,
  `image` varchar(255) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
```
