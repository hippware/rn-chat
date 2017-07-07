import React, {Component} from 'react';
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from 'react-native';
import {backgroundColorCardDay, backgroundColorCardNight} from '../constants/colors';
import moment from 'moment';
import Card from './Card';
import Avatar from './Avatar';
import CardText from './CardText';
import assert from 'assert';
import Profile from '../model/Profile';
import {k} from './Global';
import ProfileItem from './ProfileItem';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native';
import statem from '../../gen/state';
import Separator from './Separator';

@observer
export default class FriendCard extends React.Component {
  render() {
    const profile: Profile = this.props.profile;
    assert(profile, 'Profile is not defined');
    const backgroundColor = this.props.isDay ? backgroundColorCardDay : backgroundColorCardNight;
    return (
      <TouchableOpacity onPress={() => statem.logged.profileDetails({item: profile.user})}>

        <ProfileItem profile={profile} isDay={this.props.isDay} style={{backgroundColor}}>
          {this.props.children}
        </ProfileItem>
      </TouchableOpacity>
    );
  }
}
