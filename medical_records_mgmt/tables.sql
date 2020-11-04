CREATE DATABASE medical_records;

USE medical_records;

CREATE TABLE users (
    `id` integer NOT NULL AUTO_INCREMENT,
    `name` varchar(100) not null,
    `username` varchar (255) not null,
    `password` varchar (255) not null,
    `is_admin` boolean not null DEFAULT 0,
    `is_active` boolean not null DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

INSERT INTO users (`name`, `username`, `password`, `is_admin`) VALUES ("Admin", "admin", "$2a$08$FDo/zP5UajwjESYjXSoBauykrVgD8nF6CdYaL3h8TZuhBUWnEXUuK", 1);

CREATE TABLE patients (
    `id` integer NOT NULL AUTO_INCREMENT,
    `first_name` varchar(100) not null,
    `last_name` varchar(100) not null,
    `email` varchar(100) not null,
    `date_of_birth` date not null,
    `gender` varchar (10) not null,
    `health_card` varchar (50) not null,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE notes (
    `id` integer NOT NULL AUTO_INCREMENT,
    `patient_id` integer NOT NULL,
    `care_provider_id` integer NOT NULL,
    `note` varchar(255) NOT NULL,
    `last_update` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`patient_id`) REFERENCES patients (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`care_provider_id`) REFERENCES users (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

