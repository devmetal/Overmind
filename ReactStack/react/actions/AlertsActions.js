/**
 * Created by metal on 2015.03.03..
 */
var AlertDispatcher = require('../dispatchers/AlertsDispatcher');
var Constants = require('../constants/AlertsConstants');

var AlertsActions = {

  alert: function(text,type) {
    AlertDispatcher.handleAlertAction({
      actionType:Constants.ALERT,
      text:text,
      type:type
    });
  },

  destroy: function(id) {
    AlertDispatcher.handleAlertAction({
      actionType:Constants.DISMISS,
      id:id
    });
  }

};

module.exports = AlertsActions;