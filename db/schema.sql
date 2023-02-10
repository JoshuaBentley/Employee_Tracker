DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db

CREATE TABLE employees(
    id INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    employee_id INT,
    Position VARCHAR(50) NOT NULL,
    department VARCHAR(100) NOT NULL
);

-- CREATE TABLE managers(
--     id INT NOT NULL,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     department VARCHAR(100) NOT NULL,
--     employee_id INT NOT NULL
-- );

