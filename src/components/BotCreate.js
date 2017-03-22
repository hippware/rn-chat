import React from 'react';
import {View, Text} from 'react-native';
import {when} from 'mobx';
import location from '../store/locationStore';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';
import Screen from './Screen';
import bot from '../store/botStore';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import BotAddress from './BotAddress';
import BotNote from './BotNote';
import BotPhoto from './BotPhoto';
import SaveButton from './SaveButton';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';

@autobind
@observer
export default class extends React.Component {
  @observable type;
  
  componentWillMount(){
    const type = statem.createBotContainer.props.botType || LOCATION;
    bot.create({type});
    
    // show first screen only after getting location
    when(()=>bot.bot.location, ()=>{
      this.type = type;
    })
  }
  
  save(data){
    if (data){
      bot.bot.load(data);
    }
    statem.createBot.save();
  }
  
  componentWillUnmount(){
    console.log("BOTCreate componentWillUnmount");
  }
  
  render(){
    console.log("BotCreate render()", bot.bot.type, statem.createBotContainer.props.botType);
    const type = bot.bot.type;
    return <Screen isDay={location.isDay}>
      {type === LOCATION && <BotAddress onSave={this.save}/>}
      {type === NOTE && <BotNote title='Create Bot' onSave={this.save}/>}
      {type === IMAGE && <BotPhoto title='Create Bot' initial={true} onSave={this.save}/>}
      </Screen>
    
  }
}