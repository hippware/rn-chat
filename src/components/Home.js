import React from "react";
import {View, Image, StyleSheet, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"
import {Actions} from 'react-native-router-flux';
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
import statem from '../../gen/state';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.contentOffsetY = 0;
    this.state = {
      top: new Animated.Value(0)

    };
  }

  onScroll(event) {
    // switch nav bar is scroll position is below threshold
    this.contentOffsetY = event.nativeEvent.contentOffset.y;
    if (event.nativeEvent.contentOffset.y > 140 * k) {
      if (!this.props.hideActivityBar) {
        Actions.fullActivities();
      }
    } else {
      if (this.props.hideActivityBar) {
        Actions.restoreHome();
      }
    }
  }

  componentWillReceiveProps(props){
    console.log("RECEIVE PROPS", props.fullMap, this.state.fullMap);
    if (props.fullMap && !this.state.fullMap){
      this.setState({fullMap: true});
      // animate
      Animated.timing(          // Uses easing functions
        this.state.top,    // The value to drive
        {toValue: HEIGHT}            // Configuration
      ).start()
    }
    if (!props.fullMap && this.state.fullMap){
      this.setState({fullMap: false});
      // animate
      Animated.timing(          // Uses easing functions
        this.state.top,    // The value to drive
        {toValue: 0}            // Configuration
      ).start()
    }
  }

  render() {
    const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
    return (
      <View style={{flex:1}}>
        <Map fullMap={this.props.fullMap} location={location.location} isDay={location.isDay}/>
        <Animated.View style={{flex:1, transform: [{translateY:this.state.top}]}}>
          <EventList ref="list"
                 name="list" onScroll={this.onScroll.bind(this)} {...this.props}
                 renderHeader={
                            ()=><View style={{flex:1}}>
                                    <TouchableOpacity style={{height:191*k}} onPress={statem.homeContainer.fullMapScene}/>
                                    <View style={{position:'absolute',height:2000,right:0,left:0,backgroundColor}}/>
                                    <FilterBar style={{paddingLeft:15*k, paddingRight:15*k}}
                                        hidden={this.props.hideActivityBar}
                                        isDay={location.isDay}>
                                        <Text key="all">All</Text>
                                        <Text key="friends">Friends</Text>
                                        <Text key="nearby">Nearby</Text>
                                        <Image key="search" onSelect={()=>console.log("Search")} source={require('../../images/iconSearchHome.png')}/>

                                    </FilterBar>
                             </View>}>
          </EventList>
        </Animated.View>
        <ActionButton/>
      </View>
    );
  }
}
