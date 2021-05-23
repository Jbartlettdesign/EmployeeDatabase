    
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
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
    ('Manuel','Marchetti', null, null),
    ('Randall', 'Geer', null, null),
    ('Erwin', 'Chowdhury', null, null),
    ('Steven', 'Brown', null, null),
    ('Joshua', 'Fulk', null, null),
    ('Bruce', 'Mundo', null, null),
    ('Hubert', 'Parrish', null, null),
    ('Pamela', 'Clinton', null, null);