DROP DATABASE IF EXISTS emptr_db;
CREATE DATABASE emptr_db;

\c emptr_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(9, 2) NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id)
  REFERENCES role(id),
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
);