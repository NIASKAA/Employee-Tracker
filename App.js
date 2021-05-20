const inquirer = require('inquirer');
const mysql = require('mysql');

const connectToSQL = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Crossbonex1',
    database: 'employeeTrackerDB'
});

connectToSQL.connect((err) => {
    if(err) throw err;
    menuPrompt();
});

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
                'Update employee roles',
                'Exit'
            ]
    })
    .then((res) => {
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
                updateEmployeeRoles();
                break;
            case 'Exit':
                connectToSQL.end();
                break;
        }
    }).catch((err) => {
        console.log(err)
    });
}
    
    
const viewDepartments = () => {
    let insertSQL = "SELECT * FROM department";
    connectToSQL.query(insertSQL, function(err, res) {
        res.forEach(department => {
            console.log(`ID: ${department.id} | ${department.name}`) 
        })
    menuPrompt();
    });
};

const viewEmployees = () => {
    let insertSQL = "SELECT * FROM employee";
    connectToSQL.query(insertSQL, function(err, res) {
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.firstName} ${employee.lastName} | Role ID: ${employee.roleID} | Manager ID: ${employee.managerID}`);
        })
        menuPrompt();
    });
};

const viewRole = () => {
    let insertSQL = "SELECT * FROM role";
    connectmySQL.query(insertSQL, function(err, res) {
        res.foreach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.departmentID}`);
        })
        menuPrompt();
    });
};

const addEmployee = () => {
    connectToSQL.query("SELECT * FROM role", ((err, result) => {
        if(err) throw (err);
        inquirer.prompt([{
            name: "firstName",
            type: "input",
            message: "Insert First Name",
        },
        {
            name: "lastName",
            type: "input",
            message: "Insert Last Name",
        },
        {
            name: "roleName",
            type: "list",
            message: "Insert role",

        }
        ])
        .then((answer) => {
            console.log(answer)
        })
    }));
};

const addRole = () => {
    connectToSQL.query("SELECT * FROM department", ((err, result) => {
        if(err) throw (err);
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "Insert Title",
            },
            {
                name: "salary",
                type: "input",
                message: "Insert Salary",
            },
            {
                name: "departmentID",
                type: "input",
                message: "Insert Department ID"
            }
        ])
        .then((answer) => {
            console.log(answer)
        })
    }));
};

const addDepartment = () => {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Insert New Department"
    }).then((answer) => {
        let insertSQL = "INSERT INTO department (name) VALUES ( ? )";
        connectToSQL.query(insertSQL, answer.department, ((err, res) => {
        }))
        menuPrompt();
    });
};

const updateEmployeeRoles = () => {

};