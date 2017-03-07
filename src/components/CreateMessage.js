import React, {Component} from "react";
import {TouchableOpacity, TextInput, Image, StyleSheet, ListView, View, Text, InteractionManager} from "react-native";
import assert from 'assert';
import Profile from '../model/Profile';
import model from '../model/model';
import SelectableProfile from '../model/SelectableProfile';
import Screen from './Screen';
import File from '../model/File';
import Card from './Card';
import Separator from './Separator';
import {k} from './Global';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import SearchStore from '../store/searchStore';
import SelectableProfileList from '../model/SelectableProfileList';
import ProfileList from './ProfileList';
import ProfileItem from './ProfileItem';
import Button from 'react-native-button';
import location from '../store/locationStore';
import message from '../store/messageStore';
import statem from '../../gen/state';
import {Actions} from 'react-native-router-native';
import {observer} from 'mobx-react/native';
import {action, autorun, reaction, computed, observable} from 'mobx';

@observer
export default class CreateMessage extends Component {
  @observable selection: SelectableProfileList = new SelectableProfileList(model.friends.friends, false);
  
  static backButton = ({state, style, textButtonStyle})=><TouchableOpacity onPress={()=>InteractionManager.runAfterInteractions(state.parent.pop)} style={style}>
    <Text style={textButtonStyle}>Cancel</Text>
  </TouchableOpacity>;
  
  render() {

    return <Screen isDay={location.isDay}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', height:53*k, backgroundColor:'white'}}>
        <View style={{paddingLeft:22.6*k, paddingRight:14.8*k}}><Image source={require('../../images/iconSearchHome.png')}/></View>
        <TextInput autoCorrect={false} autoCapitalize='none' onChangeText={text=>this.selection.filter = text}
                   value={this.selection.filter} placeholder='Search Friends' placeholderColor='rgb(211,211,211)'
                   style={{fontSize:15*k, fontFamily:'Roboto-Light', height:53*k, flex:1}}/>
        <TouchableOpacity onPress={()=>this.selection.filter = ''}>
          <View style={{paddingRight:22.6*k, paddingLeft:14.8*k}}>
            <Image source={require('../../images/iconClose.png')}/>
          </View>
        </TouchableOpacity>

      </View>
      <ProfileList selection={this.selection} isDay={location.isDay}
                   onSelect={profile=>{Actions.pop();statem.selectFriends.createMessage(profile)}}/>
      {!!this.selection.selected.length &&
      <Button containerStyle={styles.button}
              onPress={()=>statem.selectFriends.createMessage(this.selection.selected[0])}
              style={{color:'white',letterSpacing:0.7, fontSize:15, fontFamily:'Roboto-Regular', textAlign:'center'}}>
        Send Message
      </Button>}
    </Screen>;
//    Send Message to {selection.selected.length} Friend{selection.selected.length > 1 ? 's' : ''}
  }
}

const styles = StyleSheet.create({
  button: {position:'absolute',
    right:0, left:0, alignItems:'center', justifyContent:'center',
    bottom:0, height:60*k, backgroundColor:'rgb(254,92,108)', shadowOpacity: 0.09, shadowRadius: 6,
    shadowOffset: {height: -2, width: 0}}
});
/*
 ProfileList.defaultProps = {
 selection: [
 new SelectableProfile(Profile.mock("user1", {firstName: "Pavel", lastName: "Aksonov", avatar: File.mock(require('../../images/test1.png'))}), true),
 new SelectableProfile(Profile.mock("user2", {firstName: "Olena", lastName: "Aksonova", avatar: File.mock(require('../../images/test2.png'))}), false)
 ],
 isDay: true,
 }
 */
