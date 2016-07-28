import React from "react";
import {View, Image} from "react-native";
import BackgroundVideo from './BackgroundVideo';
import styles from './styles';

export default class Launch extends React.Component {
    render(){
        return (
            <View style={{flex:1, alignItems: 'center', backgroundColor:'transparent'}}>
                <View style={styles.container}><Image style={styles.backgroundImage} source={require("../../images/LaunchScreen.png")} /></View>
                {this.props.children}
            </View>
        );
    }
}

