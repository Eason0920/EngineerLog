var express = require('express');
var logRouter = require('./node/routers/log-router.js');
var port = process.env.PORT || 8888;
var server = express();

//server.all('*', function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    next();
//});

server.use('*/api', logRouter);
server.use(express.static('.'));
server.listen(port);