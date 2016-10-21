import React from "react";
import {View, Alert, Slider, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import statem from '../../gen/state';
import bot from '../store/bot';
import Bot from '../model/Bot';
import SaveButton from './SaveButton';
import botFactory from '../factory/bot';
import {k} from './Global';
import NavTitle from './NavTitle';
import Screen from './Screen';
import Card from './Card';
import Cell from './Cell';
import model from '../model/model';
import Separator from './Separator';
import notification from '../store/notification';
import Notification from '../model/Notification';
import ShowNotification from './Notification';
import {Actions} from 'react-native-router-native';
@autobind
@observer
export default class BotOptions extends React.Component {
  @observable bot: Bot;
  
  componentWillMount(){
    if (!this.props.item && !botStore.bot){
      console.error("Bot ID is not defined");
    }
    if (this.props.item){
      this.bot = botFactory.create({id: this.props.item});
    }
  }
  
  async removeBot(){
    const notify = new Notification('Bot deletion...');
    try {
      notification.show(notify);
      await bot.remove(this.bot.id, this.bot.server);
      notification.showAndDismiss(new Notification(`Bot ${this.bot.title} deleted`));
      Actions.pop({animated: false});
      Actions.pop();
      
    } catch (e){
      alert(e);
    } finally {
      notification.dismiss(notify);
    }
  }
  
  
  render(){
    const isOwn = !this.bot.owner || this.bot.owner.isOwn;
    return <Screen>
      <ShowNotification/>
      <Card>
        {isOwn && <View><Cell onPress={()=>statem.logged.botEdit({item: this.bot.id})} image={require('../../images/edit.png')}>Edit Bot</Cell><Separator width={1}/></View>}
        <Cell image={require('../../images/iconShare.png')}>Share</Cell>
        {isOwn && <Separator width={1}/>}
        {isOwn && <View><Cell image={require('../../images/iconNotifications.png')}>Notifications - Off</Cell><Separator width={1}/></View>}
        {isOwn && <View><Cell onPress={()=>Alert.alert(null, 'Are you sure you want to delete this bot?',[
              {text:'Cancel', style:'cancel'},
              {text:'Delete', style:'destructive', onPress:this.removeBot}
            ])}><Text style={{color:'rgb(254,92,108)'}}>Delete Bot</Text></Cell></View>}
      </Card>
    </Screen>;
    
  }
}