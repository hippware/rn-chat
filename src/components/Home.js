// @flow

import React from 'react';
import {View} from 'react-native';
import BotButton from './BotButton';
import EventList from './EventListView';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';

@autobind
@observer
export default class Home extends React.Component {
  eventList: any;

  scrollToTop() {
    this.eventList && this.eventList.scrollToTop();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <EventList ref={ref => (this.eventList = ref)} />
        <BotButton />
      </View>
    );
  }
}
