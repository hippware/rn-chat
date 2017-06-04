// @flow

import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {colors} from '../constants';
import {k} from './Global';
import {observer} from 'mobx-react/native';

import EventCard from './EventCard';
import model from '../model/model';
import location from '../store/locationStore';
import eventStore from '../store/eventStore';
import FilterTitle from './FilterTitle';
import ListFooter from './ListFooter';

@observer
export default class EventList extends Component {
  scrollTo = (data: Object) => {
    this.refs.list.scrollToOffset(data);
  };

  render() {
    const backgroundColor = location.isDay ? colors.LIGHT_GREY : colors.backgroundColorNight;
    const footerImage = require('../../images/graphicEndHome.png');
    return (
      <View style={{flex: 1, backgroundColor}}>
        <FlatList
            data={model.events.list}
            contentContainerStyle={{paddingTop: 50 * k}}
            ref='list'
          // onRefresh=@TODO
            onEndReachedThreshold={0.5}
            onEndReached={eventStore.loadMore}
            initialNumToRender={2}
            ListFooterComponent={() => <ListFooter footerImage={footerImage} finished={model.events.finished} />}
            renderItem={({item}) => <EventCard item={item} />}
            keyExtractor={(item, index) => `${item.event.id}-${index}`}
        />
        <FilterTitle
            onPress={() => {
              this.refs.list.scrollToOffset({x: 0, y: 0});
            }}
        />
      </View>
    );
  }
}
