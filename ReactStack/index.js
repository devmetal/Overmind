/**
 * Created by Adam on 2015.02.14..
 */
var assign = require('lodash/object/assign');

var reactStack = {
  Alert:require('./react/components/Alert/Alert.react.js'),
  Success:require('./react/components/Alert/Success.react'),
  Info:require('./react/components/Alert/Info.react'),
  Warning:require('./react/components/Alert/Warning.react'),
  Danger:require('./react/components/Alert/Danger.react')
};

/* Assign my components to window object */
assign(window,reactStack);