import React from 'react-native';
const {View, Image, Text, TextInput, StyleSheet, TouchableOpacity} = React;
import {Actions} from 'react-native-router-flux';

export default class Launch extends React.Component {
    componentDidMount(){
        setTimeout(()=>Actions.processLogin(),50);
    }

    render(){
        return <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor:'transparent'}}>
            <Text>Loading...</Text>
        </View>

    }
}

