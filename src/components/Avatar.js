import React, {Component} from "react";
import {View, Image, Text, TouchableOpacity} from "react-native";
import {k} from './Global';
import statem from '../../gen/state';
import location from '../store/location';
const onlineColor = 'rgb(112,176,225)';
const offlineColor = 'rgb(211,211,211)';

import {observer} from 'mobx-react/native';

@observer
export default class Avatar extends Component {
  setNativeProps(nativeProps) {
    if (this._root){
      this._root.setNativeProps(nativeProps);
    }
  }
  render() {
    const {source, hideStatus, title = ' ', size = 50, disableStatus, style, borderWidth, showFrame, profile} = this.props;
    const isDay = location.isDay;
    const Clazz = this.props.tappable ? TouchableOpacity : View;
    return <Clazz style={{justifyContent:'flex-end'}}
      onPress={profile && !profile.isOwn ? ()=>statem.logged.profileDetailsContainer({parent:'_home', item: profile.user}) : null}>
      <View ref={component => this._root = component} style={[style, { height:size*k, width:size*k}]}>
      {!!source && <Image source={source}
                        style={[{borderWidth:(borderWidth!==undefined ? borderWidth : 2)*k,
                        borderColor:isDay ? 'white' : 'rgb(99,62,90)'}, style,
                             {width:size*k,height:size*k,borderRadius:size*k/2}]}/> }
      {!source && <View
        style={{width:size*k,height:size*k,borderRadius:size*k/2,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(228,228,228)'}}>
        <Text
          style={{color:'rgb(63,50,77)',fontSize:18*k,fontFamily:'Roboto-Regular'}}>{title[0].toUpperCase()}</Text></View>}
      {showFrame && <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,justifyContent:'center'}}><Image
        source={require("../../images/avatarFrame.png") } style={{width:size*k,height:size*k}}/></View>}
        {profile && !profile.isOwn && !disableStatus && <View style={{backgroundColor:profile.status === 'available'? onlineColor : offlineColor,height:10*k,width:10*k,position:'absolute',top:size*k*3/4,left:size*k*3/4, borderWidth:1*k, borderRadius:5*k,borderColor:'white'}}></View>}
      </View>
    
    </Clazz>
  };
}

Avatar.defaultProps = {
  tappable: true
};
