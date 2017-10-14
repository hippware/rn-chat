// @flow

import React from 'react';
import {Clipboard, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {observer} from 'mobx-react/native';
import {colors} from '../../constants';
import {k} from '../Global';
import Bot from '../../model/Bot';
import Profile from '../../model/Profile';
import locationStore from '../../store/locationStore';
import {Actions} from 'react-native-router-flux';
import {RText} from '../common';
import ProfileAvatar from '../ProfileAvatar';

type Props = {
  flashPopover: Function,
  bot: Bot,
  owner: Profile,
};

const Separator = () => <View style={{width: 1, height: 10 * k, backgroundColor: colors.DARK_GREY}} />;

@observer
class UserInfoRow extends React.Component {
  props: Props;
  button: any;

  showPopover = () => {
    const {flashPopover} = this.props;
    Clipboard.setString(this.props.bot.address);
    this.button.measure((ox, oy, w, h, px, py) => flashPopover({x: px, y: py, width: w, height: h}));
  };

  measure = () => this.button.measure;

  render() {
    const {bot, owner} = this.props;
    if (!bot || !owner) return null;
    const profile = owner;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RText color={colors.DARK_PURPLE} numberOfLines={2} size={18}>{`${bot.title}`}</RText>
          {!bot.isPublic && <Image source={require('../../../images/iconPrivate.png')} style={{marginHorizontal: 7 * k}} resizeMode='contain' />}
        </View>

        <View style={styles.userInfoRow}>
          <ProfileAvatar profile={profile} size={40 * k} />
          <View style={{marginLeft: 10 * k, flex: 1}}>
            <TouchableOpacity onPress={() => Actions.profileDetails({item: profile.user})}>
              <RText weight='Medium' size={15} color={colors.DARK_PURPLE}>{`@${profile.handle}`}</RText>
            </TouchableOpacity>
          </View>
          <SavesCount botId={bot.id} isOwn={owner && owner.isOwn} />
          <RText color={colors.WARM_GREY_2} style={{marginLeft: 4 * k, marginRight: 4 * k}}>
            {bot.followersSize}
          </RText>
          <Separator />

          {locationStore.location &&
            bot.location && (
              <View>
                <TouchableOpacity onLongPress={this.showPopover} ref={r => (this.button = r)} onPress={() => Actions.botMap({item: bot.id})} style={styles.botLocationButton}>
                  <View style={{paddingRight: 2 * k, paddingLeft: 5 * k}}>
                    <Image style={{width: 11 * k, height: 14 * k}} source={require('../../../images/iconBotLocation2.png')} />
                  </View>
                  <RText color={colors.WARM_GREY_2}>
                    {locationStore.distanceToString(
                      locationStore.distance(locationStore.location.latitude, locationStore.location.longitude, bot.location.latitude, bot.location.longitude),
                    )}
                  </RText>
                </TouchableOpacity>
              </View>
            )}
        </View>
      </View>
    );
  }
}

const SavesCount = ({botId, isOwn}) => {
  const inner = <Image style={{width: 14 * k, height: 13 * k}} source={require('../../../images/heart.png')} />;
  return isOwn ? (
    <TouchableOpacity onPress={() => Actions.subscribers({item: botId})} hitSlop={{top: 5, right: 5, bottom: 5, left: 5}}>
      {inner}
    </TouchableOpacity>
  ) : (
    inner
  );
};

export default UserInfoRow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10 * k,
    paddingBottom: 15 * k,
    paddingLeft: 20 * k,
    paddingRight: 20 * k,
  },
  userInfoRow: {
    marginTop: 10 * k,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  botLocationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
