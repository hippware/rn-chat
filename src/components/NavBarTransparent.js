import React, {Image, View, TouchableOpacity, PropTypes} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavBar from './NavBar';
import {Actions} from 'react-native-router-flux';
import FadeView from './FadeView';

class NavBarGradientDay extends React.Component {
    render(){
        return <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']}
                               style={{height:100}} pointerEvents="none"/>
    }
}

class NavBarGradientNight extends React.Component {
    render(){
        return <LinearGradient colors={['rgba(48,35,59,1)','rgba(47,35,59,0)']}
                               style={{height:100}} pointerEvents="none"/>
    }
}
export default class extends React.Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    render() {
        return <NavBar
            {...this.props}
            navigationBarStyle={{backgroundColor:'transparent'}}
            navBarHeaderDay={<NavBarGradientDay/>} navBarHeaderNight={<NavBarGradientNight/>}
        />;
    }

}


