import React from "react";
import {View, Image, StyleSheet, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"
import {Actions} from 'react-native-router-native';
import FilterBar from './FilterBar';
import FilterTitle from './FilterTitle';
import {k, backgroundColorDay, backgroundColorNight} from '../globals';
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
import NavBarCloseButton from './NavBarCloseButton';
import assert from 'assert';
import ActionButton from './ActionButton';
import Chats from './Chats';
import Map from './Map';
import location from '../store/location';
import model from '../model/model';
import EventList from './EventList';
import {observer} from 'mobx-react/native';
import {autorun} from 'mobx';
import statem from '../../gen/state';
import OfflineHome from './OfflineHome';
import autobind from 'autobind-decorator';

@autobind
@observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.contentOffsetY = 0;
    this.state = {
      top: new Animated.Value(0),
      hideActivityBar: false,
      
    };
  }
  
  onScroll(event) {
    // switch nav bar is scroll position is below threshold
    this.contentOffsetY = event.nativeEvent.contentOffset.y;
    if (event.nativeEvent.contentOffset.y > 90 * k) {
      if (!this.state.hideActivityBar) {
        this.setState({hideActivityBar: true});
      }
    } else {
      if (this.state.hideActivityBar) {
        this.setState({hideActivityBar: false});
      }
    }
  }
  componentDidMount(){
    this.mounted = true;
    autorun(()=>{
      const disconnected = statem.disconnected.active && !model.connecting;
      if (this.mounted && this.state.disconnected !== disconnected){
        this.setState({disconnected});
      }
    })
  }

  componentWillMount () {
    this.handler = autorun(()=> {
      console.log("REFRESH BADGE", model.chats.unread, model.friends.newFollowers.length);
      for (let key of ['home_', 'friendsMain', 'myAccount_']){
        Actions.refresh({key,
          rightButtons: [{badgeValue: `${model.chats.unread}`}],
          leftButtons: [{badgeValue: `${model.friends.newFollowers.length}`}]
        });
      }
    });
    
  }
  
  componentWillUnmount() {
    this.mounted = false;
    if (this.handler) {
      this.handler();
      this.handler = null;
    }
  }
  
  scrollTo(num){
    InteractionManager.runAfterInteractions(()=>{
      Animated.timing(          // Uses easing functions
        this.state.top,    // The value to drive
        {toValue: num}            // Configuration
      ).start();
    });
  }
  
  render() {
    if (this.props.fullMap && !this.state.fullMap){
      // animate
      InteractionManager.runAfterInteractions(()=>{
        this.setState({fullMap: true});
        
        Animated.timing(          // Uses easing functions
          this.state.top,    // The value to drive
          {toValue: HEIGHT}            // Configuration
        ).start()
      });
    }
    if (!this.props.fullMap && this.state.fullMap){
      // animate
      InteractionManager.runAfterInteractions(()=>{
        this.setState({fullMap: false});
        this._map.setCenterCoordinate(location.location.latitude, location.location.longitude);
        this._map.setZoomLevel(17);
        Animated.timing(          // Uses easing functions
          this.state.top,    // The value to drive
          {toValue: 0}            // Configuration
        ).start();
      });
    }
    //console.log("RENDER HOME, isDay:", location.isDay, location.location);
    const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
    return (
      <View style={{flex:1}}>
        <Map
          ref={map => { this._map = map; }}
          followUser={true} fullMap={this.props.fullMap} location={location.location} isDay={location.isDay}/>
        <Animated.View style={{flex:1, transform: [{translateY:this.state.top}]}}>
          <EventList ref="list"
                     name="list" onScroll={this.onScroll.bind(this)}
                     renderHeader={
                            ()=><View style={{flex:1, marginBottom:10}}>
                                    <TouchableOpacity style={{height:191*k}} onPress={()=>statem.home.fullMap()}/>
                                    <View style={{position:'absolute',height:2000,right:0,left:0,backgroundColor}}/>
                                    <FilterBar style={{paddingLeft:15*k, paddingRight:15*k}}
                                        hidden={this.state.hideActivityBar}
                                        isDay={location.isDay}>
                                        <Text key="all">All</Text>
                                        <Text key="friends">Friends</Text>
                                        <Text key="nearby<">Nearby</Text>
                                        <Image key="search" onSelect={()=>console.log("Search")} source={require('../../images/iconSearchHome.png')}/>

                                    </FilterBar>
                                      {this.state.disconnected && <OfflineHome/>}
                             </View>}>
          </EventList>
        </Animated.View>
        <ActionButton/>
        {this.state.hideActivityBar && <FilterTitle onPress={()=>{this.refs.list.scrollTo({x:0, y:0})}}/>}
      </View>
    );
  }
}
