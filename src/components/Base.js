import React from 'react';
import {View, Text} from 'react-native';
import StatusBarSizeIOS from 'react-native-status-bar-size';
import autobind from 'autobind-decorator';

@autobind
export default class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStatusBarHeight: StatusBarSizeIOS.currentHeight,
    };
  }
  
  componentDidMount() {
    StatusBarSizeIOS.addEventListener('willChange', this._handleStatusBarSizeWillChange);
    StatusBarSizeIOS.addEventListener('didChange', this._handleStatusBarSizeDidChange);
  }
  
  componentWillUnmount() {
    StatusBarSizeIOS.removeEventListener('willChange', this._handleStatusBarSizeWillChange);
    StatusBarSizeIOS.removeEventListener('didChange', this._handleStatusBarSizeDidChange);
  }
  
  _handleStatusBarSizeWillChange(nextStatusBarHeight) {
    console.log('Will Change: ' + nextStatusBarHeight);
  }
  
  _handleStatusBarSizeDidChange(currentStatusBarHeight) {
    console.log('changed');
    this.setState({ currentStatusBarHeight: currentStatusBarHeight });
  }
  
  render() {
    return (
      <View style={{position:'absolute',top:Math.max(this.state.currentStatusBarHeight - 20, 20),bottom:0,right:0,left:0, borderWidth:20}}>
        {this.props.children}
      </View>
    );
  }
}