const inquirer = require('inquirer');
const mysql = require('mysql');
const { allowedNodeEnvironmentFlags } = require('process');

const connectmySQL = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Crossbonex1',
    database: 'employeeTrackerDB',
    multipleStatements: true,
});

connectmySQL.connect = (err) => {
    if(err) throw err;
    menuPrompt();
};

function menuPrompt() {
    inquirer.prompt({
            type: 'list',
            name: 'userChoice',
            message: 'Choose a selection',
            choices: [
                'View departments',
                'View all employees',
                'View roles',
                'Add employee',
                'Add new role',
                'Add new department',
                'Update employee',
                'Exit'
            ]
    }).then((res) => {
        console.log(res.userChoice);
        switch(res.userChoice){
            case 'View departments':
                viewDepartments();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'View Role':
                viewRole();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Add new role':
                addRole();
                break;
            case 'Add new department':
                addDepartment();
                break;
            case 'Update employee':
                updateEmployee();
                break;
            case 'Exit':
                connectmySQL.end();
                break;
        }
    }).catch((err) => {
        console.log(err)
    })
}
    
    

const viewDepartments = () => {
    let insertSQL = "SELECT * FROM department";
    connectmySQL.query(insertSQL, function(err, res) {
        res.forEach(department => {
            console.log(`ID: ${department.id} | ${department.name}`) 
        })
    menuPrompt();
    });
};

const viewEmployees = () => {
    let insertSQL ="SELECT * FROM employee";
    connectmySQL.query(insertSQL, function(err, res) {
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.firstName} ${employee.lastName} | Role ID: ${employee.roleID} | Manager ID: ${employee.managerID}`);
        })
        menuPrompt();
    });
};

const viewRole = () => {

};

const addEmployee = () => {

};

const addRole = () => {

};

const addDepartment = () => {

};

const updateEmployee = () => {

};