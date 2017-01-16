
var mysql = require('../../../database/index')('bridge');


module.exports = function(req, res, next) {


  mysql.getConnection(function(err, connection) {
    if (err) return next(err);



    connection.insert('users', {
      'site_id': 123,
      'staff_id': 123345
    }, function(err, recordId) {
      res.json({insert:recordId});
    });

  });


}
