/**
 * Created by Adam on 2015.02.12..
 */
var grid = require('gridfs-stream');
var Promise = require('bluebird');
var mongoose = require('mongoose');

function DataStorage() {
    if (!(this instanceof DataStorage)) {
        return new DataStorage();
    }

    this.connection = null;
    this.gfs = null;
};

module.exports = DataStorage;

DataStorage.prototype.connect = function(host,db) {
    var self = this;
    return new Promise(function(resolve,reject) {
        mongoose.connect(uri(host, db), function (err) {
            if (err) {
                reject(err);
            } else {
                self.connection = mongoose.connection;
                self.gfs = grid(self.connection.db, mongoose.mongo);
                resolve();
            }
        });
    });
};

DataStorage.prototype.disconnect = function() {
    return new Promise(function(resolve,reject){
        mongoose.disconnect(function(err){
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

var states = [
    'disconnected',
    'connected',
    'connecting',
    'disconnecting'
]

DataStorage.prototype.state = function() {
    var code = this.connection.readyState;
    return {
        'text':states[code],
        'code':code
    };
};

DataStorage.prototype.stateAsync = function() {
    return Promise.resolve(this.state());
}

DataStorage.prototype.readAsync = function(fname) {
    return Promise.all([
        this.metaAsync(fname),
        this.streamAsync(fname)
    ]);
};

DataStorage.prototype.metaAsync = function(fname) {
    var self = this;
    return new Promise(function(resolve,reject){
        self.gfs.files.findOne({filename:fname},function(err,meta){
            if (err) {
                reject(err);
            } else {
                resolve(meta);
            }
        });
    });
};

DataStorage.prototype.streamAsync = function(fname) {
    return Promise.resolve(this.gfs.createReadStream({
        filename:fname
    }));
}

function uri(host,db) {
    return 'mongodb://' + host + '/' + db;
}