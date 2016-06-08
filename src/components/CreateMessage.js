import React, {Component} from "react";
import {TouchableOpacity, TextInput, Image, StyleSheet, ListView, View, Text} from "react-native";
import assert from 'assert';
import Profile from '../model/Profile';
import SelectableProfile from '../model/SelectableProfile';
import Screen from './Screen';
import File from '../model/File';
import Card from './Card';
import Separator from './Separator';
import {k} from '../globals';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import SearchStore from '../store/SearchStore';
import SelectableProfileList from '../model/SelectableProfileList';
import ProfileList from './ProfileList';
import ProfileItem from './ProfileItem';
import {Actions} from 'react-native-router-flux';

export default class CreateMessage extends Component {
  static backButton = ({search, style, textButtonStyle})=><TouchableOpacity onPress={Actions.pop} style={style}>
    <Text style={textButtonStyle}>Cancel</Text>
  </TouchableOpacity>;


  render() {
    const search: SearchStore = this.props.search;
    const selection: SelectableProfileList = search.localResult;
    
    return <Screen isDay={this.props.model.isDay}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', height:53*k, backgroundColor:'white'}}>
        <View style={{paddingLeft:22.6*k, paddingRight:14.8*k}}><Image source={require('../../images/iconSearchHome.png')}/></View>
        <TextInput autoFocus autoCorrect={false} autoCapitalize='none' onChangeText={search.setLocal}
                   value={search.local} placeholder='Search Friends' placeholderColor='rgb(211,211,211)'
                   style={{fontSize:15*k, fontFamily:'Roboto-Light', height:53*k, flex:1}}/>
        <TouchableOpacity onPress={()=>search.setLocal('')}>
          <View style={{paddingRight:22.6*k, paddingLeft:14.8*k}}>
            <Image source={require('../../images/iconClose.png')}/>
          </View>
        </TouchableOpacity>

      </View>
      <ProfileList selection={selection.list} isDay={this.props.model.isDay} {...{ProfileItem}} />
      </Screen>
  }
}

CreateMessage.propTypes = {
  model: React.PropTypes.any.isRequired,
};


/*
 ProfileList.defaultProps = {
 selection: [
 new SelectableProfile(Profile.mock("user1", {firstName: "Pavel", lastName: "Aksonov", avatar: File.mock(require('../../images/test1.png'))}), true),
 new SelectableProfile(Profile.mock("user2", {firstName: "Olena", lastName: "Aksonova", avatar: File.mock(require('../../images/test2.png'))}), false)
 ],
 isDay: true,
 }
 */
