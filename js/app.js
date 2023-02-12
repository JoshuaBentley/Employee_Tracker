const express = require('express')

  
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
module.exports = db;