import React from "react";
import styles from './styles';

import {View, Image} from "react-native";

export default class extends React.Component {
    render(){
        return <View style={styles.center}><Image style={styles.launchIcon} source={require("../../images/logoMark.png")} /></View>

    }
}