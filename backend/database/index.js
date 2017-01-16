var mysql = require('mysql');
var config = require('../config');
var mysqlUtilities = require('mysql-utilities');


var mysqlConn  = function(dbname) {
    var pool  = mysql.createPool({
        connectionLimit: 10,
        host: config.get("mysql:host"),
        user: config.get("mysql:user"),
        password: config.get("mysql:password"),
        database: dbname
    });

    pool.on('connection', function (connection) {
        mysqlUtilities.upgrade(connection);
        mysqlUtilities.introspection(connection);
    });


    return pool;
};

module.exports = mysqlConn;
