// @flow

import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

type Props = {
  item: BotPost,
  bot: Bot,
};

class BotPostOptions extends React.Component<Props> {
  actionSheet: any;

  onTap = async (index: number) => {
    // delete post
    if (index === 0) {
      await this.props.bot.removePost(this.props.item.id);
    }
  };
  render() {
    const post = this.props.item;
    const {bot} = this.props;
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

export default BotPostOptions;
