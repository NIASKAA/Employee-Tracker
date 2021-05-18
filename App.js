const inquirer = require('inquirer');
const mysql = require('mysql');

const connectmySQL = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Crossbonex1',
    database: 'employeeTrackerDB',
});

connectmySQL.connect = (err) => {
    if(err) throw err;
    menuPrompt();
};

const menuPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userChoice',
            message: 'Choose a selection',
            choices: [
                'View Employees by department',
                'View all employees',
                'Add employee',
                'Delete employee',
                'Update employee',
                'Add new department',
                'Add new role',
                'Exit'
            ]
        }
    ]);
};