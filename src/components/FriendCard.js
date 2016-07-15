import React, {Component} from "react";
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from "react-native";
import moment from 'moment'
import Card from './Card';
import Avatar from './Avatar';
import CardText from './CardText';
import assert from 'assert';
import Profile from '../model/Profile';
import {k} from '../globals';
import ProfileItem from './ProfileItem';
import {Actions} from 'react-native-router-flux';
import {observer} from "mobx-react/native";
import statem from '../../gen/state';

@observer
export default class FriendCard extends React.Component {
  render(){
    const profile: Profile = this.props.profile;
    assert(profile, "Profile is not defined");
    return <TouchableOpacity onPress={()=>statem.logged.profileDetailsContainer({item:profile})}>
      <Card isDay={this.props.isDay} style={{paddingTop:10*k, paddingBottom: 5*k}}>
        <ProfileItem profile={profile} isDay={this.props.isDay}>
          {this.props.children}
        </ProfileItem>
      </Card>
    </TouchableOpacity>;
  }
}

