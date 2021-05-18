DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    salary DECIMAL(10.3) NOT NULL,
    departmentID INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(departmentID)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    firstName VARCHAR(45) NOT NULL,
    lastName VARCHAR(45) NOT NULL,
    roleID INT NOT NULL,
    managerID INT,
    PRIMARY KEY(id),
    FOREIGN KEY(roleID)
    REFERENCES role(id),
    FOREIGN KEY(managerID)
    REFERENCES employee(id)
);