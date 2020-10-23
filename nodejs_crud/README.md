# FS1030

NodeJS-ExpressJS-MYSQL Example

Good example of using MySQL-NodeJS-ExpressJS integration.

Credits: Atauba Prince, https://dev.to/achowba/build-a-simple-app-using-node-js-and-mysql-19me

## Commands

Download the code

```
download and unzip the repo
```

Initializes the app

```
cd into nodejs_crud folder
```

Install the dependencies

```
npm install express express-fileupload body-parser mysql ejs req-flash --save
```

Install nodemon globally

```
npm install nodemon -g
```

Start the app (make sure mysql scripts below are run before the next command)

```
nodemon app.js
```

If nodemon does not work please start the script by

```
node app.js
```

Open the browser and browse at http://localhost:5000

## MYSQL Script

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
