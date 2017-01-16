var express = require('express');
var router = express.Router();
var url = require('url');
var config = require('../config');
var fs = require('fs');

router.use(function (req, res, next) {
    var avaliable = config.get("workWith");
    var getUrl = req.url;
    var splitted = getUrl.split("/");
    if (splitted.length >= 3 && splitted[1] && avaliable.indexOf(splitted[1]) != -1 && splitted[2]) {
        next();
    } else {
        next({status: 404});
    }
});


/* bridge routers */

router.get(/^\/bridge\/admin\/[a-z]+$/, function(req, res, next) {
    var adminCheck = require('../modules/bridge/admin/_permission');
    var ssid = req.query.ssid;
    if (!ssid) return next({"msg": "no ssid"});

    var module = req.url.split("/");
        module = module.length >=3 ? module[3] : null;
        module = module ? (module.split("?") || [])[0] : null;
    if (!module) return next({"msg": "module not found"});

    fs.access(__dirname + '/../modules/bridge/admin/' + module + '.js', fs.constants.R_OK | fs.constants.W_OK, function(errModule){
        if (errModule) return next({"msg": "no module"});
        adminCheck(ssid, function(staff_id) {
            var index = require('../modules/bridge/admin/' + module);
            index(req, res, next);
        }, next);
    });
});



/* bridge routers */

module.exports = router;