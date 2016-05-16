import React, {Component, PropTypes} from "react";
import {StyleSheet, TouchableOpacity, Image} from "react-native";
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

class NavBarMessageButton extends Component {
    render(){
        return <TouchableOpacity testID="rightNavButton"
                                 onPress={Actions.messaging}
                                 style={[this.props.style, {width:60,justifyContent:'center',alignItems:'center'}]}>
            <Image source={this.props.isDay ? require('../../images/iconMessage.png') : require('../../images/iconMessageNight.png')}/>
        </TouchableOpacity>
    }
}
export default connect(state=>({isDay:state.location.isDay}))(NavBarMessageButton)