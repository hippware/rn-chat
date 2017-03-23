import React from "react";
import {View, Slider, Alert, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import Map from './Map';
import {Annotation} from 'react-native-mapbox-gl';
import {width, k} from './Global';
import {backgroundColorDay, backgroundColorNight, navBarTextColorDay, navBarTextColorNight} from '../globals';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {when, computed, autorun, observable} from 'mobx';
import Card from './Card';
import Cell from './Cell';
import CellWithText from './CellWithText';
import Separator from './Separator';
import location from '../store/locationStore';
import Header from './Header';
import Bot, {LOCATION} from '../model/Bot';
import Location from '../model/Location';
import statem from '../../gen/state';
import botFactory from '../factory/botFactory';
import bot from '../store/botStore';
import GradientHeader from './GradientHeader';
import SaveButton from './SaveButton';
import Screen from './Screen';
import CellOptional from './CellOptional';
import {Actions} from 'react-native-router-native';
import BotVisibilityCard from './BotVisibilityCard';
import Switch from './Switch';

@autobind
@observer
export default class LocationBot extends React.Component {
  @computed get hasPhoto() {return bot.bot && bot.bot.images.length > 0 };
  @computed get hasNote() {return bot.bot && bot.bot.description && bot.bot.description.length > 0 };
  @computed get collapsedHeight() {return 52*3 + (this.hasNote ? 52 : 0) + (this.hasPhoto ? 52 : 0)};
  
  constructor(props){
    super(props);
    this.state = {isFirstScreen : false, isPublic: true};
  }
  
  next(){
    if (bot.bot.title.length > 0){
      if (this.state.isFirstScreen) {
        this.setState({isFirstScreen: false});
      }
      this.refs.title.blur();
    }
  }
  
  componentWillMount(){
    if (this.props.item){
      bot.bot = botFactory.create({id: this.props.item});
    }
    if (!bot.bot) {
      bot.create({type: LOCATION});
  
      when(() => location.location, () => {
        bot.location = location.location;
      });
  
    } else {
      if (bot.bot.location){
        this.latitude = bot.bot.location.latitude;
        this.longitude = bot.bot.location.longitude;
      }
    }
    if (bot.bot.isNew) {
      this.setState({isFirstScreen : true});
    }
  }
  
  async save(){
    if (!bot.bot.title){
      alert('Title cannot be empty');
      this.refs.title.focus();
      return;
    }
    try {
      if (this.props.edit){
        await bot.save();
        Actions.pop({animated:false});
        Actions.pop();
      } else {
        if (!bot.bot.visibilityShown && bot.bot.isNew){
          statem.logged.botVisibilityContainer();
        } else {
          await bot.save();
          Actions.pop({animated:false});
          Actions.pop();
          setTimeout(()=>statem.botsScene.botDetails({item: bot.bot.id}));
          //statem.drawerTabs.botDetailsTab();
        }
      }
    } catch (e){
      alert(e);
    }
  }
  
  render(){
    if (!bot.bot){
      console.log("NO BOT IS DEFINED");
      return <Screen isDay={location.isDay}/>;
    }
    const address = `${bot.bot.isCurrent ? 'Current - ' : '' }${bot.bot.address}`;
    const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
    const isDay = location.isDay;
    console.log("SWITCH STATE:", this.state.isPublic);
    const switchButton = <Image source={this.state.isPublic ? require('../../images/iconPublic.png') : require('../../images/iconPrivate.png')}/>;
    return (
      <Screen isDay={location.isDay}>
        <ScrollView>
        <View style={{height:275*k, alignItems:'center', justifyContent:'center',
        backgroundColor:this.state.isFirstScreen ? 'rgb(242,243,245)' : 'rgb(112,176,225)'}}>
          <TouchableOpacity onPress={this.handleImagePress}>
            <View style={{alignItems:'center'}}>
              <Image source={this.state.isFirstScreen ? require('../../images/attachPhotoGray.png') : require('../../images/iconAddcover.png')}/>
              <Text style={{fontFamily:'Roboto-Regular', fontSize:14, color:this.state.isFirstScreen ? 'rgb(211,211,211)' : 'white'}}>Add Cover Photo</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Card isDay={location.isDay} style={{paddingLeft:0, paddingRight:0, paddingTop:0}}>
            <View style={{padding: 15*k}}>
              <Text style={{fontFamily:'Roboto-Medium', fontSize:16,color:isDay ? navBarTextColorDay : navBarTextColorNight }}>Bot Details</Text>
            </View>
            <Separator width={1}/>
            <Cell style={{padding:10*k}} image={require('../../images/iconBotTitle.png')} imageStyle={{paddingLeft:14*k}}
                  textStyle={{fontFamily:'Roboto-Light'}} onRemove={()=>bot.bot.title = ''}>
              <View style={{flex:1,paddingRight:10*k, alignItems:'center', justifyContent:'center'}}>
                <TextInput autoFocus={!this.props.edit}
                          placeholder="Name your bot" ref="title" placeholderTextColor='rgb(211,211,211)' value={bot.bot.title}
                         onChangeText={text=>bot.bot.title = text}
                           returnKeyType={this.state.isFirstScreen ? 'next' : 'done' }
                           onSubmitEditing={this.next}
                           blurOnSubmit={false}
                         maxLength={60}
              style={{height:25*k, fontFamily:'Roboto-Regular', fontSize:15,
              color:location.isDay? navBarTextColorDay : navBarTextColorNight}}/>
              </View></Cell>
            <View><Separator width={1}/>
            <Cell imageStyle={{paddingLeft:8*k}} onPress={()=>statem.handle("setAddress", {bot: bot.bot})} image={require('../../images/iconBotLocation2.png')}>{address}</Cell>
            </View>
          </Card>
          <Card isDay={location.isDay} style={{paddingLeft:0, paddingRight:0, paddingTop:0}}>
            <Header>Visibility</Header>
            <Separator width={1}/>
            <View style={{height:53*k, flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
              <View style={{width:113, alignItems:'center'}}><Text>Private</Text></View>
              <View style={{flex:1, alignItems:'center'}}><Switch
                active={this.state.isPublic}
                buttonRadius={15}
                toggleWidth={50}
                onChangeState={isPublic=>this.setState({isPublic})}
                buttonContent={switchButton}
                toggleHeight={32}
                toggleWidth={75}
                switchHeight={38}
                switchWidth={150}
                activeBackgroundColor="rgb(212,212,212)"
                inactiveBackgroundColor="rgb(212,212,212)"
                activeButtonColor="white"
                inactiveButtonColor="white"
                activeButtonPressedColor="white"
                inactiveButtonPressedColor="white"
                buttonShadow={{shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 0, shadowOffset: { height: 0, width: 0 }}}

              /></View>
              <View style={{width:113, alignItems:'center'}}><Text>Public</Text></View>
            </View>
          </Card>
        </View>
        </ScrollView>
        {this.state.isFirstScreen && <SaveButton title="Next" active={(bot.bot.title.length > 0) && bot.bot.location} onSave={this.next}/>}
      </Screen>
      
    );
  }
}
