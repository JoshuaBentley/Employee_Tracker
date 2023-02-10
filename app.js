const express = require('express')
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Traya#1213',
    database: 'employees_db'
  });
  
db.connect((err) => {
     if(err) {
        throw err
     }
     console.log('MySQL connected')
})

const appp = express()

appp.listen('3001', () => {
    console.log('server started on port 3001')
})