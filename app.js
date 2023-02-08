const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Traya#1213'
  });
  
db.connect((err) => {
     if(err) {
        throw err
     }
})

const appp = express()

appp.listen('3001', () => {
    console.log('server started on port 3001')
})