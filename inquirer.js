const { default: Choices } = require("inquirer/lib/objects/choices")

const inquirer = requier('inquirer')

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

    showEmployees() {

    }

    showManagers(){

    }

    updateEmployees(){

    }

    removeEmployee() {
        
    }