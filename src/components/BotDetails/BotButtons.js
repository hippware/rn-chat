// @flow

import React from 'react';
import {View, TouchableOpacity, Image, Clipboard} from 'react-native';
import {k} from '../Global';
import {observer} from 'mobx-react/native';
import AddBotButton from './AddBotButton';
import {Actions} from 'react-native-router-flux';
import ActionSheet from 'react-native-actionsheet';
import Bot from '../../model/Bot';

type Props = {
  bot: Bot,
  afterCopy: Function,
};

const copyAddress = ({bot, afterCopy}) => {
  Clipboard.setString(bot.address);
  afterCopy();
};

const ownerActions = [{name: 'Copy Address', action: copyAddress}, {name: 'Cancel', action: () => {}}];

const nonOwnerActions = [
  {
    name: 'Copy Address',
    action: copyAddress,
  },
  {
    name: 'Report',
    action: ({bot}) => Actions.reportBot({botId: bot.id}),
  },
  {name: 'Cancel', action: () => {}},
];

class BotButtons extends React.Component {
  props: Props;
  actionSheet: any;
  render() {
    const {bot} = this.props;
    if (!bot.owner) return null;
    const actions = bot.owner.isOwn ? ownerActions : nonOwnerActions;
    const isShareable = bot.isPublic || bot.owner.isOwn;
    return (
      <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 15 * k, paddingBottom: 5 * k}}>
        <AddBotButton {...this.props} isOwn={bot.owner.isOwn} botId={bot.id} />
        {isShareable && (
          <TouchableOpacity onPress={() => Actions.botShareSelectFriends({item: bot.id})} style={{paddingLeft: 15 * k}}>
            <Image source={require('../../../images/shareButton.png')} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={{paddingLeft: 15 * k}} onPress={() => this.actionSheet.show()}>
          <Image source={require('../../../images/editButton.png')} />
        </TouchableOpacity>
        <ActionSheet ref={o => (this.actionSheet = o)} options={actions.map(a => a.name)} cancelButtonIndex={actions.length - 1} onPress={index => this.onTap(index, actions)} />
      </View>
    );
  }

  onTap = (index: number, actions: Object[]) => actions[index].action(this.props);
}

export default observer(BotButtons);
