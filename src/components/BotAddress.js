import React from "react";
import {View, Slider, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import Map from './Map';
import {Annotation} from 'react-native-mapbox-gl';
import location, {METRIC, IMPERIAL} from '../store/location';
import {width, k} from './Global';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import NativeEnv from 'react-native-native-env';
import Separator from './Separator';
import statem from '../../gen/state';
import botFactory from '../factory/bot';
import bot from '../store/bot';
import Bot from '../model/Bot';
import Address from '../model/Address';
import SaveButton from './SaveButton';

const SYSTEM = NativeEnv.get('NSLocaleUsesMetricSystem') ? METRIC : IMPERIAL;
location.setMetricSystem(SYSTEM);
const MIN = 3;
const MAX = 300;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


@autobind
@observer
export default class LocationBotAddress extends React.Component {
  bot: Bot;
  @observable address: Address;
  
  constructor(props){
    super(props);
    this.zoom = 0;
    this.nextZoom = 0;
    this.state = {radius: 30, focused: false};
  }
  
  componentWillMount(){
    //console.log("BotAddress:", JSON.stringify(bot.bot));
    when(()=>bot.bot && bot.bot.location, ()=>{
      this.bot = new Bot({...bot.bot});
      this.address = new Address(this.bot.location);
      this.radius = this.bot.radius;
    });
  }
  
  setRadius(value){
    // convert value in meters/feets to value in pixels
    const distance = location.distance(this.lat1, this.long1, this.lat1, this.long2);
    const radius = Math.round(width * value / distance);
    console.log("PREV RADIUS", this.state.radius, radius, distance, value, width)
    let changeState = false;
    if (this.state.radius != radius){
      this.bot.radius = value;
      this.radius = value;
      const zoomLevel = this.zoom;
        if (3*radius > width){
          if (this.nextZoom != zoomLevel + 1){
            console.log("DECREASE ZOOM TO", zoomLevel - 1);
            this.refs.map.setZoomLevel(zoomLevel - 1, false);
            this.nextZoom = zoomLevel - 1;
          } else {
            console.log("NEXT ZOOM IS THE SAME", this.nextZoom);
            changeState = true;
          }
        } else if (radius < 10){
          if (this.nextZoom != zoomLevel + 1){
            console.log("INCREASE ZOOM TO", zoomLevel + 1);
            this.refs.map.setZoomLevel(zoomLevel + 1, false);
            this.nextZoom = zoomLevel + 1;
          } else {
            console.log("NEXT ZOOM IS THE SAME", this.nextZoom);
            changeState = true;
          }
        } else {
          changeState = true;
        }
      if (changeState) {
        this.refs.map.setCenterCoordinate(this.address.location.latitude, this.address.location.longitude);
        this.setState({radius});
      }
    }
  }
  
  onBoundsDidChange(bounds, zoom) {
    if (this.lat1 === bounds[0] && this.long1===bounds[1] && this.lat2===bounds[2] && this.long2==bounds[3] && this.zoom===zoom){
      return;
    }
    if (zoom < 10){
      return;
    }
    console.log('bounds:', bounds, zoom);
    this.lat1 = bounds[0];
    this.long1 = bounds[1];
    this.lat2 = bounds[2];
    this.long2 = bounds[3];
    this.zoom = zoom;
    this.setRadius(this.radius);
  }
  
  redirectToLocation(coords){
    console.log("REDIRECT TO", coords);
    setTimeout(()=>{
      this.address.location = coords;
      // reset bot address to recalculate it
      this.bot.location = coords;
      this.bot.address = undefined;
      this.bot.isCurrent = false;
      this.refs.map.setCenterCoordinate(coords.latitude, coords.longitude, true);
      this.setState({focused: false});
      this.refs.input.blur();
    });
  }
  
  render(){
    if (!this.address || !bot.bot){
      return null;
    }
    const radius = this.state.radius;
    console.log("LocationBotAddress render", radius);
    return <View style={{flex:1}}>
      <Map ref='map' fullMap={true} followUser={false} location={this.address.location} isDay={location.isDay} onBoundsDidChange={this.onBoundsDidChange}
           onTap={(coords)=>this.redirectToLocation(coords)}
      >
        <Annotation id="bot"  style={{backgroundColor:'rgba(254,97,107,0.09)', borderWidth:1, borderColor:'rgb(254,97,108)', width:radius*2, height:radius*2, borderRadius:radius}}
                    coordinate={{latitude: this.address.location.latitude,  longitude: this.address.location.longitude}}>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Image source={require('../../images/location-indicator.png')}/></View>
        </Annotation>
      </Map>
      <View style={{position:'absolute', bottom: 80*k,
            left:(this.radius-MIN)*(width*k-130*k-30*k)/(MAX-MIN)+80*k,
          shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,
            padding:2*k,
            width:60*k,
            alignItems:'center',
            backgroundColor:'white'
      }}><Text style={{fontFamily:'Roboto-Regular', fontSize:15*k, color:'rgb(63,55,77)'}}>{location.distanceToString(this.radius)}</Text></View>
      <Slider style={{position:'absolute', bottom:40*k, right:30*k, left:100*k}}
              minimumValue={MIN}
              thumbImage={require('../../images/sliderIcon.png')}
              value={this.radius}
              maximumValue={MAX}
              minimumTrackTintColor='rgb(254,97,108)'
              maximumTrackTintColor='rgb(155,155,155)'
              onValueChange={(radius) => this.setRadius(radius)} />
      <View style={{position:'absolute', right:61*k, left:61*k, top:25*k, height:44*k, backgroundColor:'rgba(255,255,255,0.9)', paddingTop:11*k,
      paddingBottom:13*k, paddingLeft:14*k, paddingRight:9*k, flexDirection:'row', borderRadius:2*k}}>
        <Image source={require('../../images/iconBotLocation.png')}/>
        <TextInput style={{flex:1, shadowOffset: {height:1, width:0},
            shadowRadius:5*k, shadowOpacity:0.12, paddingLeft:8.4*k, height:20*k, fontFamily:'Roboto-Regular', color:'rgb(63,50,77)',fontSize:15*k}}
                   ref='input'
                   clearButtonMode='while-editing'
                   onFocus={()=>this.setState({focused: true})}
                   onSubmitEditing={()=>this.setState({focused: false})}
                   placeholderTextColor='rgb(63,50,77)'
                   onChangeText={text=>this.address.text = text}
                   value={this.address.text} />
      </View>
      <View pointerEvents='box-none' style={[{position:'absolute', top:80*k, bottom:0, right:0, left:0, paddingTop:10.7*k, paddingRight: 15*k, paddingLeft:15*k} ]}>
        {this.state.focused && <View style={{height:45*k+10.7*k+(this.address.suggestions.length ? 10.7*k+this.address.suggestions.length*43.4*k : 0)}}>
          <ListView scrollEnabled={false} enableEmptySections={true} style={{ paddingBottom:10.7*k}} pointerEvents='box-none'
                    dataSource={ds.cloneWithRows(this.address.suggestions.map(x=>x))}
                    renderRow={row => <TouchableOpacity key={row.id+'vjew'}
                      onPress={()=>this.redirectToLocation({latitude: row.center[1], longitude: row.center[0]})}>
                    <View style={{flexDirection:'row',paddingLeft:14*k,paddingTop:13*k, paddingBottom:13*k, backgroundColor:'rgba(255,255,255,0.9)'}}>
                    <Image style={{width:14}} source={require('../../images/iconBotLocation.png')}/>
                    <Text style={{flex:1, paddingLeft:8.4*k, fontFamily:'Roboto-Regular', color:'rgb(63,50,77)'}} numberOfLines={1}>{row.place_name}</Text>
                    <Text style={{width:75*k, paddingLeft:12*k}}>{row.distance}</Text>
                    </View></TouchableOpacity>}
                    renderSeparator={(s,r) => <View  key={r+'sep'} style={{backgroundColor:'rgba(255,255,255,0.9)'}}><Separator width={1}/></View>}
                    renderFooter={()=> <View style={{paddingTop:10.7*k}}><TouchableOpacity onPress={()=>alert("Follow me!")}style={{height:45*k, justifyContent:'center', paddingLeft:27*k, borderRadius: 2*k,
          backgroundColor:'rgba(255,255,255,0.95)',shadowOffset: {height:1, width:0}, shadowRadius:5*k, shadowOpacity:0.12}}>
          <Text style={{color:'rgb(254,97,108)', fontFamily:'Roboto-Bold',}}><Text>Follow me</Text> for 30 min</Text>
        </TouchableOpacity>
        
        
        </View>
            
          }
          /></View>}
      </View>
      <SaveButton onSave={()=>this.props.onSave(this.bot)}/>
    </View>;
    
  }
}