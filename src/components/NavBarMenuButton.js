import React, { View, Component, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import iconMenuDay from '../../images/iconMenu.png';
import iconMenuNight from '../../images/iconMenuNight.png';
import { Actions } from 'react-native-router-flux';

class NavBarMenuButton extends Component {
  render(){
    const { isDay, style, ...props } = this.props;
    return (<TouchableOpacity
      {...props}
      key="menuBtn"
      testID="leftNavButton"
      onPress={() => this.context.drawer.toggle()}
      style={[style, { width: 60, justifyContent: 'center', alignItems: 'center' }]}
    >
      <Image source={isDay ? iconMenuDay : iconMenuNight } />
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

export default connect(state => ({
  isDay: state.location.isDay,
  fullMap: state.location.fullMap,
}))(NavBarMenuButton);
