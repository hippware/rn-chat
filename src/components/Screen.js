import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, ListView, View, Text} from "react-native";
import BackgroundGradient from './BackgroundGradient';
import {k, backgroundColorDay, backgroundColorNight} from '../globals';

export default class Screen extends Component {
    render(){
        return   <View style={{position:'absolute',top:0,left:0,right:0, bottom:0}}>
            <BackgroundGradient/>
            <View style={{flex:1, top:70*k, paddingBottom:70*k}}>
                {this.props.children}
            </View>

        </View>

    }
}
