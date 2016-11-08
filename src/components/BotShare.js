import React from "react";
import {View, Alert, TouchableWithoutFeedback, Slider, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import statem from '../../gen/state';
import bot from '../store/bot';
import Bot from '../model/Bot';
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
import RadioButton from 'react-native-radio-button';
import RadioButtons from 'react-native-radio-buttons'

class OwnRadioButton extends React.Component {
  render(){
    return <RadioButton
      size={11.5}
      innerColor="rgb(254,92,108)"
      outerColor="rgb(155,155,155)"
      animation={'bounceIn'}
      isSelected={this.props.selected}
      onPress={this.props.onPress}
    />
  }
}
@autobind
@observer
export default class BotShare extends React.Component {
  options:[String] = ['Only Me', 'Select Friends', 'All Friends', 'Anyone'];
  @observable bot: Bot;
  constructor(props){
    super(props);
    this.state = {};
  }
  
  componentWillMount(){
    if (!this.props.item){
      botStore.createLocation();
    }
    if (this.props.item){
      this.bot = botFactory.create({id: this.props.item});
    } else {
      this.bot = botStore.bot;
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
    
    function setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    }
  
    function renderOption(option, selected, onSelect, index){
      const style = {fontFamily:'Roboto-Regular', fontSize:15, color: selected ?
        (location.isDay ? 'rgb(63,50,77)' : 'white') : 'rgb(155,155,155)'}
    
      return (
        <View key={index}>
          <Cell onPress={onSelect}>
            <OwnRadioButton selected={selected} onPress={onSelect} />
            <View style={{paddingLeft: 10, paddingRight:10}}>
                  <Text style={style}>{option}</Text>
            </View>
          </Cell>
          <Separator width={1} key={'sep'+index}/>
        </View>
  
          );
        }
  
    function renderContainer(optionNodes){
      return <Card>{optionNodes}</Card>;
    }
    const isOwn = !this.bot.owner || this.bot.owner.isOwn;
    return <Screen>
      <View style={{paddingTop:70*k}}>
      <RadioButtons
        options={ this.options }
        onSelection={ setSelectedOption.bind(this) }
        selectedOption={this.state.selectedOption }
        renderOption={ renderOption }
        renderContainer={ renderContainer }
      />
      <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
      </View>
      <SaveButton active={!!this.state.selectedOption} />
    </Screen>;
    
  }
}