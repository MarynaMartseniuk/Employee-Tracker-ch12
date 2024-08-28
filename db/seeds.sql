INSERT INTO department (name)
VALUES ('Workshop'), 
       ('Human Resources'),
       ('IT'),
       ('Cafeteria'),
       ('Office'),
       ('Security'),
       ('Medical');

-- how I will know a department_id ?????
INSERT INTO role (title, salary, department_id)
       -- rol_id 1
VALUES ('operator', 2500, 1),
       -- rol_id 2
       ('mechanic', 3500, 1),
       -- rol_id 3
       ('Line Lead', 4000, 1),
       -- rol_id 4
       ('Coach', 5500, 1),
       -- rol_id 5
       ('HR Officer', 4000, 2),
       -- rol_id 6
       ('IT Specialist', 4000, 3),
       -- rol_id 7
       ('Cafeteria Officer', 3000, 4),
       -- rol_id 8
       ('Chief', 5000, 4),
       -- rol_id 9
       ('Office Manager', 4500, 5),
       -- rol_id 10
       ('Senior Office Manager', 6000, 5),
       -- rol_id 11
       ('Security Officer', 3000, 6),
       -- rol_id 12
       ('Senior Security Officer', 4500, 6),
       -- rol_id 13
       ('Nurse', 5000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Q', 'Q', 1, 3),
       ('W', 'W', 1, 3),
       ('E', 'E', 2, 3),
       ('R', 'R', 3, 4),
       ('T', 'T', 4, 10),
       ('Y', 'Y', 5, 0),
       ('U', 'U', 6, 0),
       ('I', 'I', 7, 8),
       ('O', 'O', 8, 0),
       ('P', 'P', 9, 10),
       ('A', 'A', 10, 0),
       ('S', 'S', 11, 12),
       ('D', 'D', 11, 12),
       ('F', 'F', 12, 0),
       ('G', 'G', 13, 0);
