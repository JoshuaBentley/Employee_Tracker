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
            choices: ['All Employees', 'Managers', 'Update Employee Records', 'Remove an Employee']

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
                case 'Update Employee Records':
                    updateEmployees()
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
    })
    employeeDatabase()
}

    function showManagers(){
        let result =  'SELECT * FROM managers'
        sql.query(result, (err, respose) => {
            if (err) throw err;
            console.table(respose)
    })
    }

    function updateEmployees(){

    }

    function  removeEmployee() {

    }

employeeDatabase()