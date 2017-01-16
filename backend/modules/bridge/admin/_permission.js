var mysql = require('../../../database/index')('bridge');


module.exports = function(hash, callback, next) {


    mysql.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.queryValue('SELECT `staff_id` FROM `adminSession` where `hash` = ?', [hash],
            function(err, name) {
                if (err) return next(err);
                if (!name) return next({"msg": "permission denied"});
                (callback)(name);
            });
    });

}