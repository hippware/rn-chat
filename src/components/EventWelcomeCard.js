import React from 'react';
import {View, Image} from 'react-native';
import CardText from './CardText';
import {k} from './Global';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import {Actions} from 'react-native-router-flux';

export default observer(() => {
  const isDay = location.isDay;
  return (
    <View style={{paddingTop: 10}}>
      <View
          style={{
            paddingLeft: 19 * k,
            paddingBottom: 10,
            paddingRight: 23 * k,
            flexDirection: 'row',
          }}
      >
        <CardText style={{fontFamily: 'Roboto-Medium'}} isDay={isDay}>
          @tinyrobot
        </CardText>
        <CardText isDay={isDay}> Welcome to TinyRobot!</CardText>
      </View>
      <View style={{height: 1, backgroundColor: 'rgb(228, 228, 228)'}} />
      <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 19 * k,
            paddingRight: 23 * k,
            flexDirection: 'row',
          }}
      >
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CardText isDay={isDay}>
            Here you'll find everything you need to know about your friends' bots and
            bots you'll subscribe to!
          </CardText>
          <CardText style={{paddingTop: 10}} isDay={isDay}>
            Tap
            {' '}
            <View style={{paddingTop: 15, width: 28, height: 30}}>
              <Image style={{width: 28, height: 30}} source={require('../../images/actionMenu.png')} />
            </View>
            to create your first bot
          </CardText>
          <CardText style={{paddingTop: 10}} isDay={isDay}>
            Tap
            {' '}
            <View style={{paddingTop: 15, width: 24, height: 22}}>
              <Image style={{width: 24, height: 22}} source={require('../../images/iconMessage.png')} />
            </View>
            to send messages to friends
          </CardText>
          <CardText style={{paddingTop: 10}} isDay={isDay}>Have fun! :)</CardText>
        </View>
      </View>
      <View style={{position: 'absolute', right: 0, bottom: 0, height: 15, width: 15}}>
        <Image source={require('../../images/iconNewPriority.png')} />
      </View>
    </View>
  );
});
