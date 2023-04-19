const mysql = require('mysql');


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Sabari781@',
    database: 'lg_register',
})

module.exports = db;
