import React from "react";
const {Image, StyleSheet,View,TouchableOpacity,TouchableHighlight,Text} = React;
import styles from './styles';
import {k, navBarTextColorDay, navBarTextColorNight} from '../globals';
import { connect } from 'react-redux';

class Cell extends React.Component {
    render(){
        const cell = <View style={{flexDirection:'row', alignItems:'center', padding: 15*k}}>
            {this.props.image && <View style={{width:15*k, paddingLeft:5*k, paddingRight: 15*k, alignItems:'center'}}><Image source={this.props.image}/></View>}
            <View style={{flex:1}}><Text style={[{fontFamily:'Roboto-Regular',fontSize:15,color:this.props.isDay ? navBarTextColorDay : navBarTextColorNight }, this.props.textStyle]}>{this.props.children}</Text></View>
        </View>;

        if (this.props.onPress){
            return <TouchableOpacity {...this.props}>{cell}</TouchableOpacity>;
        } else {
            return cell;
        }
    }
}
export default connect(state=>({isDay:state.location.isDay}))(Cell)