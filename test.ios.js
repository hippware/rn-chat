import React from 'react-native';
const {AppRegistry, Text, View} = React;
import App from './src/App';
class HelloWorld extends React.Component {
    render(){
        return <View><Text>Hello world</Text></View>;
    }
}
AppRegistry.registerComponent('ChatTest', () => HelloWorld);
