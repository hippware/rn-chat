import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

export default class extends Component {
    render(){
        return <View style={styles.container}>
            <LinearGradient colors={['rgba(235,235,235,0)','rgba(252,252,252,0.89)','rgba(255,255,255,1)']} style={styles.top}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    top: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 222,
        right: 0,
        opacity:0.79
    },
});