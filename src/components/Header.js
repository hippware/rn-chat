import React from 'react-native';
const {StyleSheet,View,TouchableHighlight,Text} = React;
import {k, navBarTextColorDay, navBarTextColorNight} from '../globals';
import { connect } from 'react-redux';

class Header extends React.Component {
    render(){
        return <View style={{padding: 15*k}}><Text style={{fontFamily:'Roboto-Medium',fontSize:16,color:this.props.isDay ? navBarTextColorDay : navBarTextColorNight }}>{this.props.children}</Text></View>
    }
}

export default connect(state=>({isDay:state.location.isDay}))(Header)