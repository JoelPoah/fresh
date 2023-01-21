// Aldrich Tan Kai Rong, P2128524, DISM 2A04

var mysql = require('mysql');
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "aldrich-db-fresh.cc4dukjdyc8y.us-east-1.rds.amazonaws.com",
            user: "root",
            password: "password", // Change the password to your password
            database: "freshlife"
        });     
        return conn;
    }
};
module.exports = dbconnect
