import React from 'react';
import Avatar from './Avatar';
import {observer} from 'mobx-react/native';

const BotAvatar = observer(props => (
    <Avatar
        size={40}
        {...props}
        source={props.bot.thumbnail && props.bot.thumbnail.source ? props.bot.thumbnail.source : require('../../images/avatarNoPic.png')}
    />
));

BotAvatar.defaultProps = {
    tappable: true,
};

export default BotAvatar;
