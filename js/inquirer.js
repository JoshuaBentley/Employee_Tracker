const inquirer = require('inquirer')
const cTable = require('console.table')
const mysql = require('mysql2')

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
            choices: ['All Employees', 'Managers', 'Change Employess Position', 'Change Employee Department', 'Remove an Employee']

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
                case 'Remove an Employee':
                    removeEmployee()
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
            let result = `   
            UPDATE employees 
            SET position = '${response.getPosition}' 
            WHERE employee_id = ${response.getid}
            `
            let showResults = `SELECT * FROM employees WHERE employee_id = ${response.getid};`
            
            sql.query(result, (err, res) => {
                if(err) {
                    throw err;
                } else {
                   sql.query(showResults, (err, res) => {
                    if(err) throw err;
                    console.table(res)
                    employeeDatabase()
                   })
                }    
            })
        })
    }

    function newDepartment() {
    
    }

    function  removeEmployee() {

    }

employeeDatabase()