/**
 * Created by Adam on 2015.02.22..
 */
var React = require('react');

var Dissmiss = React.createClass({
  render:function(){
    return(
      <button type="button" className="close" data-dismiss="alert">×</button>
    )
  }
});

module.exports = Alert = React.createClass({
    render:function(){

      var classString = 'alert ';

      if (this.props.type) {
        classString += this.props.type;
      }

      var dismiss;
      if (this.props.closable) {
        dismiss = <Dissmiss />;
        classString += ' alert-dismissable ';
      }

      return (
          <div className={classString} role="alert">
            {dismiss}
            {this.props.children}
          </div>
      )
    }
});