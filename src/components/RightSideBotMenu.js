import React, {Component} from "react";
import {AppRegistry, View, Text, Image, StyleSheet, InteractionManager, TouchableOpacity} from "react-native";
import {k} from './Global';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';

class MenuItem extends React.Component {
  render(){
    return <TouchableOpacity style={{paddingTop:25*k, paddingLeft:19*k, paddingRight:19*k}} onPress={this.props.onPress || (()=>{
      Actions.get('drawer').ref.close({side:'right', animated:false});
      this.props.action && this.props.action()
    })
    } testID={this.props.testID}>
      <Image source={this.props.image} />
      <Text style={{fontSize:12, fontFamily:'Roboto-Medium',letterSpacing:0.5, textAlign:'center', color: 'white'}}>
        {this.props.title}
      </Text>
    </TouchableOpacity>;
  }
}

export default class RightSideMenu extends Component {
  render(){
    return <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'rgb(235,85,100)', paddingTop:36*k, padding:25*k, width:255*k}}>
      <View style={{top:36*k, position:'absolute', right:0, left:0}}><Text style={{fontFamily:'Roboto-Bold', fontSize:15, color: 'white', textAlign: 'center'}}>SELECT BOT</Text></View>
      <View style={{flexDirection:'row'}}>
        <MenuItem image={require('../../images/newLocation.png')} testID="newMessage" action={Actions.location} title="Location"/>
      <MenuItem image={require('../../images/newNote.png')} testID="newBot" title="Note" action={Actions.newBot}/>
      </View>
      <MenuItem image={require('../../images/newPhoto.png')} testID="newPhoto" title="Photo" action={Actions.newPhoto}/>
      <TouchableOpacity onPress={()=>{
        Actions.get('botMenu').ref.close({side:'right', animated:true});
         Actions.get('drawer').ref.close({side:'right', animated:true});
      }}
      style={{position:'absolute', bottom:30, right: 30}}><Image source={require('../../images/iconClose.png')}></Image></TouchableOpacity>
    </View>;
  }
}
