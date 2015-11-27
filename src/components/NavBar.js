'use strict';

var NavigationBar = require('react-native-navbar');
var React = require('react-native');
var {StyleSheet,View} = React;
var {Actions} = require('react-native-redux-router');

class NavBarBase extends React.Component {
    onPrev(){
        if (this.props.onPrev){
            this.props.onPrev();
            return;
        }
        if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
            Actions.pop();
        }
    }
    render() {
        return <NavigationBar style={styles.navBar}
                              titleColor='white'
                              buttonsColor='white'
                              statusBar='lightContent'
                              onPrev={this.props.navigator.getCurrentRoutes().length > 1 ? this.props.onPrev || Actions.pop : null}
                              onNext={this.props.onNext || Actions.pop}
            {...this.props}
        />
    }
}
export default class NavBar extends React.Component {
    render() {
        return <NavBarBase {...this.props}/>
    }
}


export class NavBarModal extends React.Component {
    render() {
        return <NavBarBase customPrev={<View/>} nextTitle="Close" {...this.props}/>
    }
}

var styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#0db0d9'
    }
});


