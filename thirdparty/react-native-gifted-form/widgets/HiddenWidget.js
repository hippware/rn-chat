var React = require('react');var ReactNative = require('react-native');
var {
  View
} = ReactNative;

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  componentDidMount() {
    this._onChange(this.props.value);
  },
  
  getDefaultProps() {
    return {
      type: 'HiddenWidget',
    };
  },
  
  render() {
    return null;
  },

});
