/**
 * Created by Adam on 2015.02.11..
 */
var Server = require('./lib/server');

var server = new Server({port:3333});

server.on('start',function(port){
    console.log('Server is started on ' + port);
});

server.on('stop',function(){
    console.log('Server is stopped');
});

server.on('connection',function(req){
    console.log('User connected ' + req.connection._peername.address);
});

server.on('disconnect',function(req){
    console.log('User disconnected ' + req.connection._peername.address);
});

server.start();

function onExit() {
    server.stop();
    console.log('Process stopped');
    console.log(err.stack);
    process.exit();
}

//catches ctrl+c event
process.on('SIGINT', onExit);

//catches uncaught exceptions
process.on('uncaughtException', onExit);