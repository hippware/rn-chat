import React, {Component} from "react";
import {View, Text, Image, Dimensions, StyleSheet, InteractionManager, TouchableOpacity} from "react-native";
import {k} from '../globals';
import {Actions} from 'react-native-router-flux';
const {height, width} = Dimensions.get('window');

export default class ActionButton extends Component {
  render(){
    return <TouchableOpacity onPress={()=>Actions.refresh({key: 'rightMenu', open:value=>!value})}>
      <Image style={[{position:'absolute', bottom:22*k, right:22*k, borderWidth:1},this.props.style] }
                  source={require('../../images/actionMenu.png')}/>
    </TouchableOpacity>;

  }
}

ActionButton.contextTypes = {
  drawer: React.PropTypes.object
};

