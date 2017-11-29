// @flow

import React, {Component} from 'react';
import {TouchableOpacity, View, FlatList, StyleSheet, Text, Image} from 'react-native';
import {colors} from '../constants';
import {k} from './Global';
import {observer} from 'mobx-react/native';

import EventCard from './event-cards/EventCard';
import model from '../model/model';
import locationStore from '../store/locationStore';
import eventStore from '../store/eventStore';
import profileStore from '../store/profileStore';
import ListFooter from './ListFooter';
import LinearGradient from 'react-native-linear-gradient';
import Swipeable from 'react-native-swipeable';
import {RText} from './common';

const leftContent = <Text />;
const HomeStreamHeader = observer(({visible}) => {
  return visible ? (
    <Swipeable leftContent={leftContent} rightContent={leftContent} onLeftActionRelease={() => (model.sessionCount += 1)} onRightActionRelease={() => (model.sessionCount += 1)}>
      <LinearGradient colors={['rgba(255,151,77,1)', 'rgba(253,56,134,1)']} style={styles.gradient}>
        <Image style={{width: 31.7 * k, height: 36.5 * k}} source={require('../../images/white.png')} />
        <View style={{flex: 1}}>
          <Text style={styles.welcome}>
            {'Welcome to '}
            <Text style={{fontFamily: 'Roboto-Bold'}}>tinyrobot</Text>
            ! We’ve added our team as your friends! You may unfollow us at anytime. 🎉
          </Text>
        </View>
      </LinearGradient>
    </Swipeable>
  ) : null;
});

class EventList extends Component {
  list: ?Object;

  scrollToTop = () => {
    this.list && this.list.props.data.length && this.list.scrollToIndex({animated: true, index: 0});
  };

  render() {
    const backgroundColor = locationStore.isDay ? colors.LIGHT_GREY : colors.backgroundColorNight;
    const footerImage = require('../../images/graphicEndHome.png');
    const finished = model.events.finished;
    const isFirstSession = model.sessionCount <= 2 && profileStore.isNew;

    return (
      <View style={{flex: 1, backgroundColor}}>
        <FlatList
          data={model.events.list.filter(i => i.event.id)}
          ref={r => (this.list = r)}
          // onRefresh=@TODO
          onEndReachedThreshold={0.5}
          onEndReached={eventStore.loadMore}
          initialNumToRender={2}
          ListHeaderComponent={() => <HomeStreamHeader visible={isFirstSession} />}
          ListFooterComponent={observer(() => <ListFooter footerImage={footerImage} finished={finished} />)}
          renderItem={({item}) => <EventCard item={item} />}
          keyExtractor={item => item.event.id}
        />
        <UpdateButton scroll={this.scrollToTop} visible={!isFirstSession} />
        <ReviewButton />
      </View>
    );
  }
}

const UpdateButton = observer(({scroll, visible}) =>
  (visible && model.events.listToAdd.length ? (
    <TouchableOpacity
      onPress={() => {
        scroll();
        setTimeout(eventStore.incorporateUpdates, 500);
      }}
      style={styles.updateButton}
    >
      <Image source={require('../../images/up.png')} style={{marginRight: 5 * k}} />
      <RText weight='Medium' color={colors.WHITE} size={12}>
          New Updates
      </RText>
    </TouchableOpacity>
  ) : null));

// TODO: 'Enjoying tinyrobot? Leave a review!'. https://github.com/hippware/rn-chat/issues/1484
const ReviewButton = () => null;

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
  updateButton: {
    position: 'absolute',
    top: 20 * k,
    paddingHorizontal: 40 * k,
    paddingVertical: 7 * k,
    backgroundColor: colors.PINK,
    alignSelf: 'center',
    borderRadius: 17 * k,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
