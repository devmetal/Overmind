/**
 * Created by Adam on 2015.02.20..
 */
var express = require('express');
var app = express();
var port = '8800';

app.use('/',express.static(__dirname + '/public/'));

app.listen(port);

console.log("Example app listen on: " + port);