import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Popover from 'react-native-popover';
import {colors} from '../constants';
import autobind from 'autobind-decorator';

@autobind
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  showPopover() {
    this.props.onLongPress && this.props.onLongPress();
    this.button.measure((ox, oy, width, height, px, py) => {
      this.setState({
        isVisible: true,
        buttonRect: {x: px - 100, y: py - 20, width, height},
      });
    });
    setTimeout(this.closePopover, 2000);
  }
  closePopover() {
    this.setState({isVisible: false});
  }
  render() {
    return (
      <View>
        <TouchableOpacity ref={ref => (this.button = ref)} onLongPress={this.showPopover} onPress={this.props.onPress}>
          {this.props.children}
        </TouchableOpacity>
        <Popover
          isVisible={this.state.isVisible}
          fromRect={this.state.buttonRect}
          onClose={this.closePopover}
          {...this.props}
        >
          {this.props.popover}
        </Popover>
      </View>
    );
  }
}