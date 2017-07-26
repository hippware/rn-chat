import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Avatar from './Avatar';
import {k} from './Global';
import {colors} from '../constants';
import Bot from '../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import {Actions} from 'react-native-router-flux';
import autobind from 'autobind-decorator';

type Props = {
  bot: Bot,
};

const styles = StyleSheet.create({
  text: {
    color: colors.DARK_GREY,
    fontFamily: 'Roboto-Regular',
    fontSize: 13 * k,
  },
});

const Separator = () => <View style={{width: 1, height: 12 * k, backgroundColor: colors.DARK_GREY}} />;

@autobind
@observer
export default class extends React.Component {
  props: Props;

  render() {
    const bot = this.props.bot;
    const distance = location.location
      ? location.distanceToString(location.distance(location.location.latitude, location.location.longitude, bot.location.latitude, bot.location.longitude))
      : null;
    return (
      <View style={{flexDirection: 'row', height: 40 * k, alignItems: 'center'}}>
        <View style={{padding: 10 * k}}>
          <Image source={require('../../images/iconSubSmall.png')} />
        </View>
        <View style={{paddingRight: 10 * k}}>
          <Text style={styles.text}>
            {bot.followersSize}
          </Text>
        </View>
        <Separator />
        <View style={{padding: 10 * k}}>
          <Image source={require('../../images/iconPhotosHs.png')} />
        </View>
        <View style={{paddingRight: 10 * k}}>
          <Text style={styles.text}>
            {bot.imagesCount}
          </Text>
        </View>
        <View style={{flex: 1}} />
        <View style={{padding: 10 * k}}>
          <Image source={require('../../images/iconBotLocation2.png')} />
        </View>
        <View style={{paddingRight: 15 * k}}>
          <Text style={styles.text}>
            {distance}
          </Text>
        </View>
      </View>
    );
  }
}
