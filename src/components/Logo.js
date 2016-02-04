import React from 'react-native';
import styles from './styles';

const {View, Image} = React;
export default class extends React.Component {
    render(){
        return <View style={styles.center}><Image style={styles.launchIcon} source={require("../../images/logoMark.png")} /></View>

    }
}