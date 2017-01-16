import React, {Component} from "react";
import {TouchableOpacity, TextInput, Image, StyleSheet, ListView, View, Text} from "react-native";
import Screen from './Screen';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import {k} from './Global';
import {Actions} from 'react-native-router-native';
import SearchStore from '../store/search';
import SelectableProfileList from '../model/SelectableProfileList';
import assert from 'assert';
import ProfileList from './ProfileList';
import ProfileItem from './ProfileItem';
import location from '../store/location';
import search from '../store/search';
import friend from '../store/friend';
import {autorun} from 'mobx';
import {observer} from 'mobx-react/native';
import SaveButton from './SaveButton';

@observer
export default class AddFriendByUsername extends Component {
  static rightButton = ({style, textButtonStyle})=><TouchableOpacity
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
    const selection: SelectableProfileList = search.globalResult;
    assert(search, "SearchStore is not defined!");
    if (selection && selection.selected){
      console.log("SELECTION:", selection.selected)
      if (selection.selected.length){
        Actions.refresh({key: 'addFriendByUsername', rightButtonDisabled: false});
      } else {
        Actions.refresh({key: 'addFriendByUsername', rightButtonDisabled: true});
      }
    }
    return <Screen isDay={location.isDay}>
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
      <ProfileList selection={selection} isDay={location.isDay} />

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
