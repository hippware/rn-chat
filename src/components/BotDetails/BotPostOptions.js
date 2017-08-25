import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import BotPost from '../../model/BotPost';
import Bot from '../../model/Bot';
import ActionSheet from 'react-native-actionsheet';
import botStore from '../../store/botStore';

type Props = {
  item: BotPost,
  bot: Bot,
};

export default class extends React.Component {
  props: Props;
  onTap = (index) => {
    const post = this.props.item;
    const bot = this.props.bot;
    // delete post
    if (index === 0) {
      botStore.removeItem(post.id, bot);
    }
  };
  render() {
    const post = this.props.item;
    const bot = this.props.bot;
    if (bot.owner.isOwn || post.profile.isOwn) {
      return (<TouchableOpacity onPress={() => this.ActionSheet.show()} style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../../../images/options.png')} />
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          options={['Delete post', 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={this.onTap}
        />
      </TouchableOpacity>);
    }
    return null;
  }
};
