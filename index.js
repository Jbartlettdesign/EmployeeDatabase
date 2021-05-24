const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
var quit = false;

function continueOrQuit(){
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

function startPrompt(){

inquirer 
    .prompt([
        {
            type:'list',
            name:'question',
            message:'What would you like to do?',
            choices:['view all departments', 'view all roles', 
                     'view all employees', 'add a department', 'add a role', 
                      'add an employee', 'update an employee role', 'quit']
        }
    ]).then(choice => {
        if(choice.question === 'view all departments'){
            const sql = `SELECT * FROM department`;
            db.query(sql, (err, rows) => {
                if(err){
                    console.log("failed to retrieve departments");
                    return;
                }
                else(
                    console.table(rows),
                    continueOrQuit()
                    );
                    //console.log('Push arrow down to go to questions');
            });
            
            
        }    
        else if(choice.question === 'view all roles'){
            const sql = `SELECT * FROM role`;
            db.query(sql, (err, rows) => {
                if(err){
                    console.log("failed to retrieve roles");
                    return;
                }
                else(
                    console.table(rows),
                    continueOrQuit()
                    );
                    //console.log('Push arrow down to go to questions');

            });
            
        }
        else if(choice.question === 'view all employees'){
            const sql = `SELECT * FROM employee`;
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
            });
            
        }







        /**************************************************/
        else if(choice.question === 'add a department'){
            inquirer
            .prompt([
                {
                type:'input',
                name:'name',
                message:'Add a department name.'
                }
            ]).then(answers =>{
            const sql = `INSERT INTO department
            (name)
            VALUES (?)`;
            const params = [answers.name]
            db.query(sql, params, (err, rows) => {
                if(err){
                    console.log("failed to add department");
                    return;
                }
                else(
                    console.log('Successfully added department'),
                    continueOrQuit()
                    );
                    //console.log('Push arrow down to go to questions');
                    
                });
            });
            
        }
        /**************************************************/
        else if(choice.question === 'add a role'){
            inquirer
            .prompt([
                {
                type:'input',
                name:'title',
                message:'Add a title name.'
                },
                {
                type:'input',
                name:'salary',
                message:'Add a salary.'
                },
                {
                type:'input',
                name:'department_id',
                message:'Add a department id.'
                }
            ]).then(answers =>{
            const sql = `INSERT INTO role
            (title, salary, department_id)
            VALUES (?,?,?)`;

            const params = [answers.title, answers.salary, answers.department_id]
            db.query(sql, params, (err, rows) => {
                if(err){
                    console.log("failed to add role");
                    return;
                }
                else(
                    //console.table(rows)
                    console.log('Successfully added a role'),
                    continueOrQuit()
                    );
                    
                    //console.log('Push arrow down to go to questions');
                    

            });
        });
        
    }
    
        /**************************************************/
        else if(choice.question === 'add an employee'){
              
        inquirer 
        .prompt([
            {   
                type:'input',
                name:'first_name',
                message:'Enter your first name',
            },
            {
                type:'input',
                name:'last_name',
                message:'Enter your last name',
            },
            {
                type:'input',
                name:'role_id',
                message:'Enter your role id name',
            },
            {
                type:'input',
                name:'manager_id',
                message:'Enter your manager id name',
            }
        ]).then(answers => {
        const sql = `INSERT INTO employee 
        (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;

        const params = [answers.first_name, answers.last_name, 
        answers.role_id, answers.manager_id];

        db.query(sql, params, (err, rows) => {
            if(err){
                console.log("failed to retrieve add an employee");
                return;
            }
            else(
                //console.table(rows));
                console.log('Successfully added an employee'),
                continueOrQuit()
                );
                
        });
        

        });
    }
        
        /**************************************************/
        else if(choice.question === 'update an employee role'){
             const sql = `SELECT * FROM employee`;
            db.query(sql, (err, rows) => {
                if(err){
                    console.log("failed to retrieve");
                    return;
                }
                else(
                    console.table(rows),
                    continueOrQuit()
                    );
                    
                    //console.log('Push arrow down to go to questions');
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
    startPrompt();
    