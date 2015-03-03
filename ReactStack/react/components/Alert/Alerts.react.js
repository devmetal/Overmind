/**
 * Created by metal on 2015.03.03..
 */
var React = require('react');
var AlertsStore = require('../../stores/AlertsStore');
var Alert = require('./Alert.react');

function getAlertsState() {
  return {
    alerts:AlertsStore.getAlerts()
  };
}

module.exports = Alerts = React.createClass({

  getInitialState: function() {
    return getAlertsState();
  },

  componentDidMount: function() {
    AlertsStore.addChangeListener(this._onStoreChange);
  },

  render: function() {

    var allAlerts = this.state.alerts;
    var alerts = null;
    var self = this;

    if (allAlerts) {
      alerts = Object.keys(this.state.alerts).map(function(key){
        var alert = self.state.alerts[key];
        console.log(alert);
        return (<Alert type={alert.type} closeable>{alert.text}</Alert>);
      });
    }

    return (
      <div>
        {alerts}
      </div>
    );
  },

  _onStoreChange: function() {
    this.setState(getAlertsState());
  }

});