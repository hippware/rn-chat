import React, {Component, PropTypes} from "react";
import {View, Text, Image} from 'react-native';
import NavBar from './NavBar';
import NavBarBackButton from './NavBarBackButton';
import NavBarRightButton from './NavBarRightButton';
import {k, width, height} from './Global';
import location from '../store/location';
import Bot, {VISIBILITY_PUBLIC, VISIBILITY_OWNER, LOCATION, NOTE, IMAGE} from '../model/Bot';

export default class extends React.Component {
  static propTypes = {
    bot: PropTypes.any.isRequired
  };
  
  render(){
    const bot = this.props.bot;
    const isDay = location.isDay;
    const isOwn = !bot.owner || bot.owner.isOwn;
    return <NavBar>
      <View style={{paddingTop:10, paddingLeft:68*k, paddingRight:68*k}}>
        <Text numberOfLines={1} style={{fontFamily:'Roboto-Medium', fontSize:this.props.fullMap ? 16 : 18, color:isDay ? 'rgb(63,50,77)':'white'}}>{bot.title}</Text>
        {this.props.fullMap && <Text numberOfLines={1} style={{fontFamily:'Roboto-Light', fontSize:14, color:isDay ? 'rgb(63,50,77)':'white'}}>{bot.address}</Text>}
      </View>
      <NavBarBackButton/>
      {((isOwn && bot.visibility !== VISIBILITY_OWNER)|| bot.visibility === VISIBILITY_PUBLIC) &&
      <NavBarRightButton onPress={()=>statem.logged.botShare({item: bot.id})}>
        <Image source={require('../../images/iconShareNew.png')}/>
      </NavBarRightButton>
      }

    </NavBar>;
  }
}