/**
 * Created by Adam on 2015.02.25..
 */
var BaseDispatcher = require('./BaseDispatcher');
var assign  = require('object-assign');

var AlertsDispatcher = assign({},BaseDispatcher.prototype,{
    handleAlertAction:function(action) {
        this.dispatch({
            source: 'ALERT_ACTION',
            action:action
        });
    }
});

module.exports = AlertsDispatcher;