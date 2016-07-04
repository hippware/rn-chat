import React, {Component} from "react";
import {TouchableOpacity, TextInput, Image, StyleSheet, ListView, View, Text} from "react-native";
import Screen from './Screen';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import {k} from '../globals';
import {Actions} from 'react-native-router-flux';
import SearchStore from '../store/search';
import SelectableProfileList from '../model/SelectableProfileList';
import assert from 'assert';
import ProfileList from './ProfileList';
import ProfileItem from './ProfileItem';

export default class AddFriendByUsername extends Component {
  static rightButton = ({search, friend, style, textButtonStyle})=><TouchableOpacity
    onPress={()=> {friend.addAll(search.globalResult.selected);Actions.pop();setTimeout(()=>Actions.pop())}}
    style={style}>
    <Text style={[textButtonStyle,
        search.globalResult.selected.length > 0 ?
        styles.barRightButtonText :
        styles.barRightButtonTextInactive]}>Done
    </Text>
  </TouchableOpacity>;

  static backButton = ({search, style, textButtonStyle})=> <TouchableOpacity
    onPress={Actions.pop} style={style}>
      <Text style={textButtonStyle}>Cancel</Text>
  </TouchableOpacity>;
  
  
  render(){
    const search: SearchStore = this.props.search;
    const selection: SelectableProfileList = search.globalResult;
    assert(search, "SearchStore is not defined!");
    return <Screen isDay={this.props.location.isDay}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', height:53*k, backgroundColor:'white'}}>
        <View style={{paddingLeft:22.6*k, paddingRight:14.8*k}}><Image source={require('../../images/iconSearchHome.png')}/></View>
        <TextInput autoFocus autoCorrect={false} autoCapitalize='none' onChangeText={search.setGlobal}
                   value={search.global} placeholder='Enter username' placeholderColor='rgb(211,211,211)'
                   style={{fontSize:15*k, fontFamily:'Roboto-Light', height:53*k, flex:1}}/>
        <TouchableOpacity onPress={()=>search.setGlobal('')}>
          <View style={{paddingRight:22.6*k, paddingLeft:14.8*k}}>
            <Image source={require('../../images/iconClose.png')}/>
          </View>
        </TouchableOpacity>
      </View>
      <ProfileList selection={selection} isDay={this.props.location.isDay} />

    </Screen>;
  }
}

const styles = StyleSheet.create({
  barRightButtonTextInactive: {
    color: 'rgba(254, 92, 108, 0.5)',
  },
  barRightButtonText: {
    color: 'rgb(254, 92, 108)',
  },
});

AddFriendByUsername.propTypes = {
  model: React.PropTypes.any.isRequired,
  search: React.PropTypes.any.isRequired,
};