import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import Screen from './Screen';
import botFactory from '../factory/bot';
import Map from './Map';
import {Annotation} from 'react-native-mapbox-gl';
import GradientHeader from './GradientHeader';
import {k} from './Global';
import BotAvatar from './BotAvatar';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import botStore from '../store/bot';
import location from '../store/location';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import ActionButton from './ActionButton';
@observer
export default class extends React.Component {
  @observable bot;
  
  componentWillMount(){
    if (!this.props.item && !botStore.bot){
      console.error("Bot ID is not defined");
    }
    if (this.props.item){
      this.bot = botFactory.create({id: this.props.item});
    }
    
  }
  render(){
    const bot = botStore.bot;
    return <Screen>
      <Map followUser={false} location={bot.location}/>
      <GradientHeader/>
      <View style={{position:'absolute',top:0,bottom:0,right:0,left:0}}>
        <View style={{backgroundColor:'rgba(255,255,255,0.85)',flex:1,top:98*k,right:15*k,left:15*k,bottom:350*k, position:'absolute',borderColor: 'white',
    borderRadius: 2,
    shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,}}>
          <View style={{paddingTop:58*k, alignItems:'center',flex:1}}>
            <Text numberOfLines={1} style={{paddingLeft:22*k,paddingRight:22*k,fontSize:20*k, color:'rgb(63,50,77)',fontFamily:'Roboto-Medium'}}>{bot.title}</Text>
            <Text numberOfLines={1} style={{paddingLeft:13*k,paddingRight:13*k,fontSize:15*k, color:'rgb(63,50,77)',fontFamily:'Roboto-Light'}}>{bot.address}</Text>
            <Text numberOfLines={1} style={{paddingLeft:13*k,paddingRight:13*k,paddingTop:16*k,fontSize:12*k, color:'rgb(155,155,155)',fontFamily:'Roboto-Italic'}}>
              {!bot.owner || bot.owner.isOwn? "You created this bot" : bot.owner.handle}</Text>
          </View>
        </View>
        <View style={{backgroundColor:location.isDay ? 'rgba(241,242,244,0.85)' : 'rgba(49,37,62,0.90)',top:335*k,right:0*k,left:0*k,bottom:0*k, position:'absolute'}}>
          
          <View style={{backgroundColor:'rgba(255,255,255,0.85)',height:41*k,justifyContent:'center',shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12, }}>
            <Text numberOfLines={1} style={{paddingLeft:26*k,fontSize:14*k, color:'rgb(63,50,77)',fontFamily:'Roboto-Regular'}}>{bot.type === LOCATION ? 'Location' : bot.type === NOTE ? 'Note' : 'Photo'}</Text>
          </View>
          {bot.type === LOCATION && <View style={{flex:1,paddingTop:15*k,paddingRight:15*k,paddingLeft:15*k,paddingBottom:60*k,}}>
            <View  style={{backgroundColor:'rgba(255,255,255,0.85)',flex:1,
        borderColor: 'white', borderWidth:2, shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,}}>
              {bot.location && <Map followUser={false} fullMap={true} location={bot.location}>
                <Annotation id="bot"  style={{alignItems:'center', justifyContent:'center'}} coordinate={{latitude: bot.location.latitude,  longitude: bot.location.longitude}}>
                  <Image source={require('../../images/location-indicator.png')}/>
                </Annotation>
              </Map>}
              <View style={{top:0*k,right:0*k,left:0*k,bottom:0*k, position:'absolute'}}/>
              
              </View>
              
          </View>}
  
          {bot.type === NOTE && <ScrollView style={{paddingTop:15*k,paddingRight:15*k,paddingLeft:15*k,paddingBottom:60*k}}>
            <View  style={{backgroundColor:'rgba(255,255,255,0.85)',
        borderRadius:2, shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,paddingTop:15*k, paddingRight:20*k, paddingLeft:20*k, paddingBottom:20*k}}>
              <Text numberOfLines={0} style={{fontFamily:'Roboto-Light', fontSize:15, color:'rgb(63,50,77)'}}>{bot.description}</Text>
                
    
          
          </View></ScrollView>}
          
        </View>
        
        <View style={{top:66*k,right:15*k,left:15*k,justifyContent:'center', alignItems:'center',position:'absolute'}}>
          <BotAvatar size={64*k}/>
        </View>
      
      </View>
      <ActionButton/>
    </Screen>
  }
}