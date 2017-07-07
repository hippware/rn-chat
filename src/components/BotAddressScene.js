import React from 'react';
import BotAddress from './BotAddress';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-router-flux';
import {View} from 'react-native';
import SaveButton from './SaveButton';
import bot from '../store/botStore';
import {observer} from 'mobx-react/native';

@autobind
@observer
export default class extends React.Component {
  render() {
    return <BotAddress />;
  }
}
