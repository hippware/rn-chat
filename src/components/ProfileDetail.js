import React, {Component} from "react";
import {TouchableOpacity,  Alert, StyleSheet, ListView, View, Text} from "react-native";
import Screen from './Screen';
import Avatar from './Avatar';
import ProfileInfo from './ProfileInfo';
import ProfileAvatar from './ProfileAvatar';
import {Actions} from 'react-native-router-native';
import ProfileOptions from './ProfileOptions';
import Card from './Card';
import Cell from './Cell';
import CellWithText from './CellWithText';
import Header from './Header';
import Separator from './Separator';
import friendStore from '../store/friend';
import Profile from '../model/Profile';
import message from '../store/message';
import location from '../store/location';
import statem, {ProfileDetailsState} from '../../gen/state';
import profileStore from '../store/profile';

export default class ProfileDetail extends Component {
  // static onRight({item, title}) {
  //   Actions.profileOptions({item, title});
  // }
  static title({item}){
    return <Text>{item.firstName} {item.lastName}</Text>
  }

  render(){
    const isDay = location.isDay;
    const profile: Profile = profileStore.create(this.props.item);
    const state: ProfileDetailsState = statem.profileDetails;

    return <Screen isDay={isDay}>
      <View>
        <ProfileAvatar isDay={isDay} profile={profile} tappable={false}/>
        <ProfileInfo isDay={isDay} profile={profile} message={message}/>
        <Card isDay={isDay} style={{opacity:0.95}}>
          <Header>Options</Header>
          <Separator width={1}/>
          {message && <TouchableOpacity onPress={()=>setTimeout(()=>state.openPrivateChat(profile))}>
            <CellWithText isDay={isDay}>Send a message</CellWithText>
          </TouchableOpacity>}
          <Separator width={1}/>
          {profile.isFollowed && <TouchableOpacity onPress={()=>Alert.alert("Are you sure?", null, [
                        {text:'Yes', onPress:()=>friendStore.unfollow(profile)},
                        {text:'No'}
                        ])}>
            <CellWithText isDay={isDay}>Unfollow {profile.displayName}</CellWithText>
          </TouchableOpacity>}
          {!profile.isFollowed && <TouchableOpacity onPress={()=>friendStore.add(profile)}>
            <CellWithText isDay={isDay}>Follow {profile.displayName}</CellWithText>
          </TouchableOpacity>}
  
          <Separator width={1}/>
          {profile.hidePosts && <TouchableOpacity onPress={()=>state.showPosts(profile)}>
            <CellWithText image={require('../../images/show.png')} isDay={isDay}>Show {profile.displayName}'s Posts
            </CellWithText>
          </TouchableOpacity>}
          {!profile.hidePosts && <TouchableOpacity onPress={()=>state.hidePosts(profile)}>
            <CellWithText image={require('../../images/hide.png')} isDay={isDay}>Hide {profile.displayName}'s Posts
              </CellWithText>
          </TouchableOpacity>}
  
  
          <Separator width={1}/>

          {!profile.isBlocked && <TouchableOpacity onPress={()=>Alert.alert("Are you sure?", null, [
                        {text:'Yes', onPress:()=>friendStore.block(profile)},
                        {text:'No'}
                        ])}>
            <CellWithText isDay={isDay} textStyle={{color:'red'}}>Block {profile.firstName || profile.displayName}</CellWithText>
          </TouchableOpacity>}
          {profile.isBlocked && <TouchableOpacity onPress={()=>friendStore.unblock(profile)}>
            <CellWithText isDay={isDay} textStyle={{color:'red'}}>Unblock {profile.firstName || profile.displayName}</CellWithText>
          </TouchableOpacity>}

        </Card>
      </View>
    </Screen>;
  }
}

ProfileDetail.propTypes = {
  item: React.PropTypes.any.isRequired
};