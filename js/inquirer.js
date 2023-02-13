
const inquirer = require('inquirer')
const cTable = require('console.table')
const mysql = require('mysql2');
const { response } = require('express');


const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Traya#1213',
    database: 'employees_db'
  });

  sql.connect(function (err) {
    if (err) throw err;
})

    function employeeDatabase() {
        inquirer.prompt([
        {
            type: 'list',
            name: 'employeeType',
            message: 'What type of employee is this?',
            choices: ['All Employees', 'Managers', 'Change Employess Position', 'Change Employee Department', 'Add Employee', 'Remove an Employee', 'Exit']

        }
    ])
        .then((response) => {
            switch(response.employeeType) {
                case 'All Employees':
                    showEmployees()
                    break
                 case 'Managers':
                    showManagers()
                    break
                case 'Change Employess Position':
                    updateEmployees()
                    break
                case 'Change Employee Department':
                    newDepartment()
                    break
                case 'Add Employee':
                    addEmployee()
                    break
                case 'Remove an Employee':
                    removeEmployee()
                    break
                case 'Exit': 
                    exit()
                    break
            }
        })
    }    

    function  showEmployees() {
        let result =  'SELECT * FROM employees'
        sql.query(result, (err, respose) => {
            if (err) throw err;
            console.table(respose)
            employeeDatabase()
    })
    
}

    function showManagers(){
        let result =  'SELECT * FROM managers'
        sql.query(result, (err, respose) => {
            if (err) throw err;
            console.table(respose)
            employeeDatabase()
    })
    }

    function updateEmployees() {   
        inquirer.prompt([
            {
            type: "input",
            name: "getid",
            message: "What is the three digit Employee ID for this person?",
            validate: (answer) => {
                if (answer !== ""){
                    return true
                }
                return "You need to enter an ID!"
                }
            },
            {
            type: "input",
            name: "getPosition",
            message: "What is the new position for this employee?",
            validate: (answer) => {
                if (answer !== ""){
                    return true
                }
                return "You need to enter a position!"
                }
            }
        ])
        .then((response) => {
            let beforeChange = `
            SELECT *
            FROM  employees
            WHERE employee_id = ${response.getid};
            `

            let result = `   
            UPDATE employees 
            SET position = '${response.getPosition}' 
            WHERE employee_id = ${response.getid}
            `
            
            let showResults = `
            SELECT * 
            FROM employees 
            WHERE employee_id = ${response.getid};`
            
            sql.query(beforeChange, (err, res) => {
                if (err) {
                    throw err;
                } else {
                    console.table(res)
                    sql.query(result, (err, res) => {
                    if(err) {
                        throw err;
                    } else {
                         sql.query(showResults, (err, res) => {
                            if(err) throw err;
                            console.table(res)
                            employeeDatabase()
                            }
                        )}
                    })
                }}
            )
        })
    }                     
                         

    function newDepartment() {
        inquirer.prompt([
            {
            type: "input",
            name: "employeeID",
            message: "What is the three digit Employee ID for this person?",
            validate: (answer) => {
                if (answer !== ""){
                    return true
                }
                return "You need to enter an ID!"
                }
            },
            {
            type: "input",
            name: "newDepartment",
            message: "What department are they moving to?",
            validate: (answer) => {
                if (answer !== ""){
                    return true
                }
                return "You need to enter a Department!"
                }
            }
        ])
        .then((response) => {
            let beforeChange = `
            SELECT *
            FROM  employees
            WHERE employee_id = ${response.employeeID};
            `

            let result = `   
            UPDATE employees 
            SET department = '${response.newDepartment}' 
            WHERE employee_id = ${response.employeeID}
            `
            
            let showResults = `
            SELECT * 
            FROM employees 
            WHERE employee_id = ${response.employeeID};`
            
            sql.query(beforeChange, (err, res) => {
                if (err) {
                    throw err;
                } else { 
                    console.table(res)
                    sql.query(result, (err, res) => {
                    if(err) {
                        throw err;
                    } else {
                         sql.query(showResults, (err, res) => {
                            if(err) throw err;
                            console.table(res)
                            employeeDatabase()
                            }
                        )}
                    })
                }}
            )
        })
    }

    function addEmployee() {

    }
    
    function  removeEmployee() {
       inquirer.prompt([
        {
            type: "input",
            name: "getID",
            message: "What is the three digit Employee ID for this person?",
            validate: (answer) => {
                if (answer !== ""){
                    return true
                }
                return "You need to enter an ID!"
                }
        }
       ])
       .then((response) => {
            let beforeRemove = `
            SELECT *
            FROM employees;
            `

            let remove = `
            DELETE FROM employees
            WHERE employee_id = ${response.getID};
            `
            let afterRemove = `
            SELECT *
            FROM employees;
            `

            sql.query(beforeRemove, (err, res) => {
                if(err) {
                    throw err;
                } else {
                    console.table(res)
                    sql.query(remove, (err) => {
                        if(err) {
                            throw err;
                        } else{
                            console.log('Employee has been removed from the Database')
                            sql.query(afterRemove, (err, res) => {
                                if (err) {
                                    throw err;
                                } else {
                                    console.table(res)
                                    employeeDatabase()
                                }
                            })
                        }
                    })
                }
            })
       })
 }

employeeDatabase()