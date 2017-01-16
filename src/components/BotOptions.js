import React from "react";
import {View, Alert, Slider, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import botStore from '../store/bot';
import {observable, when} from 'mobx';
import statem from '../../gen/state';
import bot from '../store/bot';
import Bot, {VISIBILITY_PUBLIC, VISIBILITY_OWNER} from '../model/Bot';
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
      notification.showAndDismiss(new Notification(`Bot Deleted`));
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
        {((isOwn && this.bot.visibility !== VISIBILITY_OWNER)|| this.bot.visibility === VISIBILITY_PUBLIC) && <Cell onPress={()=>statem.logged.botShare({item: this.bot.id})} image={require('../../images/iconShare.png')}>Share</Cell>}
        {isOwn && <View><Separator width={1}/><Cell textStyle={{color:'rgb(254,92,108)'}} onPress={()=>Alert.alert(null, 'Are you sure you want to delete this bot?',[
              {text:'Cancel', style:'cancel'},
              {text:'Delete', style:'destructive', onPress:this.removeBot}
            ])}>Delete Bot</Cell></View>}
        {!isOwn && this.bot.isSubscribed && <View><Separator width={1}/><Cell textStyle={{color:'rgb(254,92,108)'}} onPress={()=>Alert.alert(null, 'Are you sure you want to unsubscribe?',[
              {text:'Cancel', style:'cancel'},
              {text:'Unsubscribe', style:'destructive', onPress:bot.unsubscribe}
            ])}>Unsubscribe from Bot</Cell></View>}
      </Card>
    </Screen>;
    // {isOwn && <View><Cell image={require('../../images/iconNotifications.png')}>Notifications - Off</Cell><Separator width={1}/></View>}
    
  }
}