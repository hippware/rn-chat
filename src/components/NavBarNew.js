import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {NavBar} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import {k, navBarTextColorDay, navBarTextColorNight, navBarBackgroundColorDay, navBarBackgroundColorNight} from '../globals';
import assert from 'assert';

class NavBarGradientDay extends React.Component {
  render(){
    return <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']}
                           style={{height:137*k, top:-20}} pointerEvents="none"/>
  }
}

class NavBarGradientNight extends React.Component {
  render(){
    return <LinearGradient colors={['rgba(48,35,59,1)','rgba(47,35,59,0)']}
                           style={{height:137*k, top:-20}} pointerEvents="none"/>
  }
}

class NavBarNew extends Component {
  render() {
    assert(this.props.model, "model is not defined");
    const isDay = this.props.model.isDay;
    const navTransparent = this.props.navTransparent;
    const navProps = {
      navigationBarStyle: {
        height:70*k,
        backgroundColor: navTransparent ? 'transparent' : (isDay ? navBarBackgroundColorDay : navBarBackgroundColorNight),
        borderBottomWidth: 0
      },
      backButtonImage: require('../../images/iconBackGray.png'),
      leftButtonIconStyle: {left: 10 * k},
      rightButtonIconStyle: {right: 10 * k},
      leftButtonStyle: {bottom: 5*k},
      rightButtonTextStyle: {color: 'rgb(254, 92, 108)', textAlign: 'right', fontSize: 15},
      backButtonTextStyle: {color: 'rgb(155, 155, 155)', textAlign: 'left', fontSize: 15},
      leftButtonTextStyle: {color: 'rgb(155, 155, 155)', textAlign: 'left', fontSize: 15},
      drawerImage: null,
      titleStyle: {
        color: isDay ? navBarTextColorDay : navBarTextColorNight,
        fontFamily: 'Roboto-Regular',
        fontSize: 18*k,
        marginTop: 5*k,
      }
    };
    return (
      <View pointerEvents="box-none" style={styles.header}>
        {navTransparent && (isDay ? <NavBarGradientDay/> : <NavBarGradientNight/>)}
        <NavBar {...navProps} {...this.props} />
      </View>
    );
  }

}

NavBarNew.contextTypes = {
  drawer: React.PropTypes.object
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },

})

export default NavBarNew