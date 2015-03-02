/**
 * Created by Adam on 2015.02.11..
 */
var IOServer = require('socket.io');
var SocketStream = require('socket.io-stream');
var Emitter = require('events').EventEmitter;
var util = require('util');
var _ = require('lodash');

module.exports = Server;

var defaults = {
    port:4200,
    mongo: {
        host:'127.0.0.1',
        db:'nCemDataStorage'
    }
};

var io = null;

function Server(config) {
    Emitter.call(this);
    this.config = _.assign(defaults,config);
};

util.inherits(Server,Emitter);

Server.prototype.start = function() {
    var port = this.config.port,
        self = this;

    io = new IOServer();
    io.listen(port);

    io.on('connection', function(socket) {
        Object.keys(handlers).map(function(value){
            socket.on(value,handlers[value].bind(self,socket));
        });

        self.emit('connection',socket.client.request);
    });

    this.emit('start',port);
};

Server.prototype.stop = function() {
    io.close();
    this.emit('stop');
};

var handlers = {
    'disconnect':function(socket) {
        this.emit('disconnect',socket.client.request);
    },
    'welcome':function(socket,data){
        socket.emit('welcome',{
            msg:'Welcome!',
            data:data
        });
    },
    'file-request':function(socket,data) {
        var stream = SocketStream.createStream();

        SocketStream(socket).emit('file-stream',stream,{
            /*Metadata informations or anyth*/
        });

        /*
         db.createReadStreamFromGridFs(data , ...).pipe(stream);
         */
    }
}