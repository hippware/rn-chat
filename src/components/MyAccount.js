import React from "react";
import {View, TouchableOpacity, Text, StyleSheet, ScrollView, Image} from "react-native";
import BackgroundGradient from './BackgroundGradient';
import {k} from '../globals';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import SignUpAvatar from './SignUpAvatar';
import Separator from './Separator';
import {Actions} from 'react-native-router-flux';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import validators from './FormValidators';
import LogoutButton from './LogoutButton';
import ProfileInfo from './ProfileInfo';
import Screen from './Screen';
import ProfileStore from '../store/ProfileStore';

export default class MyAccount extends React.Component {
  componentWillReceiveProps(props){
    if (props.save) {
      const profileStore: ProfileStore = props.profile;
      profileStore.update(GiftedFormManager.stores.form.values);
      Actions.viewAccount();
    } else {
      console.log("EDIT MIDE:", props.editMode);
      GiftedFormManager.resetValues("myAccount");
    }

  }

  render(){
    const Group = GiftedForm.GroupWidget;
    const profile = this.props.model.profile;
    if (!profile){
      return null;
    }
    const {handle, firstName, lastName, email, avatar} = profile;
    const isDay = this.props.model.isDay;
    return (
      <Screen isDay={isDay}>
        <GiftedForm name="myAccount" formStyles={{containerView: {backgroundColor:'transparent'}}} contentContainerStyle={{ paddingBottom: 80*k}}
                    validators={validators} defaults={{handle, firstName, lastName, email}}>
          <SignUpAvatar avatar={avatar} profile={this.props.profile} isDay={isDay}
                        style={{top:0, backgroundColor:'rgb(243,244,246)',borderRadius:33*k, width:66*k, height:66*k}}/>

          {profile.error && <Text style={{color:'red', padding:10, textAlign:'center'}}>{profile.error}</Text>}

          {this.props.editMode ?
            <ProfileInfo isDay={isDay} profile={profile} editMode={true} /> :
            <TouchableOpacity onPress={Actions.editAccount}>
              <ProfileInfo isDay={isDay} profile={profile}/>
            </TouchableOpacity>
          }

          <Card isDay={isDay} style={{opacity:0.95}}>
            <Header>Settings</Header>
            <Separator width={1}/>
            <Cell image={require('../../images/iconVisibility.png')}>Visible to friends</Cell>
            <Separator width={1}/>
            <Cell image={require('../../images/iconLocation.png')}>Nearby filter is 2 miles</Cell>
          </Card>
          <Card isDay={isDay} style={{opacity:0.95}}>
            <Header>Notifications</Header>
            <Separator isDay={isDay} width={1}/>
            <Cell image={require('../../images/iconMessageXs.png')}>Notify me instantly for message activity</Cell>
            <Separator width={1}/>
            <Cell image={require('../../images/iconChannelXs.png')}>Notify me instantly for channel activity</Cell>
            <Separator width={1}/>
            <Cell image={require('../../images/iconBotXs.png')}>Notify me for all bot activity</Cell>
            <Separator width={1}/>
            <Cell image={require('../../images/iconNotifications.png')}>Don’t notify me for 3 people</Cell>
          </Card>
          <View style={{height:100}}>
            <LogoutButton profile={this.props.profile}/>

          </View>
        </GiftedForm>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 222,
    right: 0,
    opacity:0.79
  },
});

MyAccount.propTypes = {
  model: React.PropTypes.any.isRequired,
  profile: React.PropTypes.any.isRequired
};