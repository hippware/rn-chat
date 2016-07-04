import React, {Component} from "react";
import {View, TouchableOpacity, Image} from "react-native";
import iconMenuDay from '../../images/iconMenu.png';
import iconMenuNight from '../../images/iconMenuNight.png';
import { Actions } from 'react-native-router-flux';
import location from '../store/location';

export default class NavBarMenuButton extends Component {
  render(){
    const { style, ...props } = this.props;
    return (<TouchableOpacity
      {...props}
      key="menuBtn"
      testID="leftNavButton"
      onPress={() => Actions.refresh({key: 'logged', open: value=>!value })}
      style={[style, { width: 60, justifyContent: 'center', alignItems: 'center' }]}
    >
      <Image source={location.isDay ? iconMenuDay : iconMenuNight } />
    </TouchableOpacity>);
  }
}

NavBarMenuButton.propTypes = {
  isDay: React.PropTypes.bool,
  style: View.propTypes.style,
};

NavBarMenuButton.contextTypes = {
  drawer: React.PropTypes.object
};

