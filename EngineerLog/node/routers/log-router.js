var express = require('express');
var router = express.Router();
var logHandler = require('../handlers/log-handler.js');
var tools = require('../public/tools-module.js');
var logResultJsonModel = require('../models/logsResultJsonModel.js');

//QueryString
router.get('/log', function (req, res) {
    if (req.query.type && req.query.date) {
        logHandler.getLog(req.query.type, req.query.date, function (resultJson) {
            res.json(resultJson);
        });
    } else {
        var errorResultJson = tools.jsonClone(logResultJsonModel);
        errorResultJson.state = -1;
        errorResultJson.message = 'params missing！';
        errorResultJson.log_data = [];
        res.json(errorResultJson);
    }
});

//Restful Params
router.get('/log/:type/:date', function (req, res) {
    logHandler.getLog(req.params.type, req.params.date, function (resultJson) {
        res.json(resultJson);
    });
});

module.exports = router;