const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
function startPromt(){
    
inquirer 
    .prompt([
        {
            type:'list',
            name:'question',
            message:'What would you like to do?',
            choices:['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ]).then(choice => {
        if(choice.question === 'view all employees'){
            const sql = `SELECT * FROM employee`;
            db.query(sql, (err, rows) => {
                if(err){
                    console.log("failed to retrieve");
                    return;
                }
                else(
                    console.table(rows));
            });
        }
        else("console.log(failure");
    });
}
    
    db.connect(err => {
        if(err) throw err;
        console.log('Database connected.');

    });
    startPromt();
    