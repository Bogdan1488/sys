
var mysql = require('../../../database/index')('bridge');


module.exports = function(req, res, next) {


  mysql.getConnection(function(err, connection) {
    if (err) return next(err);



    connection.insert('users', {
      'site_id': Math.floor(Math.random()*999999999),
      'staff_id': 1
    }, function(err, recordId) {
      connection.release();
      if (err) return next(err);




      res.json(recordId);
    });


  });


}
