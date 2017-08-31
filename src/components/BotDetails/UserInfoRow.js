// @flow

import React from 'react';
import {Clipboard, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {observer} from 'mobx-react/native';
import {colors} from '../../constants';
import {k} from '../../globals';
import Bot from '../../model/Bot';
import locationStore from '../../store/locationStore';
import {Actions} from 'react-native-router-flux';
import {RText} from '../common';

type Props = {
  setPopOverVisible: Function,
  bot: Bot,
};

@observer
class UserInfoRow extends React.Component {
  props: Props;
  button: any;

  showPopover = () => {
    const {setPopOverVisible} = this.props;
    Clipboard.setString(this.props.bot.address);
    this.button.measure((ox, oy, w, h, px, py) => setPopOverVisible(true, {x: px, y: py, width: w, height: h}));
    setTimeout(() => setPopOverVisible(false), 2000);
  };

  render() {
    const bot = this.props.bot;
    const profile = bot.owner;
    return (
      <View style={styles.userInfoRow}>
        <View style={{flex: 1, marginRight: 10 * k}}>
          <RText numberOfLines={2} size={18}>{`${bot.title}`}</RText>
          <View style={{flexDirection: 'row'}}>
            <RText size={15} color={colors.PURPLISH_GREY} style={{letterSpacing: -0.1}}>{'by '}</RText>
            <TouchableOpacity onPress={() => Actions.profileDetails({item: profile.user})}>
              <RText weight='Medium' size={15} color={colors.COOL_BLUE}>{`@${profile.handle}`}</RText>
            </TouchableOpacity>
          </View>
        </View>

        {locationStore.location &&
          bot.location &&
          <View>
            <Image source={require('../../../images/buttonViewMapBG.png')} />
            <TouchableOpacity onLongPress={this.showPopover} ref={r => (this.button = r)} onPress={() => Actions.botMap({item: bot.id})} style={styles.botLocationButton}>
              <Image source={require('../../../images/iconBotLocation.png')} style={{marginRight: 5 * k, height: 20 * k}} resizeMode='contain' />
              <RText>
                {locationStore.distanceToString(
                  locationStore.distance(locationStore.location.latitude, locationStore.location.longitude, bot.location.latitude, bot.location.longitude),
                )}
              </RText>
            </TouchableOpacity>
          </View>}
      </View>
    );
  }
}

export default UserInfoRow;

const styles = StyleSheet.create({
  userInfoRow: {
    paddingTop: 15 * k,
    paddingBottom: 15 * k,
    paddingLeft: 20 * k,
    paddingRight: 20 * k,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.WHITE,
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
