import React, {Component} from "react";
import {AppRegistry, View, Text, Image, StyleSheet, InteractionManager, TouchableOpacity} from "react-native";
import {k} from './Global';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';

class MenuItem extends React.Component {
  render(){
    return <TouchableOpacity style={{paddingTop:25*k,flex:1}} onPress={this.props.onPress || (()=>{
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
    return <View style={{flex:1, alignItems:'center', justifyContent:'center', width:120*k}}>
      <View style={{height:200*k, backgroundColor:'rgb(254,92,108)', paddingTop:30*k, width:120*k, alignItems:'center'}}>
        <MenuItem image={require('../../images/newMessage.png')} testID="newMessage" action={()=>statem.logged.createMessageContainer()} title="Message"/>
      </View>
      <View style={{flex:1, backgroundColor:'rgb(223,79,96)',paddingBottom:30*k, width:120*k,alignItems:'center',}}>
      <MenuItem image={require('../../images/newLocation.png')} testID="newLocationBot" action={()=>statem.logged.createBotContainer({botType:LOCATION})} title="Location Bot"/>
      <MenuItem image={require('../../images/botNote.png')} testID="newNoteBot" title="Note Bot" action={()=>statem.logged.createBotContainer({botType:NOTE})}/>
      <MenuItem image={require('../../images/photo.png')} testID="newPhotoBot" title="Photo Bot" action={()=>statem.logged.createBotContainer({botType:IMAGE})}/>
      </View>
    </View>;
  }
}
