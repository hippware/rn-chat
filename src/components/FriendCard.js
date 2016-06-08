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

export default class FriendCard extends React.Component {
  render(){
    const profile: Profile = this.props.profile;
    assert(profile, "Profile is not defined");
    return <TouchableOpacity onPress={()=>Actions.profileDetail({item:profile, title:profile.displayName})}>
      <Card isDay={this.props.isDay} style={this.props.style}
            >
        <ProfileItem profile={profile} isDay={this.props.isDay}/>
      </Card>
    </TouchableOpacity>;
  }
}

