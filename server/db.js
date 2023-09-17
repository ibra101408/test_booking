const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db"
});

module.exports = con; // Export the MySQL connection


