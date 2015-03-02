/**
 * Created by Adam on 2015.02.25..
 */
var Promise = require('es6-promise').Promise;
var assign  = require('object-assign');

var callbacks = [];
var promises  = [];

var BaseDispatcher = function(){};
BaseDispatcher.prototype = assign({},BaseDispatcher.prototype,{

    register:function(cb) {
        callbacks.push(cb);
    },

    dispatch:function(payload) {

        var resolves = [];
        var rejects  = [];

        promises = callbacks.map(function(_,i){
            return new Promise(function(resolve,reject){
                resolves[i] = resolve;
                rejects[i] = reject;
            });
        });

        callbacks.forEach(function(callback,i){
            Promise.resolve(callback(payload))
                .then(function(){
                    resolves[i](payload);
                },function(){
                    rejects[i](
                        new Error("BaseDispatcher callback unsuccessful")
                    );
                });
        });

        promises = [];
    }
});

module.exports = BaseDispatcher;
