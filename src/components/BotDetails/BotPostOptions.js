// @flow

import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

type Props = {
  item: BotPost,
  bot: Bot,
};

export default class extends React.Component {
  props: Props;
  actionSheet: any;

  onTap = (index) => {
    const post = this.props.item;
    const bot = this.props.bot;
    // delete post
    if (index === 0) {
      // botStore.removeItem(post.id, bot);
    }
  };
  render() {
    const post = this.props.item;
    const bot = this.props.bot;
    if (bot.owner.isOwn || post.profile.isOwn) {
      return (
        <TouchableOpacity onPress={() => this.actionSheet.show()} style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../images/options.png')} />
          <ActionSheet ref={o => (this.actionSheet = o)} options={['Delete post', 'Cancel']} cancelButtonIndex={1} destructiveButtonIndex={0} onPress={this.onTap} />
        </TouchableOpacity>
      );
    }
    return null;
  }
}
