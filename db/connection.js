const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gringott2!2',
    database:'employeeDatabase'
},
console.log('Connected to the employee database.')
);
module.exports = db;
