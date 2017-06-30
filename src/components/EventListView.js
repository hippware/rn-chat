// @flow

import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {colors} from '../constants';
import {k} from './Global';
import {observer} from 'mobx-react/native';

import EventCard from './EventCard';
import model from '../model/model';
import locationStore from '../store/locationStore';
import eventStore from '../store/eventStore';
import FilterTitle from './FilterTitle';
import ListFooter from './ListFooter';
import LinearGradient from 'react-native-linear-gradient';
import Swipeable from 'react-native-swipeable';

const leftContent = <Text />;
const HomeStreamHeader = observer(() => {
  return model.sessionCount <= 2
    ? <Swipeable
        leftContent={leftContent}
        rightContent={leftContent}
        onLeftActionRelease={() => (model.sessionCount += 1)}
        onRightActionRelease={() => (model.sessionCount += 1)}
    >
        <LinearGradient colors={['rgba(255,151,77,1)', 'rgba(253,56,134,1)']} style={styles.gradient}>
          <Image style={{width: 31.7 * k, height: 36.5 * k}} source={require('../../images/white.png')} />
          <View style={{flex: 1}}>
            <Text style={styles.welcome}>
              {'Welcome to '}
              <Text style={{fontFamily: 'Roboto-Bold'}}>tinyrobot</Text>
              ! We’ve added our team as your friends! You may unfollow us at
              anytime. 🎉
            </Text>
          </View>
        </LinearGradient>
      </Swipeable>
    : null;
});

class EventList extends Component {
  scrollTo = (data: Object) => {
    this.refs.list.scrollToOffset(data);
  };

  render() {
    const backgroundColor = locationStore.isDay ? colors.LIGHT_GREY : colors.backgroundColorNight;
    const footerImage = require('../../images/graphicEndHome.png');
    const {finished} = model.events;
    return (
      <View style={{flex: 1, backgroundColor}}>
        <FlatList
            data={model.events.list.filter(i => i.event && i.event.id)}
            contentContainerStyle={{paddingTop: 70 * k}}
            ref='list'
          // onRefresh=@TODO
            onEndReachedThreshold={0.5}
            onEndReached={eventStore.loadMore}
            initialNumToRender={2}
            ListHeaderComponent={() => <HomeStreamHeader />}
            ListFooterComponent={() => <ListFooter footerImage={footerImage} finished={finished} />}
            renderItem={({item}) => <EventCard item={item} />}
            keyExtractor={item => `${item.event.id}`}
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

export default observer(EventList);

const styles = StyleSheet.create({
  gradient: {
    height: 95 * k,
    paddingTop: 17.5 * k,
    paddingRight: 26.6 * k,
    paddingLeft: 17.5 * k,
    flexDirection: 'row',
  },
  welcome: {
    paddingLeft: 19.8 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
    color: 'white',
    backgroundColor: 'transparent',
  },
});
