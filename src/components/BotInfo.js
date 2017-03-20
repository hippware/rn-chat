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
import Bot from '../model/Bot';
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

@autobind
@observer
export default class LocationBot extends React.Component {
  @computed get hasPhoto() {return bot.bot && bot.bot.images.length > 0 };
  @computed get hasNote() {return bot.bot && bot.bot.description && bot.bot.description.length > 0 };
  @computed get collapsedHeight() {return 52*3 + (this.hasNote ? 52 : 0) + (this.hasPhoto ? 52 : 0)};
  
  componentWillMount(){
    if (this.props.item){
      bot.bot = botFactory.create({id: this.props.item});
    }
    if (!bot.bot){
      when(()=>location.location,()=>{
        bot.bot = botFactory.createLocation({location: location.location});
      });
    } else {
      if (bot.bot.location){
        this.latitude = bot.bot.location.latitude;
        this.longitude = bot.bot.location.longitude;
      }
    }
  }
  
  componentDidMount(){
    this.handler = autorun(()=> {
      if (bot.bot.location && bot.bot.location.latitude !== this.latitude && bot.bot.location.longitude !== this.longitude) {
        this.longitude = bot.bot.location.longitude;
        this.latitude = bot.bot.location.latitude;
        this._map.setCenterCoordinate(bot.bot.location.latitude, bot.bot.location.longitude);
      }
    });
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
  
  componentWillUnmount(){
    this.handler();
  }
  
  render(){
    if (!bot.bot){
      return <Screen isDay={location.isDay}/>;
    }
    const address = `${bot.bot.isCurrent ? 'Current - ' : '' }${bot.bot.address}`;
    const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
    return (
      <Screen isDay={location.isDay}>
        {bot.bot.location && <Map followUser={false} ref={map => { this._map = map; }} fullMap={false} location={bot.bot.location} bot={bot.bot} isDay={location.isDay} selectedBot={bot.bot.id} />}
        <GradientHeader/>
        <ScrollView style={{position:'absolute',top:0,bottom:0,right:0,left:0}}>
        <View style={{position:'absolute',top:0,height:175*k,right:0,left:0,backgroundColor: 'transparent'}}/>
        <View style={{position:'absolute',top:175*k,height:2000,right:0,left:0,backgroundColor}}/>
        <View style={{top:175*k}}>
          <Card isDay={location.isDay} style={{opacity:0.95}} collapsed={false} collapsedHeight={this.collapsedHeight}>
            <Header>Bot Info</Header>
            <Separator width={1}/>
            <Cell image={require('../../images/iconBotXs.png')} onRemove={()=>bot.bot.title = ''}>
              <View style={{flex:1,paddingRight:10*k, alignItems:'center', justifyContent:'center'}}>
                <TextInput autoFocus={!this.props.edit}
                          placeholder="Enter a title" ref="title" placeholderTextColor='rgb(211,211,211)' value={bot.bot.title}
                         onChangeText={text=>bot.bot.title = text}
                           onSubmitEditing={()=>!bot.bot.visibilityShown && bot.bot.isNew && this.save() }
                         maxLength={60}
              style={{height:25*k, fontFamily:'Roboto-Regular', fontSize:15,
              color:location.isDay? navBarTextColorDay : navBarTextColorNight}}/>
              </View></Cell>
            <Separator width={1}/>
            <Cell onPress={()=>statem.handle("setAddress", {bot: bot.bot})} image={require('../../images/iconBotLocation.png')}>{address}</Cell>
            <Separator width={1}/>
            
            {this.hasNote && <View><Cell onPress={()=>statem.handle("setNote", {bot: bot.bot})} onRemove={()=>Alert.alert(null, 'Do you want to delete this note?',[
              {text:'Cancel', style:'cancel'},
              {text:'Delete', style:'destructive', onPress:()=>bot.bot.description = ''}
            ])} image={require('../../images/iconNote.png')}>{bot.bot.description}</Cell><Separator width={1}/></View>}
  
            {this.hasPhoto && <View><CellWithText onPress={()=>statem.handle("editPhotos", {bot: bot.bot})} onRemove2={()=>Alert.alert(null, 'Do you want to delete this photo?',[
              {text:'Cancel', style:'cancel'},
              {text:'Delete', style:'destructive', onPress:()=>bot.bot.image = null}
            ])} image={require('../../images/photoIconsmall.png')}>{bot.bot.images.length} Photo{bot.bot.images.length > 1 ? 's' : ''}</CellWithText><Separator width={1}/></View>}
  
            {!this.hasPhoto && <View><CellOptional onPress={()=>statem.handle("setPhoto", {bot: bot.bot})} image={require('../../images/photoIconsmall.png')}>Add Photo</CellOptional><Separator width={1}/></View>}
            {!this.hasNote && <View><CellOptional onPress={()=>statem.handle("setNote", {bot: bot.bot})} image={require('../../images/iconNote.png')}>Add Note</CellOptional><Separator width={1}/></View>}
          </Card>
          {!(bot.bot.isNew && !bot.bot.visibilityShown) && <BotVisibilityCard bot={bot.bot}/>}
        </View>
        </ScrollView>
        <SaveButton active={bot.bot.title.trim().length > 0} onSave={this.save}/>
        
      </Screen>
      
    );
  }
}
