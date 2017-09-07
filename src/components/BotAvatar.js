import React from 'react';
import Avatar from './common/Avatar';
import {observer} from 'mobx-react/native';

@observer
export default class BotAvatar extends React.Component {
  render() {
    return (
      <Avatar
        size={40}
        {...this.props}
        source={this.props.bot.thumbnail && this.props.bot.thumbnail.source ? this.props.bot.thumbnail.source : require('../../images/avatarNoPic.png')}
      />
    );
  }
}

BotAvatar.defaultProps = {
  tappable: true,
};
