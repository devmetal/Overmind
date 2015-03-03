/**
 * Created by Adam on 2015.02.25..
 */
var AlertsDispatcher = require('../dispatchers/AlertsDispatcher');
var EventEmitter     = require('events').EventEmitter;
var assign           = require('object-assign');
var constants        = require('../constants/AlertsConstants');

var alerts = {};

var alertCount = 0;

var createAlert = function(type,text) {
    var id = alertCount++;
    alerts[id] = {
      'type':type,
      'text':text
    };
};

var removeAlert = function(id) {
    delete alerts[id];
};

var AlertsStore = assign({},EventEmitter.prototype,{

    getAlerts:function() {
      return alerts;
    },

    emitChange:function() {
        this.emit(constants.STORE_CHANGE);
    },

    addChangeListener:function(cb){
        this.on(constants.STORE_CHANGE,cb);
    },

    dispatcher:AlertsDispatcher.register(function(payload){

        var action = payload.action;

        switch (action.actionType) {
            case constants.ALERT:
                createAlert(action.type,action.text);
                AlertsStore.emitChange();
                break;
            case constants.DISMISS:
                var id = action.id;
                removeAlert(id);
                AlertsStore.emitChange();
                break;
        }

        return true;

    })
});

module.exports = AlertsStore;

