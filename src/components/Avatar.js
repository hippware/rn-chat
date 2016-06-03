import React, {Component} from "react";
import {View, Image, Text} from "react-native";
import {k} from '../globals';

export default class Avatar extends Component {
  setNativeProps(nativeProps) {
    if (this._root){
      this._root.setNativeProps(nativeProps);
    }
  }
  render() {
    const {source, title = ' ', size = 50, style, borderWidth, showFrame} = this.props;
    return <View ref={component => this._root = component} style={[style, {height:size, width:size}]}>
      {source && <Image source={source}
                        style={[{borderWidth:(borderWidth!==undefined ? borderWidth : 2)*k, borderColor:'white'}, style,
                             {width:size*k,height:size*k,borderRadius:size*k/2}]}/> }
      {!source && <View
        style={{width:size*k,height:size*k,borderRadius:size*k/2,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(228,228,228)'}}>
        <Text
          style={{color:'rgb(63,50,77)',fontSize:18*k,fontFamily:'Roboto-Regular'}}>{title[0].toUpperCase()}</Text></View>}
      {showFrame && <View style={{position:'absolute',top:0,left:0,right:0,bottom:0}}><Image
        source={require("../../images/avatarFrame.png") } style={{width:size*k,height:size*k}}/></View>}
    </View>
  };
}

