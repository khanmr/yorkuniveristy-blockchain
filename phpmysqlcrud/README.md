# PHP MySQL CRUD

Credits: https://www.tutorialrepublic.com/php-tutorial/php-mysql-crud-application.php

### Download code

Open command line/terminal

- Mac users go to /applications/xampp/htdocs
- Windows users go to c:/xampp/htdocs/ folder

Download code there

### Create Database and Table in MySQL

Copy the below commands in workbench or mysql command line

```
CREATE DATABASE employees;
USE employees;
CREATE TABLE employees (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(100) not null,
`address` varchar (255) not null,
`department` varchar (255) not null,
`position` varchar (255) not null,
`salary` double not null,
PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
```

### Start app

Open http://localhost/phpmysqlcrud/
