import React from 'react-native';
const {Image, StyleSheet,View,TouchableHighlight,Text} = React;
import styles from './styles';
import {k, navBarTextColorDay, navBarTextColorNight} from '../globals';
import { connect } from 'react-redux';

class Cell extends React.Component {
    render(){
        return <View style={{flexDirection:'row', alignItems:'center', padding: 15*k}}>
            {this.props.image && <View style={{width:15*k, alignItems:'center'}}><Image source={this.props.image}/></View>}
            <View style={{flex:1, paddingLeft: 11*k}}><Text style={{fontFamily:'Roboto-Regular',fontSize:15,color:this.props.isDay ? navBarTextColorDay : navBarTextColorNight }}>{this.props.children}</Text></View>
        </View>
    }
}
export default connect(state=>({isDay:state.location.isDay}))(Cell)