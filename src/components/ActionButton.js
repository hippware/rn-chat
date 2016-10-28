import React, {Component} from "react";
import {View, Text, Image, Dimensions, NativeEventEmitter, NativeModules, Animated, StyleSheet, InteractionManager, TouchableOpacity} from "react-native";
import {k} from './Global';
import {Actions} from 'react-native-router-native';
const {height, width} = Dimensions.get('window');
const eventEmitter = new NativeEventEmitter(NativeModules.RCCEventEmitter);

export default class ActionButton extends Component {
  constructor(props){
    super(props);
    this.rotate = new Animated.Value(0);
  }
  componentDidMount(){
    this.subscribe1 = eventEmitter.addListener('WillTransition', ({callbackId, side, percentage}) => {
      if (side==='right'){
        Animated.timing(this.rotate, {toValue: percentage, duration:1}).start();
      }
    });
    this.subscribe2 = eventEmitter.addListener('DidTransition', ({side}) => {
      if (!side)
        Animated.timing(this.rotate, {toValue: 0, duration:1}).start();
    });
  }
  
  componentWillUnmount(){
    eventEmitter.removeSubscription(this.subscribe1);
    eventEmitter.removeSubscription(this.subscribe2);
  }
  
  render(){
    return <TouchableOpacity style={[{position:'absolute', bottom:12*k, right:12*k, width:76,height:80},this.props.style] }
                             onPress={()=>{this.prev=0;Actions.get('drawer').ref.toggle({side:'right', animated:true})}}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Animated.View style={{transform:[{rotate:this.rotate.interpolate({
        inputRange: [0, 1],
         outputRange: ['0deg', '45deg']
      })}]}}><Image style={this.props.style}
                  source={require('../../images/actionMenu.png')}/>
      </Animated.View>
      </View>
    </TouchableOpacity>;

  }
}

ActionButton.contextTypes = {
  drawer: React.PropTypes.object
};

