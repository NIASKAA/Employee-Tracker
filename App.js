const { connect } = require('http2');
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
                'View Roles',
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
            case 'View Roles':
                viewRoles();
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

const viewRoles = () => {
    let insertSQL = "SELECT * FROM role";
    connectToSQL.query(insertSQL, function(err, res) {
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.departmentID}`);
        })
        menuPrompt();
    });
};

const addEmployee = () => {

}

const addRole = () => {
    connectToSQL.query("SELECT * FROM department", ((err, res) => {
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
                name: "departmentName",
                type: "list",
                message: "Insert Department Name",
                choices: function() {
                    let getDepartmentList = [];
                    res.forEach(res => {
                        getDepartmentList.push(
                            res.name
                        );
                    })
                    return getDepartmentList;
                }
            }
        ])
        .then((answer) => {
            const department = answer.departmentName;
            connectToSQL.query('SELECT * FROM department', function(err, res) {
                if(err) throw (err); 
                let  filterDepartment = res.filter(function(res) {
                    return res.name == department;
                })
                let id = filterDepartment[0].id;
                let insertSQL = "INSERT INTO role (title, salary, departmentID) VALUES (?, ?, ?)";
                let values = [answer.title, parseInt(answer.salary), id]
                console.log(values);
                connectToSQL.query(insertSQL, values, function(err, res, fields) {
                    console.log(`Added`)
                })
                viewRole()
            })
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