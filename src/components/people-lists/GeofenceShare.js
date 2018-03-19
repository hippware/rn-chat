// @flow

import React from 'react';
import {Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import SelectableProfileList from '../../store/SelectableProfileList';
import FriendMultiSelect from './FriendMultiSelect';
import {colors} from '../../constants';
import {k} from '../Global';
import {RText} from '../common';

type Props = {
  botId: string,
};

@inject('wocky', 'notificationStore', 'store')
@observer
class GeofenceShare extends React.Component<Props> {
  // NOTE: static in case RightButton needs to access/react to selection
  @observable static selection: SelectableProfileList = SelectableProfileList.create({});
  @observable bot: Bot;

  static rightButton = props => <RightButton {...props} />;

  componentDidMount() {
    GeofenceShare.selection.clear();
    const {friends, getBot} = this.props.wocky;
    this.bot = getBot({id: this.props.botId});
    GeofenceShare.selection.setList(friends.map(f => ({profile: f})));
    if (!this.props.store.sharePresencePrimed) Actions.sharePresencePrimer();
  }

  share = () => {
    const shareSelect = GeofenceShare.selection.selected.map(sp => sp.id);
    try {
      this.bot.share(shareSelect, '', 'geofence');
      const num = shareSelect.length;
      this.props.notificationStore.flash(`Presence shared with ${num} ${num > 1 ? 'friends' : 'friend'} 🎉`);
      Actions.pop({animated: false});
      Actions.botDetails({item: this.props.botId, isNew: true});
    } catch (e) {
      Alert.alert('There was a problem sharing the bot.');
      console.warn(e);
    }
  };

  render() {
    const selected = GeofenceShare.selection.selected.length > 0;
    return (
      <Screen>
        <FriendMultiSelect selection={GeofenceShare.selection} profile={this.props.wocky.profile} botTitle={this.bot && this.bot.title} inviteMessage='To share presence!' />
        <TouchableOpacity style={[styles.shareButton, {backgroundColor: selected ? colors.PINK : colors.addAlpha(colors.PINK, 0.5)}]} disabled={!selected} onPress={this.share}>
          <RText size={15} color='white' style={styles.shareText}>
            Share Presence
          </RText>
        </TouchableOpacity>
      </Screen>
    );
  }
}

const RightButton = observer(({botId}) => {
  return (
    <TouchableOpacity
      style={{marginRight: 15 * k}}
      onPress={() => {
        // TODO: fix hacky nav animation
        Actions.pop({animated: false});
        Actions.botDetails({item: botId, isNew: true});
      }}
    >
      <RText size={15} color={colors.DARK_GREY}>
        Skip
      </RText>
    </TouchableOpacity>
  );
});

export default GeofenceShare;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    right: 0,
    left: 0,
    position: 'relative',
    shadowOffset: {height: -1, width: 0},
    shadowRadius: 4,
    shadowOpacity: 0.11,
  },
  shareButton: {
    height: 50 * k,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: colors.PINK,
  },
  shareText: {
    letterSpacing: 0.8,
  },
});
