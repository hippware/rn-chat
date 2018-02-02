// @flow

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import BotButton from './BotButton';
// import EventList from './EventListView';
import {observer, inject} from 'mobx-react/native';

// TODO: temporarily ignore bad file warnings
console.ignoredYellowBox = ['{"code"'];

@inject('wocky')
@observer
export default class Home extends React.Component<{}> {
  eventList: any;

  componentDidMount() {
    setTimeout(() => {
      // Actions.followers({userId: this.props.wocky.profile.id})
      // Actions.followed({userId: this.props.wocky.profile.id});
      Actions.botContainer();
    }, 500);
  }

  scrollToTop = () => {
    this.eventList && this.eventList.scrollToTop();
  };

  render() {
    return (
      // <View style={{flex: 1}}>
      //   <EventList ref={ref => (this.eventList = ref)} />
      //   <BotButton />
      // </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>SUCCESS!!</Text>

        <TouchableOpacity onPress={() => Actions.profileDetails({item: '1a175ee4-55d5-11e6-8fee-0eea5386eb69'})}>
          <Text style={{color: 'blue', marginTop: 10}}>Go to Miranda's profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.profileDetails({item: '668079ea-4d0b-11e7-94b5-0e600a8611a9'})}>
          <Text style={{color: 'blue', marginTop: 10}}>Go to Testyuser's profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.logout()}>
          <Text style={{color: 'blue', marginTop: 10}}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.botContainer()}>
          <Text style={{color: 'blue', marginTop: 10}}>Create bot</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.signUp()}>
          <Text style={{color: 'blue', marginTop: 10}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.fullMap()}>
          <Text style={{color: 'blue', marginTop: 10}}>Explore Nearby</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
