import React from 'react';
import Avatar from './Avatar';
import {observer} from 'mobx-react/native';


@observer
export default class BotAvatar extends React.Component {
  render(){
    console.log("BOTAVATAR", JSON.stringify(this.props.bot.image));
    return <Avatar size={40} {...this.props} source={this.props.bot.image && this.props.bot.image.source ? this.props.bot.image.source : require('../../images/avatarNoPic.png')}/>;
  }
}

BotAvatar.defaultProps = {
  tappable: true
};
