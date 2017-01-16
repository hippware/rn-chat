import React from 'react';
import BotNote from './BotNote';
import autobind from 'autobind-decorator';
import {Actions} from 'react-native-router-native';
import {View} from 'react-native';
import SaveButton from './SaveButton';
import bot from '../store/bot';

@autobind
export default class extends React.Component {
  save(data) {
    bot.bot = data;
    Actions.pop();
  }
  
  render(){
    return <BotNote onSave={this.save}/>;
  }
}