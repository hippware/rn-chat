// @flow

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';
import {k} from '../Global';
import {observer, inject} from 'mobx-react/native';
import SaveOrEditButton from './SaveOrEditButton';
import {Actions} from 'react-native-router-flux';
import ActionSheet from 'react-native-actionsheet';
import {colors} from '../../constants';
import Geofence from '../map/Geofence';

type Props = {
  bot: Bot,
  copyAddress: Function,
};

const ownerActions = [
  {name: 'Edit', action: ({bot}) => Actions.botEdit({botId: bot ? bot.id : null})},
  {name: 'Copy Address', action: ({copyAddress}) => copyAddress()},
  {
    name: 'Delete',
    action: ({wocky, bot}) => {
      Alert.alert(null, 'Are you sure you want to delete this bot?', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            wocky.removeBot(bot ? bot.id : null);
            Actions.pop();
            Actions.pop({animated: false});
          },
        },
      ]);
    },
    destructive: true,
  },
  {name: 'Cancel', action: () => {}},
];

const nonOwnerActions = [
  {
    name: 'Copy Address',
    action: ({copyAddress}) => copyAddress(),
  },
  {
    name: 'Report',
    action: ({bot}) => Actions.reportBot({botId: bot.id}),
    destructive: true,
  },
  {name: 'Cancel', action: () => {}},
];

@inject('wocky')
@observer
class BotButtons extends React.Component<Props> {
  actionSheet: any;

  render() {
    const {bot} = this.props;
    if (!bot || !bot.owner) return null;
    const actions = bot.owner.isOwn ? ownerActions : nonOwnerActions;
    const isShareable = bot.isPublic || bot.owner.isOwn;
    const destructiveIndex = actions.findIndex(a => a.destructive);
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingBottom: 5 * k}}>
        {bot.geofence && <GeofenceButton style={styles.button} bot={bot} />}
        <SaveOrEditButton style={styles.button} {...this.props} isOwn={bot.owner.isOwn} />
        {isShareable && <ShareButton bot={bot} />}
        <MultiButton onPress={() => this.actionSheet.show()} />
        <ActionSheet
          ref={o => (this.actionSheet = o)}
          options={actions.map(a => a.name)}
          cancelButtonIndex={actions.length - 1}
          onPress={index => this.onTap(index, actions)}
          destructiveButtonIndex={destructiveIndex}
        />
      </View>
    );
  }

  onTap = (index: number, actions: Object[]) => actions[index].action(this.props);
}

const ShareButton = ({bot}) => (
  <TouchableOpacity onPress={() => Actions.botShareSelectFriends({botId: bot.id})} style={[styles.button, {marginLeft: 10 * k, backgroundColor: colors.WHITE}]}>
    <Image source={require('../../../images/shareIcon.png')} resizeMode='contain' />
  </TouchableOpacity>
);

const GeofenceButton = observer(({bot, style}: Props) => {
  let onPress, buttonStyle, image;
  if (bot.isSubscribedGeofence) {
    onPress = () => bot.unsubscribe(true);
    buttonStyle = style;
    image = require('../../../images/whiteFoot.png');
  } else {
    onPress = () => bot.subscribe(true);
    buttonStyle = [style, {backgroundColor: colors.WHITE}];
    image = require('../../../images/footIcon.png');
  }
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Image source={image} resizeMode='contain' />
    </TouchableOpacity>
  );
});

const MultiButton = props => (
  <TouchableOpacity style={[styles.button, {width: 44 * k, backgroundColor: colors.WHITE, flex: 0, marginLeft: 10 * k}]} {...props}>
    <Image source={require('../../../images/editDots.png')} resizeMode='contain' />
  </TouchableOpacity>
);

export default BotButtons;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 40 * k,
    flexDirection: 'row',
    backgroundColor: colors.PINK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5 * k,
    borderColor: colors.PINK,
    borderWidth: 1,
  },
  buttonIcon: {
    marginRight: 5 * k,
  },
});
