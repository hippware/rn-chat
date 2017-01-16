import React from 'react';
import Mapbox, { MapView, Annotation } from 'react-native-mapbox-gl';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  StatusBarIOS,
  View,
  Dimensions,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {k} from './Global';
import assert from 'assert';
import {observer} from "mobx-react/native";
import {autorun, observable} from 'mobx';
import location from '../store/location';
const {height, width} = Dimensions.get('window');
Mapbox.setAccessToken('pk.eyJ1Ijoia2lyZTcxIiwiYSI6IjZlNGUyYmZhZGZmMDI3Mzc4MmJjMzA0MjI0MjJmYTdmIn0.xwgkCT1t-WCtY9g0pEH1qA');
Mapbox.setMetricsEnabled(false);
const CURRENT = 'current';
import autobind from 'autobind-decorator';
import model from '../model/model';
import statem from '../../gen/state';
import {MessageBar, MessageBarManager} from 'react-native-message-bar';
import TransparentGradient from './TransparentGradient';

class OwnMessageBar extends MessageBar {
  componentWillReceiveProps(nextProps) {
  }
}

function getAnnotation(coords){
  return {
    coordinate: {latitude: coords.latitude, longitude: coords.longitude},
    title: '',
    type: 'point',
    id: CURRENT,
    annotationImage:{
      source:{uri:'location-indicator'},
//            url:'rotatedImage!'+coords.heading+'!location-indicator',
      height:40*k,
      width:40*k
    }
  }
}

@autobind
@observer
export default class Map extends React.Component {
  @observable location;
  
  constructor(props){
    super(props);
    this.state = {selectedBot : this.props.selectedBot}
  }
  
  onRegionDidChange(location) {
    this._map.getBounds(bounds=>{
      this.props.onBoundsDidChange && this.props.onBoundsDidChange(bounds, location.zoomLevel);
    })
  }
  
  setCenterCoordinate(latitude, longitude, animated = true, callback) {
    return this._map.setCenterCoordinate(latitude, longitude, animated, callback);
  }
  setZoomLevel(zoomLevel, animated = true, callback) {
    this._map.setZoomLevel(zoomLevel, animated, callback);
  }
  
  componentDidMount(){
    if (this.props.followUser){
      this.handler = autorun(()=> {
        const coords = location.location;
        if (this._map && coords) {
          this._map.setCenterCoordinate(coords.latitude, coords.longitude)
        }
      });
    }
    
  }
  
  componentWillReceiveProps(props){
    if (props.fullMap === false && this.state.selectedBot){
      this.setState({selectedBot : ''});
      MessageBarManager.hideAlert();
    }
  }
  
  onOpenAnnotation(annotation) {
    if (annotation.id === this.state.selectedBot){
      this.setState({selectedBot : ''});
      MessageBarManager.hideAlert();
      return;
    }
    this.setState({selectedBot : annotation.id});
    const bot: Bot = model.bots.list.find(bot=>bot.id === annotation.id);
    if (!bot){
      alert("Cannot find bot with id: " + annotation.id);
      return;
    }
    MessageBarManager.showAlert({
      title: bot.title,
      titleNumberOfLines: 1,
      messageNumberOfLines: 1,
      shouldHideOnTap: false,
      message: bot.address,
      avatar: bot.image ? bot.image.source : require('../../images/avatarNoPic.png'),
      position: 'bottom',
      titleStyle: { color: 'rgb(63,50,77)', fontSize: 18, fontFamily: 'Roboto-Medium' },
      messageStyle: { color: 'rgb(63,50,77)', fontSize: 16, fontFamily:'Roboto-Regular' },
      avatarStyle: { height: 40, width: 40, borderRadius: 20 },
      stylesheetSuccess:{ backgroundColor: 'white', strokeColor: 'transparent' },
      onTapped: ()=>{
        // MessageBarManager.hideAlert();
        statem.fullMap.botDetails({item: bot.id});
      },
      shouldHideAfterDelay: false,
      alertType: 'success',
      // See Properties section for full customization
      // Or check `index.ios.js` or `index.android.js` for a complete example
    });
  }
  
  componentWillUnmount(){
    if (this.handler){
      this.handler();
    }
    // <View style={{transform: heading ? [{rotate: `${360+heading} deg`}] : []}}>
    //     <Image source={require('../../images/location-indicator.png')}/>
    // </View>
  }
  
  render() {
    if (!location.location){
      console.log("MAP CANNOT BE RENDERED - NULL LOCATION!");
      return null;
    }
    const isDay = location.isDay;
    const current = location.location;
    const coords = this.props.followUser ? location.location : this.props.location;
    const list = this.props.bot && !model.bots.get(this.props.bot.id) ? [...model.bots.list, this.props.bot] : model.bots.list;
    const annotations = list.map(bot => {return {
      coordinates: [bot.location.latitude, bot.location.longitude],
      type: 'point',
      annotationImage: {
        source: {
          uri: this.state.selectedBot === bot.id ? 'selectedPin' : 'botPinNew'
        },
        height: 96,
        width: 87
      },
      id: bot.id
    }})
    const heading = coords && coords.heading;
    //console.log("MAP COORDS", JSON.stringify(coords));
    return (<View style={{position:'absolute',top:0,bottom:0,right:0,left:0}}>
        {coords && <MapView
          ref={map => { this._map = map; }}
          style={styles.container}
          initialDirection={0}
          logoIsHidden={true}
          scrollEnabled={true}
          zoomEnabled={true}
          styleURL={isDay ? "mapbox://styles/kire71/cil41aiwc005l9fm1b2om6ecr" : "mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab"}
          //mapbox://styles/kire71/cijvygh6q00j794kqtx21ffab
          userTrackingMode={ Mapbox.userTrackingMode.none }
          initialCenterCoordinate={coords}
          contentInset={this.props.fullMap ? [0,0,0,0]:[-height/1.5,0,0,0]}
          compassIsHidden={false}
          attributionButtonIsHidden={true}
          showsUserLocation={false}
          initialZoomLevel={17}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onRegionDidChange={this.onRegionDidChange}
          onUpdateUserLocation={this.onUpdateUserLocation}
          onLongPress={this.onLongPress}
          annotations={annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          {...this.props}
        >
          {(this.props.followUser || this.props.showUser) && <Annotation id="current" coordinate={{latitude: current.latitude, longitude: current.longitude}}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <View style={{transform: heading ? [{rotate: `${360+heading} deg`}] : []}}><Image source={require('../../images/location-indicator.png')}/></View>
            </View>
          </Annotation>}
          {this.props.children}
        </MapView>}
        {!this.props.fullMap && <View style={{position:'absolute', top:0, left: 0, right:0, bottom:0}}>
            <TransparentGradient isDay={location.isDay} style={{height:191*k}}/>
        </View>}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
