DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE  employees_db;

USE employees_db;

CREATE TABLE employees(
    id INT NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    employees_id INT,
    Poistion VARCHAR(50),
    deparment VARCHAR(100)
);

CREATE TABLE managers(
    id INT NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    deparment VARCHAR(100),
    employees_id INT NOT NULL
);

