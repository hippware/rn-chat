import React from 'react';
import {when} from 'mobx';
import location from '../store/location';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';
import Screen from './Screen';
import bot from '../store/bot';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import BotAddress from './LocationBotAddress';
import SaveButton from './SaveButton';
import autobind from 'autobind-decorator';

@autobind
export default class extends React.Component {
  componentWillMount(){
    this.type = statem.createBotContainer.props.botType;
    bot.create({type: this.type});
  }
  
  save(data){
    bot.bot = data;
    statem.createBot.save();
  }
  
  render(){
    console.log("BotCreate render()");
    const type = this.type;
    return <Screen isDay={location.isDay}>
      {type === LOCATION && <BotAddress onSave={this.save}/>}
      </Screen>
    
  }
}