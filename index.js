const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
var namesToUse = [];
var rolesToUse = [];

var depoToUse = [];
var usableDepoToUse = [];

var managerTerms = [];
var usableManager = [];

var usableTerms = [];
var usableNames = [];

var departmentToUse = [];
var Usabledepartment = [];
var test = ["x"];

function continueOrQuit(){
    FindInfo();
    inquirer
    .prompt([
        {
            type:'list',
            name:'question',
            message:'Continue?',
            choices:['Yes', 'No']
        }
    ]).then(answers => {
        if(answers.question === 'No'){
            process.exit();
        }
        else(
            startPrompt()
            );
    });
}

function FindInfo(){

    const deposql = `SELECT name 
    FROM department
    `;
    db.query(deposql, (err, rows) => {
        if(err){
            console.log("Failed to retrieve department names.");
            return;
        }
        else(
                depoToUse = rows,
                usableDepoToUse = depoToUse.map(({name}) => {
                    return `${name}`;
                }) 
            );                
    });

    const msql = `SELECT first_name, last_name 
    FROM employee
    WHERE role_id = 1
    `;
    db.query(msql, (err, rows) => {
        if(err){
            console.log("Failed to retrieve employees.");
            return;
        }
        else(
                managerTerms = rows,
                usableManager = managerTerms.map(({first_name, last_name}) => {
                    return `${first_name} ${last_name}`;
                    
                    
                }) 
            );                
    });

    const nsql = `SELECT first_name, last_name FROM employee`;
    db.query(nsql, (err, rows) => {
        if(err){
            console.log("Failed to retrieve employees.");
            return;
        }
        else(
                namesToUse = rows,
                usableNames = namesToUse.map(({first_name, last_name}) => {
                    return `${first_name} ${last_name}`;
                    
                    
                }) 
            );                
    });
    
    const tsql = `SELECT title FROM role`;
    db.query(tsql, (err, rows) => {
        if(err){
            console.log("Failed to retrieve roles.");
            return;
        }
        else(
                rolesToUse = rows,
                usableTerms = rolesToUse.map(({title}) => {
                    return `${title}`;
                    
                    
                }) 
            ); 
    });

    const dsql = `SELECT name FROM department`;
    db.query(dsql, (err, rows) => {
        if(err){
            console.log("Failed to retrieve departments.");
            return;
        }
        else(
                departmentToUse = rows,
                Usabledepartment = departmentToUse.map(({name}) => {
                    return `${name}`;
                
                }) 
            );
    });
}

