import React, {Component} from "react";
import {View, Text, Image, Dimensions, StyleSheet, InteractionManager, TouchableOpacity} from "react-native";
import {k} from '../globals';
import {Actions} from 'react-native-router-flux';
const {height, width} = Dimensions.get('window');

export default class ActionButton extends Component {
  render(){
    return <TouchableOpacity style={[{position:'absolute', bottom:12*k, right:12*k, width:76,height:80},this.props.style] } onPress={()=>Actions.get('rightMenu').ref.open()}>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Image style={this.props.style}
                  source={require('../../images/actionMenu.png')}/>
      </View>
    </TouchableOpacity>;

  }
}

ActionButton.contextTypes = {
  drawer: React.PropTypes.object
};

