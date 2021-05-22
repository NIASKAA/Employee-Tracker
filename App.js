const inquirer = require('inquirer');
const mysql = require('mysql');

// connectTOSQL will be used to create the connection to mysql workbench
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

// this function will always be the first thing that will load when called so client will see the options when prompted. 
function menuPrompt() {
    inquirer.prompt({
            type: 'list',
            name: 'userChoice',
            message: 'Choose a selection',
            choices: [
                'View Departments',
                'View All Employees',
                'View Roles',
                'Add Employee',
                'Add New Role',
                'Add New Department',
                'Update Employee Role',
                'Exit'
            ]
    })
    .then((res) => {
        console.log(res.userChoice);
        switch(res.userChoice){
            case 'View Departments':
                viewDepartments();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add New Role':
                addRole();
                break;
            case 'Add New Department':
                addDepartment();
                break;
            case 'Update Employee Role':
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
    

//function for viewing the available departments
const viewDepartments = () => {
    let insertSQL = "SELECT * FROM department";
    connectToSQL.query(insertSQL, function(err, res) {
        res.forEach(department => {
            console.log(`ID: ${department.id} | ${department.name}`) 
        })
    menuPrompt();
    });
};

//function for viewing the available employees
const viewEmployees = () => {
    let insertSQL = "SELECT * FROM employee";
    connectToSQL.query(insertSQL, function(err, res) {
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.firstName} ${employee.lastName} | Role ID: ${employee.roleID} | Manager ID: ${employee.managerID}`);
        })
        menuPrompt();
    });
};

//function for viewing the available roles 
const viewRoles = () => {
    let insertSQL = "SELECT * FROM role";
    connectToSQL.query(insertSQL, function(err, res) {
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.departmentID}`);
        })
        menuPrompt();
    });
};

// this function first make a connection to mysql first before doing anything else. After making contact, we now prompt user 
// they want to insert.
const addEmployee = () => {
    connectToSQL.query("SELECT * FROM role", ((err, res) => {
        if(err) throw (err);
        inquirer.prompt([
            {
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
                message: "Insert Role",
                choices: function() {
                    // using forEach to create a new array for each title in role
                    getRoleList = [];
                    res.forEach(res => {
                        getRoleList.push(res.title);
                    });
                    return getRoleList;
                }
            }
        ])
        .then((answer) => {
            const role = answer.roleName;
            // res.filter will get rid of other unwanted titles. 
            connectToSQL.query("SELECT * FROM role", function(err, res) {
                if(err) throw (err);
                let filterRole = res.filter((res) => {
                    return res.title == role;
                })
                let roleID = filterRole[0].id;
                connectToSQL.query("SELECT * FROM employee", function(err, res) {
                    inquirer.prompt([
                        {
                            name: "manager",
                            type: 'list',
                            message: "Insert Manager",
                            choices: function() {
                                getManagerList = [];
                                res.forEach(res => {
                                    getManagerList.push(res.lastName)
                                })
                                return getManagerList;
                            }
                        }
                    ])
                    .then((managerAnswer) => {
                        const manager = managerAnswer.manager;
                        connectToSQL.query("SELECT * FROM employee", function(err, res){
                            if(err) throw (err);
                            let filterManager = res.filter((res) => {
                                return res.lastName == manager;
                            })
                            let managerID = filterManager[0].id;
                            let insertSQL = "INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES (?, ?, ?, ?)";
                            let values = [answer.firstName, answer.lastName, roleID, managerID]
                            connectToSQL.query(insertSQL, values, function(err, res, fields) {
                                console.log('Added');
                            })
                            viewEmployees();
                        })
                    })
                })
            })
        })
    }))
}

// the function does the same sequence as addEmployee where it first make connect with mysql before prompt
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
                viewRoles();
            })
        })
    }));
};

// this function does a simple insertion into mysql
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

// idPrompt was made solely because it was easier to get the employee ID in order to update. So we set this up 
// before the actual update function
const idPrompt = () => {
    return ([
        {
            name: "name",
            type: "input",
            message: "Insert Employee ID",
        }
    ]);
}

const updateEmployeeRoles = async () => {
    // using await and async to get employee id first
    const employeeID = await inquirer.prompt(idPrompt());
    connectToSQL.query("SELECT role.id, role.title FROM role ORDER BY role.id;", async (err, res) => {
        if(err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: "role",
                type: "list",
                choices: () => res.map(res => res.title),
                message: "Insert New Role",
            }
        ]);

        let roleID;
        for (const row of res) {
            if (row.title === role) {
                roleID = row.id;
                continue;
            }
        }
        connectToSQL.query(`UPDATE employee SET roleID = ${roleID} WHERE employee.id = ${employeeID.name}`, async (err, res) => {
            if (err) throw err;
            console.log("Role Updated")
        });
        menuPrompt();
    });
};
// arguably the hardest part of the hw is the update role function