var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.set('view engine', 'ejs');


app.use(require('./routes/routes'));

app.use(function(err, req, res, next) {
  if (err.message) err.text = err.message; // if not production
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
