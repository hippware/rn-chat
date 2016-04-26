import React, {TouchableOpacity, TextInput, Image, StyleSheet, ListView, View, Text, Component} from 'react-native';
import Screen from './Screen';
import { connect } from 'react-redux';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import {k} from '../globals';
import * as actions from '../actions';
import {Actions} from 'react-native-router-flux';

class AddFriendByUsername extends Component {
    componentWillReceiveProps({error}){
        if (error){
            alert(error);
        }
    }
    render(){
        return <Screen>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', height:53*k, backgroundColor:'white'}}>
                <View style={{paddingLeft:22.6*k, paddingRight:14.8*k}}><Image source={require('../../images/iconSearchHome.png')}/></View>
                <TextInput autoFocus autoCorrect={false} autoCapitalize='none' onChangeText={(text) => Actions.refresh({text})}
                           value={this.props.text} placeholder='Enter username' placeholderColor='rgb(211,211,211)'
                           style={{fontSize:15*k, fontFamily:'Roboto-Light', height:53*k, flex:1}}/>
                <TouchableOpacity onPress={()=>Actions.refresh({text:''})}><View style={{paddingRight:22.6*k, paddingLeft:14.8*k}}><Image source={require('../../images/iconClose.png')}/></View></TouchableOpacity>
            </View>

        </Screen>;
    }
}

export default connect(state=>({error:state.roster.error}))(AddFriendByUsername)
