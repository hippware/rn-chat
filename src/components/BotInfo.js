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
import Separator from './Separator';
import location from '../store/location';
import Header from './Header';
import Bot from '../model/Bot';
import Location from '../model/Location';
import statem from '../../gen/state';
import botFactory from '../factory/bot';
import bot from '../store/bot';
import GradientHeader from './GradientHeader';
import SaveButton from './SaveButton';
import Screen from './Screen';
import CellOptional from './CellOptional';
import {Actions} from 'react-native-router-native';

@autobind
@observer
export default class LocationBot extends React.Component {
  @computed get hasPhoto() {return !!bot.bot.image };
  @computed get hasNote() {return bot.bot.description.length > 0 };
  @computed get collapsedHeight() {return 158*k + (this.hasNote ? 54*k : 0) + (this.hasPhoto ? 54*k : 0)};
  
  componentWillMount(){
    if (this.props.item){
      bot.bot = botFactory.create({id: this.props.item});
    }
    if (!bot.bot){
      when(()=>location.location,()=>{
        bot.bot = botFactory.createLocation({location: location.location});
      });
    }
  }
  
  componentDidMount(){
    this.handler = autorun(()=> {
      if (bot.bot && bot.bot.location && this._map) {
        this._map.setCenterCoordinate(bot.bot.location.latitude, bot.bot.location.longitude)
      }
    });
    if (!this.props.edit){
      this.refs.title.focus();
    }
  }
  
  async save(){
    try {
      await bot.save();
      if (this.props.edit){
        Actions.pop({animated:false});
        Actions.pop();
      } else {
        Actions.pop();
        statem.drawerTabs.botDetailsTab();
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
    const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
    return (
      <Screen isDay={location.isDay}>
        {bot.bot.location && <Map followUser={false} ref={map => { this._map = map; }} fullMap={false} location={bot.bot.location} isDay={location.isDay}>
          <Annotation id="bot" coordinate={{latitude: bot.bot.location.latitude,  longitude: bot.bot.location.longitude}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('../../images/location-indicator.png')}/></View>
          </Annotation>
        </Map>}
        <GradientHeader/>
        <ScrollView style={{position:'absolute',top:0,bottom:0,right:0,left:0}}>
        <View style={{position:'absolute',top:0,height:175*k,right:0,left:0,backgroundColor: 'transparent'}}/>
        <View style={{position:'absolute',top:175*k,height:2000,right:0,left:0,backgroundColor}}/>
        <View style={{top:175*k}}>
          <Card isDay={location.isDay} style={{opacity:0.95}} collapsed={true} collapsedHeight={this.collapsedHeight}>
            <Header>Bot Info</Header>
            <Separator width={1}/>
            <Cell image={require('../../images/iconBotXs.png')} onRemove={()=>bot.bot.title = ''}>
              <TextInput ref="title" placeholder="Enter a title" placeholderTextColor='rgb(211,211,211)' value={bot.bot.title}
                         onChangeText={text=>bot.bot.title = text}
              style={{paddingTop:7*k,height:25*k, width, fontFamily:'Roboto-Regular', fontSize:15*k,
              color:location.isDay? navBarTextColorDay : navBarTextColorNight}}/></Cell>
            <Separator width={1}/>
            <Cell onPress={()=>statem.handle("setAddress", {bot: bot.bot})} image={require('../../images/iconBotLocation.png')}>{bot.bot.isCurrent ? 'Current - ' : '' }{bot.bot.address}</Cell>
            <Separator width={1}/>
            
            {this.hasNote && <View><Cell onPress={()=>statem.handle("setNote", {bot: bot.bot})} onRemove={()=>Alert.alert(null, 'Do you want to delete this note?',[
              {text:'Cancel', style:'cancel'},
              {text:'Delete', style:'destructive', onPress:()=>bot.bot.description = ''}
            ])} image={require('../../images/iconNote.png')}>{bot.bot.description}</Cell><Separator width={1}/></View>}
  
            {this.hasPhoto && <View><Cell onPress={()=>statem.handle("setPhoto", {bot: bot.bot})} onRemove={()=>Alert.alert(null, 'Do you want to delete this photo?',[
              {text:'Cancel', style:'cancel'},
              {text:'Delete', style:'destructive', onPress:()=>bot.bot.image = null}
            ])} image={require('../../images/photoIconsmall.png')}>1 Photo</Cell><Separator width={1}/></View>}
  
            {!this.hasPhoto && <View><CellOptional onPress={()=>statem.handle("setPhoto", {bot: bot.bot})} image={require('../../images/photoIconsmall.png')}>Add Photo</CellOptional><Separator width={1}/></View>}
            {!this.hasNote && <View><CellOptional onPress={()=>statem.handle("setNote", {bot: bot.bot})} image={require('../../images/iconNote.png')}>Add Note</CellOptional><Separator width={1}/></View>}
          </Card>
          <Card isDay={location.isDay} style={{opacity:0.95}}>
            <Header>Settings</Header>
            <Separator width={1}/>
            <Cell image={require('../../images/iconVisibility.png')}>Visible to you and select friends</Cell>
            <Separator width={1}/>
            <Cell image={require('../../images/iconPermissions.png')}>Only you can add photos</Cell>
          </Card>
        </View>
        </ScrollView>
        <SaveButton onSave={this.save}/>
        
      </Screen>
      
    );
  }
}
