import React from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
import {k} from '../globals';
import ResizedImage from './ResizedImage';
import { Actions } from 'react-native-router-flux';
import Profile from '../model/Profile';
import Chats from '../model/Chats';
import Chat from '../model/Chat';
import {observer} from "mobx-react/native";
import location from '../store/location';
import EventFriend from '../model/EventFriend';

@observer
export default class EventFriendCard extends React.Component {
  render(){
    const isDay = location.isDay;
    const eventFriend: EventFriend = this.props.item;
    const profile: Profile = eventFriend.profile;
    return (
      <Card style={[{ top: 10},this.props.style]}
            isDay={isDay}
            onPress={()=>this.props.onPress(chat)}
            innerStyle={{paddingTop:20*k,paddingLeft:1,paddingRight:1,paddingBottom:10*k}}
            footer={
                        <View style={{position:'absolute',top:0,left:30*k,right:0,height:40*k}}>
                          <View style={{flex:1, flexDirection:'row'}}>
                              <Avatar size={40*k} source={profile.avatar && profile.avatar.source} title={profile.displayName} isDay={isDay}/>
                          </View>

                            {this.props.onPostOptions && <TouchableOpacity ref='button' onPress={e=>this.props.onPostOptions(e, this.refs.button)}
                                style={{position:'absolute', flexDirection:'row', alignItems:'center', top:20*k, right:10*k}}>
                                <Text style={{fontFamily:'Roboto-Light',fontSize:12, color:'rgb(155,155,155)'}}>{eventFriend.date} </Text>
                                <Image source={require("../../images/iconPostOptions.png")}/>
                            </TouchableOpacity>}
                            {!this.props.onPostOptions && <View style={{position:'absolute', backgroundColor:'transparent', flexDirection:'row', alignItems:'center', top:20*k, right:5*k}}>
                                    <Text style={{fontFamily:'Roboto-Light',fontSize:12*k, color:'rgb(155,155,155)'}}>{eventFriend.date}</Text>
                                </View>
                                }
                        </View>
                        }>
        <Text style={{padding:15*k}}>
          <CardText isDay={isDay}>@{profile.handle} </CardText>
          <Text style={{fontFamily:'Roboto-Light',color:isDay ? 'rgb(81,67,96)' : 'white',fontSize:15}}>followed you</Text>
        </Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  smallText: {
    fontFamily:'Roboto-Regular',
    fontSize:12,
    color:'rgb(155,155,155)'
  }
  
});

