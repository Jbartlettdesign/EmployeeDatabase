    
    INSERT INTO department (name)
    VALUES
    ('Management'),
    ('Engineering'),
    ('Research And Development'),
    ('Design'),
    ('Quality Assurance');
    
    INSERT INTO role (title, salary, department_id)
    VALUES
    ('Manager', '110000', 1),
    ('Engineer','100000', 2),
    ('Researcher','90000', 3),
    ('Designer', '80000', 4 ),
    ('Quality Checker','70000', 5);
    INSERT INTO employee (first_name, last_name, role_id,department_name, manager_id)
    VALUES
    ('Manuel','Marchetti', 1, null, null),
    ('Randall', 'Geer', 1, null, null),
    ('Erwin', 'Chowdhury', 2, null, 'Manuel Marchetti'),
    ('Steven', 'Brown', 3, null, 'Manuel Marchetti'),
    ('Joshua', 'Fulk', 3, null, 'Manuel Marchetti'),
    ('Bruce', 'Mundo', 4, null, 'Randall Geer'),
    ('Hubert', 'Parrish', 4, null, 'Randall Geer'),
    ('Pamela', 'Clinton', 5, null, 'Randall Geer');