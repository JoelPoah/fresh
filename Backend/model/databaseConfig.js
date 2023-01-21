// Aldrich Tan Kai Rong, P2128524, DISM 2A04

var mysql = require('mysql');
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "$y$temCall0226", // Change the password to your password
            database: "freshlife"
        });     
        return conn;
    }
};
module.exports = dbconnect
