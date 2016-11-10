import React from "react";
import {View, Alert, TouchableWithoutFeedback, Slider, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import statem from '../../gen/state';
import bot from '../store/bot';
import Bot, {SHARE_FOLLOWERS, SHARE_FRIENDS, SHARE_SELECT} from '../model/Bot';
import SaveButton from './SaveButton';
import botFactory from '../factory/bot';
import botStore from '../store/bot';
import {k} from './Global';
import NavTitle from './NavTitle';
import Screen from './Screen';
import Card from './Card';
import Cell from './Cell';
import model from '../model/model';
import location from '../store/location';
import Separator from './Separator';
import notification from '../store/notification';
import Notification from '../model/Notification';
import ShowNotification from './Notification';
import {Actions} from 'react-native-router-native';
import RadioButtonList from './RadioButtonList';

@autobind
@observer
export default class BotShare extends React.Component {
  text = '';
  share() {
    if (botStore.bot.shareMode === SHARE_SELECT) {
      this.text = botStore.bot.shareSelect.map(profile => profile.firstName || profile.handle).join(', ');
    }
    Actions.pop({animated:false});Actions.botShareCompleted({text: this.text});
  }
  
  componentWillMount(){
    if (!botStore.bot){
      botStore.bot = botFactory.createLocation();
    }
    botStore.bot.shareMode = undefined;
    botStore.bot.shareSelect = [];
  }
  
  onSelect(selectedValue, option){
    this.text = option;
    botStore.bot.shareMode = selectedValue;
    if (botStore.bot.shareMode === SHARE_SELECT){
      statem.botShare.selectFriends();
    }
  }
  
  render(){
    const selectFriends = botStore.bot.shareSelect.length ?
    'People: '+ botStore.bot.shareSelect.map(profile=>profile.firstName || profile.handle).join(', '):
      'Select People';
    return <Screen>
      <View style={{paddingTop:70*k}}>
        <RadioButtonList options={['All Friends', 'All Followers', selectFriends]}
                         values={[SHARE_FRIENDS, SHARE_FOLLOWERS, SHARE_SELECT]}
                         selectedValue={botStore.bot.shareMode}
                         onSelect={this.onSelect}/>
      </View>
      <SaveButton active={(selectFriends !== 'Select People') || (!!botStore.bot.shareMode && (botStore.bot.shareMode !== SHARE_SELECT))}
                  onSave={this.share} title="Share"/>
    </Screen>;
    
  }
}