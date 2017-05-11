import React from 'react';
import BotDetails from './BotDetails';
import {observer} from 'mobx-react/native';

export default observer(props => <BotDetails {...props} />);
