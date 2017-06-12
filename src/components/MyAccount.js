import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView, Image} from 'react-native';
import BackgroundGradient from './BackgroundGradient';
import {k} from './Global';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import SignUpAvatar from './SignUpAvatar';
import Separator from './Separator';
import {Actions} from 'react-native-router-native';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import validators from './FormValidators';
import LogoutButton from './LogoutButton';
import ProfileInfo from './ProfileInfo';
import Screen from './Screen';
import profileStore from '../store/profileStore';
import location from '../store/locationStore';
import model from '../model/model';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import {colors} from '../constants';
import NavTitle from './NavTitle';
import NavBarRightButton from './NavBarRightButton';
import NavBar from './NavBar';

@autobind
@observer
export default class MyAccount extends React.Component {
  async save() {
    await profileStore.update(GiftedFormManager.stores.form.values);
    Actions.pop();
  }

  render() {
    const Group = GiftedForm.GroupWidget;
    const isDay = location.isDay;
    const profile = model.profile;
    if (!profile) {
      return <Screen isDay={isDay} />;
    }
    const {handle, firstName, lastName, email, avatar} = profile;
    return (
      <Screen isDay={isDay}>
        <GiftedForm
            testID='myAccount'
            formName='myAccount'
            formStyles={{containerView: {backgroundColor: 'transparent', paddingTop: 70 * k}}}
            validators={validators}
            defaults={{handle, firstName, lastName, email}}
        >
          <SignUpAvatar
              avatar={avatar}
              profile={this.props.profile}
              isDay={isDay}
              style={{
                top: 5,
                backgroundColor: 'rgb(243,244,246)',
                borderRadius: 33 * k,
                width: 66 * k,
                height: 66 * k,
              }}
          />

          {profile.error &&
            <Text style={{color: 'red', padding: 10, textAlign: 'center'}}>
              {profile.error}
            </Text>}

          <ProfileInfo isDay={isDay} profile={profile} editMode />

          <View style={{height: 100}}>
            <LogoutButton />

          </View>
        </GiftedForm>
        <NavBar>
          <NavTitle>@{profile.handle}</NavTitle>
          <NavBarRightButton onPress={this.save} active>
            <Text style={styles.follow}>Save</Text>
          </NavBarRightButton>
        </NavBar>
      </Screen>
    );
    // <Card isDay={isDay} style={{opacity:0.95}}>
    //   <Header>Settings</Header>
    //   <Separator width={1}/>
    //   <Cell image={require('../../images/iconVisibility.png')}>Visible to friends</Cell>
    //   <Separator width={1}/>
    //   <Cell image={require('../../images/iconLocation.png')}>Nearby filter is 2 miles</Cell>
    // </Card>
    // <Card isDay={isDay} style={{opacity:0.95}}>
    // <Header>Notifications</Header>
    // <Separator isDay={isDay} width={1}/>
    //   <Cell image={require('../../images/iconMessageXs.png')}>Notify me instantly for message activity</Cell>
    //   <Separator width={1}/>
    //   <Cell image={require('../../images/iconBotXs.png')}>Notify me for all bot activity</Cell>
    //   <Separator width={1}/>
    //   <Cell image={require('../../images/iconNotifications.png')}>Don’t notify me for 3 people</Cell>
    //   </Card>
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 222,
    right: 0,
    opacity: 0.79,
  },
  follow: {
    color: colors.PINK,
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
  },
});
