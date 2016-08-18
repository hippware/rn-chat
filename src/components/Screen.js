import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, ListView, View, Text} from "react-native";
import BackgroundGradient from './BackgroundGradient';
import {k, backgroundColorDay, backgroundColorNight} from '../globals';

export default class Screen extends Component {
    render(){
        return   <View {...this.props} style={{position:'absolute',top:0,left:0,right:0, bottom:0}}>
            <BackgroundGradient isDay={this.props.isDay}/>
            <View style={[{flex:1}, this.props.style]}>
                {this.props.children}
            </View>

        </View>

    }
}

Screen.propTypes = {
    isDay: React.PropTypes.bool.isRequired
};
