// @flow

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {k} from '../Global';
import {observer} from 'mobx-react/native';
import AddBotButton from './AddBotButton';
import {Actions} from 'react-native-router-flux';
import ActionSheet from 'react-native-actionsheet';
import Bot from '../../model/Bot';
import {colors} from '../../constants';
import {RText} from '../common';

type Props = {
  bot: Bot,
  copyAddress: Function,
};

const ownerActions = [{name: 'Copy Address', action: ({copyAddress}) => copyAddress()}, {name: 'Cancel', action: () => {}}];

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

class BotButtons extends React.Component {
  props: Props;
  actionSheet: any;
  render() {
    const {bot} = this.props;
    if (!bot || !bot.owner) return null;
    const actions = bot.owner.isOwn ? ownerActions : nonOwnerActions;
    const isShareable = bot.isPublic || bot.owner.isOwn;
    const destructiveIndex = actions.findIndex(a => a.destructive);
    return (
      <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 15 * k, paddingBottom: 5 * k}}>
        <AddBotButton style={styles.button} {...this.props} isOwn={bot.owner.isOwn} botId={bot.id} />
        {isShareable && <ShareButton bot={bot} />}
        <EditButton onPress={() => this.actionSheet.show()} />
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
  <TouchableOpacity onPress={() => Actions.botShareSelectFriends({botId: bot.id})} style={[styles.button, {marginHorizontal: 15 * k}]}>
    <Image source={require('../../../images/shareWhite.png')} resizeMode='contain' />
    <RText size={13} color={colors.WHITE} style={{marginLeft: 5 * k}}>
      SHARE
    </RText>
  </TouchableOpacity>
);

const EditButton = props => (
  <TouchableOpacity style={[styles.button, {width: 44 * k, backgroundColor: colors.WHITE, flex: 0}]} {...props}>
    <Image source={require('../../../images/editDots.png')} resizeMode='contain' />
  </TouchableOpacity>
);

export default observer(BotButtons);

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
