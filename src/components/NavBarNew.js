import React, {Component} from "react";
import {View} from "react-native";
import {NavBar} from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {k, navBarTextColorDay, navBarTextColorNight, navBarBackgroundColorDay, navBarBackgroundColorNight} from '../globals';

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
        const isDay = this.props.isDay;
        const navTransparent = this.props.navTransparent;
        const navProps = {
            navigationBarStyle: {
                height:70,
                backgroundColor: navTransparent ? 'transparent' : (isDay ? navBarBackgroundColorDay : navBarBackgroundColorNight),
                borderBottomWidth: 0
            },
            backButtonImage: require('../../images/iconBackGray.png'),
            leftButtonIconStyle: {left: 10 * k},
            rightButtonIconStyle: {right: 10 * k},
            leftButtonStyle: {bottom: 10},
            rightButtonStyle: {bottom: 10},
            drawerImage: null,
            titleStyle: {
                color: isDay ? navBarTextColorDay : navBarTextColorNight,
                fontFamily: 'Roboto-Regular',
                fontSize: 18
            }
        };
        return (
          <View pointerEvents="box-none">
            {navTransparent && (isDay ? <NavBarGradientDay/> : <NavBarGradientNight/>)}
            <NavBar {...navProps} {...this.props} />
          </View>
        );
    }

}

NavBarNew.contextTypes = {
    drawer: React.PropTypes.object
};


export default connect(state=>({isDay:state.location.isDay}))(NavBarNew)