function startPrompt(){
inquirer 
    .prompt([
        {
            type:'list',
            name:'question',
            message:'What would you like to do?',
            choices:['view all departments', 'view all roles', 
                     'view all employees', 'add a department', 'add a role', 
                      'add an employee', 'remove an employee', 'update an employee role', 'quit']
            
                    }
    ]).then(choice => {
        
        if(choice.question === 'view all departments'){
            FindInfo();

            const sql = `SELECT * FROM department`;
            db.query(sql, (err, rows) => {
                if(err){
                    console.log("Failed to retrieve departments, going back to start.");
                startPrompt();
                }
                else(
                    console.table(rows),
                    continueOrQuit()
                    );
                    //console.log('Push arrow down to go to questions');
            });
            
            
        }    
        else if(choice.question === 'view all roles'){
            FindInfo();

            const sql = `SELECT * FROM role`;
            db.query(sql, (err, rows) => {
                if(err){
                    console.log("Failed to retrieve roles, going back to start.");
                    startPrompt();
                }
                else(
                    console.table(rows),
                    continueOrQuit()
                    );
                    //console.log('Push arrow down to go to questions');

            });
            
        }
        else if(choice.question === 'view all employees'){
            FindInfo();
            //
            /*const dsql = `SELECT employee.*, department.name AS depo
            FROM employee
            LEFT JOIN department
            ON employee.department_id = department.id`;
            db.query(dsql, (err, rows) => {
                if(err){
                    console.log("failed to retrieve employees");
                    return;
                }
                else(
                    console.table(rows),
                    continueOrQuit()
                    );
                    //console.log('Push arrow down to go to questions');
            });*/
            /*****************************/
            const sql = `SELECT employee.*, role.salary AS salary, 
            role.title AS title, department.name AS department
            FROM employee
            LEFT JOIN role
            ON employee.role_id = role.id 
            LEFT JOIN department
            ON employee.department_id = department.id`;
            db.query(sql, (err, rows) => {
                if(err){
                    console.log("Failed to retrieve employees, going back to start.");
                    startPrompt();
                }
                else(
                    console.table(rows),
                    continueOrQuit()
                    );
                    //console.log('Push arrow down to go to questions');
            });


            /******************************/
            /*const sql = `SELECT employee.*, role.salary AS salary, role.title AS title
            FROM employee
            LEFT JOIN role
            ON employee.role_id = role.id `;
            db.query(sql, (err, rows) => {
                if(err){
                    console.log("failed to retrieve employees");
                    return;
                }
                else(
                    console.table(rows),
                    continueOrQuit()
                    );
                    //console.log('Push arrow down to go to questions');
            });*/
            
        }
        /**************************************************/
        else if(choice.question === 'add a department'){
            FindInfo();

            inquirer
            .prompt([
                {
                type:'input',
                name:'name',
                message:'Add a department name.',
                validate: checker => {
                    if (checker) {
                      return true;
                    } else {
                      console.log('Cannot skip!');
                      return false;
                    }
                  }
                }
            ]).then(answers =>{
            const sql = `INSERT INTO department
            (name)
            VALUES (?)`;
            const params = [answers.name]
            db.query(sql, params, (err, rows) => {
                if(err){
                    console.log("Failed to add department, going back to start.");
                    return;
                }
                else(
                    console.log('Successfully added department.'),
                    continueOrQuit()
                    );
                    //console.log('Push arrow down to go to questions');
                    
                });
            });
            
        }
        /**************************************************/
        else if(choice.question === 'add a role'){
            FindInfo();

            inquirer
            .prompt([
                {
                type:'input',
                name:'title',
                message:'Add a title name.',
                validate: checker => {
                    if (checker) {
                      return true;
                    } else {
                      console.log('Cannot skip!');
                      return false;
                    }
                  }
                },
                {
                type:'input',
                name:'salary',
                message:'Add a salary as integers and within 6 digits.',
                validate: checker => {
                
                var regExp = /[a-zA-Z]/g;
            
                if(regExp.test(checker)){
                    console.log("Salary cannot contain letters.");
                } 
                else {
                    if (checker.length < 7) {
                        //console.log(checker.length)
                      return true;
                    } else {
                      console.log('Enter a six digit number');
                      return false;
                    }
                  }
                    /* do something if letters are not found in your string */
                }
                    
                },
                {
                type:'list',
                name:'department_id',
                message: 'Add a department this role belongs to.',
                choices: Usabledepartment
                }
            ]).then(answers =>{
                Usabledepartment.forEach(element => {
                    if(element === answers.department_id){
                        answers.department_id = Usabledepartment.indexOf(element) + 1;
                        console.log(answers.department_id);
                    }
                });
            const sql = `INSERT INTO role
            (title, salary, department_id)
            VALUES (?,?,?)`;

            const params = [answers.title, answers.salary, answers.department_id]
            db.query(sql, params, (err, rows) => {
                if(err){
                    console.log("Failed to add role, going back to start.");
                    startPrompt();
                }
                else(
                    //console.table(rows)
                    console.log('Successfully added a role.'),
                    continueOrQuit()
                    );
                    
                    //console.log('Push arrow down to go to questions');
                    

            });
        });
        
    }
    
        /**************************************************/
        else if(choice.question === 'add an employee'){
            
            
            FindInfo();
            usableManager.push("null");
            //console.log(usableTerms);
        //console.log(usableTerms);
        inquirer 
        
        .prompt([
            {   
                type:'input',
                name:'first_name',
                message:'Enter your first name.', 
                validate: checker => {
                    if (checker) {
                      return true;
                    } else {
                      console.log('Cannot skip!');
                      return false;
                    }
                  }
            },
            {
                type:'input',
                name:'last_name',
                message:'Enter your last name.',
                validate: checker => {
                    if (checker) {
                      return true;
                    } else {
                      console.log('Cannot skip!');
                      return false;
                    }
                  }
            },
            {
                type:'list',
                name:'role_id',
                message:'Enter your department role.',
                choices: usableTerms,
            },
            {
                type:'list',
                name:'department_name',
                message:'Enter your department.',
                choices: usableDepoToUse,
            },
            {
                type:'list',
                name:'manager_id',
                message:'Enter your managers name.',
                choices: usableManager,
            }
        ]).then(answers => {
            usableTerms.forEach(element => {
                if(element === answers.role_id){
                    answers.role_id = usableTerms.indexOf(element) + 1;
                    console.log(answers.role_id);
                }
            });
            Usabledepartment.forEach(element => {
                if(element === answers.department_name){
                    answers.department_name = Usabledepartment.indexOf(element) + 1;
                    console.log(answers.role_id);
                }
            });
            
        const sql = `INSERT INTO employee 
        (first_name, last_name, role_id, department_id, manager_id)
        VALUES (?,?,?,?,?)`;

        const params = [answers.first_name, answers.last_name, 
        answers.role_id, answers.department_name, answers. manager_id];

        db.query(sql, params, (err, rows) => {
            if(err){
                console.log("Failed to add employee, going back to start.");
                startPrompt();
            }
            else(
                //console.table(rows));
                console.log('Successfully added an employee.'),
                continueOrQuit()
                );
                
        });
        

        });
    }
    else if(choice.question === 'remove an employee'){
        FindInfo();

        inquirer 
        .prompt([
            {   
                type:'list',
                name:'employee_id',
                message:'Enter the employee name to remove.',
                choices: usableNames
            }
        ]).then(answers => {
            var res = [];
            res = answers.employee_id.split(" ");
            console.log(res);
        const sql = `DELETE FROM employee 
        WHERE first_name = ? AND last_name = ?`;

        const params = [res[0], res[1]];

        db.query(sql, params, (err, rows) => {
            if(err){
                console.log("Failed to remove employee, going back to start.");
                startPrompt();
            }
            else(
                console.log('Successfully deleted an employee.'),
                continueOrQuit()
                ); 
        });
        });
    }
        /**************************************************/
        else if(choice.question === 'update an employee role'){
            FindInfo();

            inquirer 
        .prompt([
            {   
                type:'list',
                name:'employee_id',
                message:'Enter the employee name to update.',
                choices:usableNames
            }
            ,
            {   
                type:'list',
                name:'role_id',
                message:'Enter the role to update.',
                choices:usableTerms

            }
        ]).then(answers => {
            var res = [];
            res = answers.employee_id.split(" ");
             const sql = `UPDATE employee
             SET role_id = ?
             WHERE first_name = ? AND last_name = ?`;
             
            usableTerms.forEach(element => {
                if(element === answers.role_id){
                    answers.role_id = usableTerms.indexOf(element) + 1;
                    console.log(answers.role_id);
                }
            });
             
             const params = [answers.role_id, res[0], res[1]];
            db.query(sql, params, (err, rows) => {
                if(err){
                    console.log("Failed to update employee role, going back to start.");
                    startPrompt();
                }
                else(
                    console.log("Updated employee role."),
                    continueOrQuit()
                    );
            });
            
        });
    }
        else if(choice.question === 'quit'){
            console.log('Goodbye');
            quit = true;
            process.exit();
            
        }
        
        else("console.log(failure");
    });
    
}
    
    db.connect(err => {
        if(err) throw err;
        console.log('Database connected.');

    });
    FindInfo();
    startPrompt();
    