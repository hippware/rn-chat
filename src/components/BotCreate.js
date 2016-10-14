import React from 'react';
import {when} from 'mobx';
import location from '../store/location';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';
import Screen from './Screen';
import bot from '../store/bot';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import BotAddress from './BotAddress';
import BotNote from './BotNote';
import SaveButton from './SaveButton';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';

@autobind
@observer
export default class extends React.Component {
  @observable type;
  
  componentWillMount(){
    const type = statem.createBotContainer.props.botType;
    bot.create({type});
    
    // show first screen only after getting location
    when(()=>bot.bot.location, ()=>{
      this.type = type;
    })
  }
  
  save(data){
    console.log("SAVING BOT:", JSON.stringify(data), data.location);
    bot.bot = data;
    statem.createBot.save();
  }
  
  render(){
    console.log("BotCreate render()", this.type, statem.createBotContainer.props.botType);
    const type = this.type;
    return <Screen isDay={location.isDay}>
      {type === LOCATION && <BotAddress onSave={this.save}/>}
      {type === NOTE && <BotNote title='Create Bot' onSave={this.save}/>}
      </Screen>
    
  }
}