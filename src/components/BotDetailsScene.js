import React from 'react';
import BotDetails from './BotDetails';
import bot from '../store/bot';
import {observer} from 'mobx-react/native';

@observer
export default class extends React.Component {
  componentWillMount(){
    if (!bot.bot){
      bot.createNote();
    }
  }
  render(){
    return <BotDetails {...this.props}/>
  }
}