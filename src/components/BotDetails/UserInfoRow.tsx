// @flow

import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {colors} from '../../constants';
import {k} from '../Global';
import {Actions} from 'react-native-router-flux';
import {RText, ProfileHandle} from '../common';
import ProfileAvatar from '../ProfileAvatar';

type Props = {
  bot: Bot,
  copyAddress: Function,
};

const Separator = () => <View style={{width: 1, height: 10 * k, backgroundColor: colors.DARK_GREY}} />;

@inject('locationStore')
@observer
class UserInfoRow extends React.Component<Props> {
  props: Props;
  button: any;

  render() {
    const {bot, locationStore} = this.props;
    if (!bot || !bot.owner) return null;
    const {distanceToString, distance, location} = locationStore;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RText color={colors.DARK_PURPLE} numberOfLines={2} size={18}>{`${bot.title}`}</RText>
          {!bot.isPublic && <Image source={require('../../../images/iconPrivate.png')} style={{marginHorizontal: 7 * k}} resizeMode='contain' />}
        </View>

        <View style={styles.userInfoRow}>
          <ProfileAvatar profile={bot.owner} size={40 * k} />
          <ProfileHandle style={{marginLeft: 10 * k, flex: 1}} onPress={() => Actions.profileDetails({item: bot.owner.id})} size={15} profile={bot.owner} />
          <View style={{flex: 1}} />
          <SavesCount botId={bot.id} isOwn={bot.owner.isOwn} />
          <RText color={colors.WARM_GREY_2} style={{marginLeft: 4 * k, marginRight: 4 * k}}>
            {bot.followersSize}
          </RText>
          <Separator />

          {location &&
            bot.location && (
              <View>
                <TouchableOpacity onLongPress={this.props.copyAddress} ref={r => (this.button = r)} onPress={() => Actions.refresh({scale: 0})} style={styles.botLocationButton}>
                  <View style={{paddingRight: 2 * k, paddingLeft: 5 * k}}>
                    <Image style={{width: 11 * k, height: 14 * k}} source={require('../../../images/iconBotLocation2.png')} />
                  </View>
                  <RText color={colors.WARM_GREY_2}>{distanceToString(distance(location.latitude, location.longitude, bot.location.latitude, bot.location.longitude))}</RText>
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
    paddingTop: 10 * k,
    paddingBottom: 15 * k,
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
