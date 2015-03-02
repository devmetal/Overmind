/**
 * Created by Adam on 2015.02.25..
 */
var AlertsDispatcher = require('../dispatchers/AlertsDispatcher');
var EventEmitter     = require('events').EventEmitter;
var assign           = require('object-assign');
var constants        = require('../Constants');
var actions = constants.alerts.actions;

var alerts = {};

var alertCount = 0;

var createAlert = function(alert) {
    var id = alertCount++;
    alerts[id] = assign({},alert);
};

var removeAlert = function(id) {
    delete alerts[id];
};

var AlertsStore = assign({},EventEmitter.prototype,{

    emitChange:function() {
        this.emit(constants.store.change);
    },

    addChangeListener:function(cb){
        this.on(constants.store.change,cb);
    },

    dispatcher:AlertsDispatcher.register(function(payload){

        var action = payload.action;

        switch (action.type) {
            case actions.alert:
                createAlert(action.alert);
                AlertsStore.emitChange();
                break;
            case actions.dismiss:
                var id = action.id;
                removeAlert(id);
                AlertsStore.emitChange();
                break;
        }

        return true;

    })
});

module.exports = AlertsStore;

