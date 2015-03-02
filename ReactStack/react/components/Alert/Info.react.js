/**
 * Created by metal on 2015.02.25..
 */
var React = require('react');
var Alert = require('./Alert.react.js');

module.exports = Info = React.createClass({
  render: function() {
    return (
      <Alert type='alert-info' {...this.props}>
        {this.props.children}
      </Alert>
    )
  }
});