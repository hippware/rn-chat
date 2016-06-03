import React, {Component} from "react";
import {TouchableOpacity,  Alert, StyleSheet, ListView, View, Text} from "react-native";
import Screen from './Screen';
import Avatar from './Avatar';
import ProfileInfo from './ProfileInfo';
import ProfileAvatar from './ProfileAvatar';
import {Actions} from 'react-native-router-flux';
import ProfileOptions from './ProfileOptions';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import FriendStore from '../store/FriendStore';

export default class ProfileDetail extends Component {
  // static onRight({item, title}) {
  //   Actions.profileOptions({item, title});
  // }

  render(){
    const isDay = this.props.model.isDay;
    const profile = this.props.item;
    const message = this.props.message;
    const friendStore: FriendStore = this.props.friend;

    return <Screen isDay={isDay}>
      <View style={{paddingTop:10}}>
        <ProfileAvatar isDay={isDay} profile={profile}/>
        <ProfileInfo isDay={isDay} profile={profile} message={message}/>
        <Card isDay={isDay} style={{opacity:0.95}}>
          <Header>Options</Header>
          <Separator width={1}/>
          {message && <TouchableOpacity onPress={()=>{Actions.chat({item: message.openPrivateChat(profile)})}}>
            <Cell isDay={isDay}>Send a message</Cell>
          </TouchableOpacity>}
          <Separator width={1}/>
          {profile.isFriend && <TouchableOpacity onPress={()=>Alert.alert("Are you sure?", null, [
                        {text:'Yes', onPress:()=>friendStore.remove(profile.user)},
                        {text:'No'}
                        ])}>
            <Cell isDay={isDay}>Unfollow {profile.firstName || profile.displayName}</Cell>
          </TouchableOpacity>}
          {!profile.isFriend && <TouchableOpacity onPress={()=>friendStore.add(profile)}>
            <Cell isDay={isDay}>Follow {profile.firstName || profile.displayName}</Cell>
          </TouchableOpacity>}
          <Separator width={1}/>
          <Cell isDay={isDay} textStyle={{color:'red'}}>Block User</Cell>
        </Card>
      </View>
    </Screen>;
  }
}

ProfileDetail.propTypes = {
  model: React.PropTypes.any.isRequired,
  message: React.PropTypes.any.isRequired,
  friend: React.PropTypes.any.isRequired,
  item: React.PropTypes.any.isRequired
};