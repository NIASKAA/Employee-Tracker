DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NULL,
    salary INT(10) NULL,
    departmentID INT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NULL,
    lastName VARCHAR(45) NULL,
    roleID INT NULL,
    managerID INT NULL,
    PRIMARY KEY(id)
);