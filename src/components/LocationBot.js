import React from "react";
import {View, Slider, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import Map from './Map';
import {Annotation} from 'react-native-mapbox-gl';
import {width, k} from './Global';
import {backgroundColorDay, backgroundColorNight, navBarTextColorDay, navBarTextColorNight} from '../globals';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {when, autorun, observable} from 'mobx';
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
  componentWillMount(){
    if (!bot.bot){
      when(()=>location.location,()=>{
        bot.bot = botFactory.create({location: location.location});
      });
    }
  }
  
  componentDidMount(){
    this.handler = autorun(()=> {
      if (bot.bot && bot.bot.location && this._map) {
        this._map.setCenterCoordinate(bot.bot.location.latitude, bot.bot.location.longitude)
      }
    });
  }
  
  async save(){
    try {
      //await bot.save();
      Actions.pop({animated:false});Actions.pop();
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
        <Map followUser={false} ref={map => { this._map = map; }} fullMap={false} location={bot.bot.location} isDay={location.isDay}>
          <Annotation id="bot" coordinate={{latitude: bot.bot.location.latitude,  longitude: bot.bot.location.longitude}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Image source={require('../../images/location-indicator.png')}/></View>
          </Annotation>
        </Map>
        <GradientHeader/>
        <ScrollView style={{position:'absolute',top:0,bottom:0,right:0,left:0}}>
        <View style={{position:'absolute',top:0,height:175*k,right:0,left:0,backgroundColor: 'transparent'}}/>
        <View style={{position:'absolute',top:175*k,height:2000,right:0,left:0,backgroundColor}}/>
        <View style={{top:175*k}}>
          <Card isDay={location.isDay} style={{opacity:0.95}} collapsed={true} collapsedHeight={158*k}>
            <Header>Bot Info</Header>
            <Separator width={1}/>
            <Cell image={require('../../images/iconBotXs.png')}>
              <TextInput placeholder="Enter a title" placeholderTextColor='rgb(211,211,211)' value={bot.bot.title}
                         onChangeText={text=>bot.bot.title = text}
              style={{paddingTop:7*k,height:25*k, width, fontFamily:'Roboto-Regular', fontSize:15*k,
              color:location.isDay? navBarTextColorDay : navBarTextColorNight}}/></Cell>
            <Separator width={1}/>
            <Cell onPress={()=>statem.locationBotInfo.setAddress({bot: bot.bot})}image={require('../../images/iconBotLocation.png')}>{bot.bot.isCurrent ? 'Current - ' : '' }{bot.bot.address}</Cell>
            <Separator width={1}/>
            <CellOptional image={require('../../images/photoIconsmall.png')}>Add Photo</CellOptional>
            <Separator width={1}/>
            <CellOptional image={require('../../images/iconPrompt.png')}>Add Prompt</CellOptional>
            <Separator width={1}/>
            <CellOptional image={require('../../images/iconDate.png')}>Add Date</CellOptional>
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
