// @flow

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import BotButton from './BotButton';
// import EventList from './EventListView';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
// import Connectivity from './Connectivity';

@autobind
@observer
export default class Home extends React.Component<{}> {
  eventList: any;

  scrollToTop() {
    this.eventList && this.eventList.scrollToTop();
  }

  render() {
    return (
      // <View style={{flex: 1}}>
      //   <EventList ref={ref => (this.eventList = ref)} />
      //   <BotButton />
      //   <Connectivity />
      // </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>SUCCESS!!</Text>

        <TouchableOpacity onPress={() => Actions.profileDetails({item: '1a175ee4-55d5-11e6-8fee-0eea5386eb69'})}>
          <Text style={{color: 'blue', marginTop: 10}}>Go to Miranda's profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.profileDetails({item: '668079ea-4d0b-11e7-94b5-0e600a8611a9'})}>
          <Text style={{color: 'blue', marginTop: 10}}>Go to Testyuser's profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.followers()}>
          <Text style={{color: 'blue', marginTop: 10}}>Followers</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.logout()}>
          <Text style={{color: 'blue', marginTop: 10}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
