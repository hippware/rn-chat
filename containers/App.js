import React from 'react-native';
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Main from '../components/Main';

const {View} = React;
const {Router, Route, Animations, Schema} = require('react-native-redux-router');

export default class App extends React.Component {
    render(){
        return (
            <View style={{flex:1}}>
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'#F5FCFF'}}/>
                <Router>
                    <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
                    <Route name="login" component={Login} title="Login"/>
                    <Route name="main" component={Main}/>
                </Router>

            </View>
        );
    }
}
