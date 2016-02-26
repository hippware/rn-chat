import React, {View, Text, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

class MyAccount extends React.Component {
    render(){
        return (
            <View style={{flex:1}}>
                <LinearGradient colors={['rgba(255,255,255,0)','rgb(241,242,244)','rgb(243,244,246)']} style={styles.container}/>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
                <Text>MY ACCOUNT</Text>
            </View>
        );
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
        opacity:0.8
    },
});

export default connect(state=>({profile:state.profile}))(MyAccount)