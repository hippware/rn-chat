// @flow

import React from 'react';
import {Clipboard, Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {observer} from 'mobx-react/native';
import {colors} from '../../constants';
import {k} from '../../globals';
import botStore from '../../store/botStore';
import Bot from '../../model/Bot';
import locationStore from '../../store/locationStore';
import statem from '../../../gen/state';

type Props = {
  setPopOverVisible: Function,
  bot: Bot
};

class UserInfoRow extends React.Component {
  props: Props;

  showPopover = () => {
    const {setPopOverVisible} = this.props;
    Clipboard.setString(botStore.bot.address);
    this.refs.button.measure((ox, oy, w, h, px, py) => setPopOverVisible(true, {x: px, y: py, width: w, height: h}));
    setTimeout(() => setPopOverVisible(false), 2000);
  };

  render() {
    const bot = this.props.bot;
    const profile = bot.owner;
    return (
      <View style={styles.userInfoRow}>
        <View style={{flex: 1, marginRight: 10 * k}}>
          <Text numberOfLines={2} style={styles.title}>{`${bot.title}`}</Text>
          <Text style={styles.handleText}>
            {'by '}
            <Text style={{fontWeight: 'bold'}} onPress={() => statem.logged.profileDetails({item: profile.user})}>{`@${profile.handle}`}</Text>
          </Text>
        </View>

        {locationStore.location &&
          bot.location &&
          <View>
            <Image source={require('../../../images/buttonViewMapBG.png')} />
            <TouchableOpacity onLongPress={this.showPopover} ref='button' onPress={statem.botDetails.map} style={styles.botLocationButton}>
              <Image source={require('../../../images/iconBotLocation.png')} style={{marginRight: 5 * k, height: 20 * k}} resizeMode='contain' />
              <Text style={styles.distanceText}>
                {locationStore.distanceToString(
                  locationStore.distance(
                    locationStore.location.latitude,
                    locationStore.location.longitude,
                    bot.location.latitude,
                    bot.location.longitude
                  )
                )}
              </Text>
            </TouchableOpacity>
          </View>}
      </View>
    );
  }
}

export default observer(UserInfoRow);

const styles = StyleSheet.create({
  userInfoRow: {
    paddingTop: 15 * k,
    paddingBottom: 15 * k,
    paddingLeft: 20 * k,
    paddingRight: 20 * k,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  handleText: {
    fontSize: 13,
    letterSpacing: -0.1,
    color: colors.PURPLISH_GREY,
  },
  botLocationButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
});
