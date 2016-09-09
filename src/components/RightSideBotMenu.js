import React, {Component} from "react";
import {AppRegistry, View, Text, Image, StyleSheet, InteractionManager, TouchableOpacity} from "react-native";
import {k} from './Global';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';


function closeDrawers(){
  Actions.get('botMenu').ref.close({side:'right', animated:true});
  Actions.get('drawer').ref.close({side:'right', animated:true});
}
class MenuItem extends React.Component {
  render(){
    return <TouchableOpacity style={{paddingTop:25*k, paddingLeft:19*k, paddingRight:19*k}} onPress={this.props.onPress || (()=>{
      closeDrawers();
      this.props.action && this.props.action()
    })
    } testID={this.props.testID}>
        {this.props.image && <Image source={this.props.image} />}
      {this.props.children}
      {this.props.title && <Text style={{fontSize:12, fontFamily:'Roboto-Medium',letterSpacing:0.5, textAlign:'center', color: 'white'}}>
        {this.props.title}
      </Text>}
    </TouchableOpacity>;
  }
}

export default class RightSideMenu extends Component {
  render(){
    return <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'rgb(235,85,100)', paddingTop:36*k, padding:25*k, width:255*k}}>
      <View style={{top:36*k, position:'absolute', right:0, left:0}}><Text style={{fontFamily:'Roboto-Bold', fontSize:15, color: 'white', textAlign: 'center'}}>SELECT BOT</Text></View>
      <View style={{flexDirection:'row'}}>
        <MenuItem image={require('../../images/newLocation.png')} testID="newMessage" action={Actions.location} title="Location"/>
        <MenuItem image={require('../../images/botNote.png')} testID="newBot" title="Note" action={Actions.newBot}/>
      </View>
      <View style={{flexDirection:'row'}}>
        <MenuItem image={require('../../images/photo.png')} testID="newPhoto" title="Photo" action={Actions.newPhoto}/>
        <MenuItem onPress={()=>{}}><View style={{height: 81, width: 73}} /></MenuItem>
      </View>
      <TouchableOpacity onPress={()=>{
       closeDrawers();
      }}
                        style={{position:'absolute', bottom:30, right: 30}}><Image source={require('../../images/importedLayers.png')}></Image></TouchableOpacity>
    </View>;
  }
}
