import React, {Component, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class extends Component {
    render(){
        return  <LinearGradient colors={['rgba(255,255,255,0)','rgb(241,242,244)','rgb(243,244,246)']} locations={[0,0.2,1]} style={styles.container}/>;
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});