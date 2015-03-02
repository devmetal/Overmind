/**
 * Created by metal on 2015.02.25..
 */
var React = require('react');
var Alert = require('./Alert.react.js');

module.exports = Danger = React.createClass({
  render: function() {
    return (
      <Alert type='alert-danger' {...this.props}>
        {this.props.children}
      </Alert>
    )
  }
});