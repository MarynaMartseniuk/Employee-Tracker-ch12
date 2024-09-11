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
VALUES ('operator', 2500.00, 1),
       -- rol_id 2
       ('mechanic', 3500.00, 1),
       -- rol_id 3
       ('Line Lead', 4000.00, 1),
       -- rol_id 4
       ('Coach', 5500.00, 1),
       -- rol_id 5
       ('HR Officer', 4000.00, 2),
       -- rol_id 6
       ('IT Specialist', 4000.00, 3),
       -- rol_id 7
       ('Cafeteria Officer', 3000.00, 4),
       -- rol_id 8
       ('Chief', 5000.00, 4),
       -- rol_id 9
       ('Office Manager', 4500.00, 5),
       -- rol_id 10
       ('Senior Office Manager', 6000.00, 5),
       -- rol_id 11
       ('Security Officer', 3000.00, 6),
       -- rol_id 12
       ('Senior Security Officer', 4500.00, 6),
       -- rol_id 13
       ('Nurse', 5000.00, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Hanna', 'Esclare', 1, 3),
       ('Recardo', 'Weles', 1, 3),
       ('Marry', 'Reed', 2, 3),
       ('Abigal', 'Nicko', 3, 4),
       ('Tim', 'Reach', 4, 10),
       ('Nathan', 'Yung', 5, NULL),
       ('Emmy', 'Cruse', 6, NULL),
       ('Sandra', 'Pinster', 7, 8),
       ('Josh', 'Davis', 8, NULL),
       ('Pall', 'Christensen', 9, 10),
       ('Amanda', 'Gale', 10, NULL),
       ('Shown', 'Cox', 11, 12),
       ('Matt', 'Handley', 11, 12),
       ('Erich', 'Higgs', 12, NULL),
       ('Spenser', 'Grimm', 13, NULL);
