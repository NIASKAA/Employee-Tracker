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
    salary DECIMAL(10.3) NULL,
    departmentID INT NULL,
    PRIMARY KEY(id)
    FOREIGN KEY(departmentID)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NULL,
    lastName VARCHAR(45) NULL,
    roleID INT NULL,
    managerID INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(roleID)
    REFERENCES role(id),
    FOREIGN KEY(employeeID)
    REFERENCES employee(id)
);