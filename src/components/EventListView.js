// @flow

import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {colors} from '../constants';
import {k} from './Global';
import {observer} from 'mobx-react/native';
import {BlurView} from 'react-native-blur';

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

const botIcon = require('../../images/iconBot.png');

const LocationPopup = () => (
  <View style={styles.absolute}>
    <View style={[styles.absolute, {backgroundColor: 'rgb(85, 85, 85)', opacity: 0.5}]} />
    <BlurView blurType='light' blurAmount={10} style={[styles.absolute, {alignItems: 'center', justifyContent: 'center'}]}>
      <View style={styles.popup}>
        <Text style={[styles.title, {textAlign: 'center'}]}>{`Allow Location\r\nAccess`}</Text>
        <Image source={botIcon} style={{width: 60, height: 60, marginVertical: 15 * k}} resizeMode='contain' />
        <Text style={[styles.muted, {textAlign: 'center'}]}>{`We need your location to show you\r\nwhat's happening nearby!`}</Text>
        <View style={{flexDirection: 'row', marginVertical: 20 * k}}>
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('app-settings:{1}')}>
            <Text style={styles.btnText}>
              Change Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  </View>
);

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
        {!locationStore.enabled && <LocationPopup />}
      </View>
    );
  }
}

export default observer(EventList);

const styles = StyleSheet.create({
  absolute: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
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
  title: {
    marginTop: 10 * k,
    color: colors.PINK,
    fontSize: 30,
    lineHeight: 32 * k,
    fontFamily: 'Roboto-Light',
  },
  muted: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.DARK_GREY,
    marginTop: 5 * k,
  },
  popup: {
    marginHorizontal: 30 * k,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 30 * k,
    borderRadius: 5 * k,
  },
  button: {
    flex: 1,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
    alignItems: 'center',
    marginHorizontal: 5 * k,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: colors.WHITE,
  },
});
