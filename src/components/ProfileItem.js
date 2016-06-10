import React, {Component} from "react";
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from "react-native";
import Avatar from './Avatar';
import ProfileNameText from './ProfileNameText';
import {k} from '../globals';
import {observer} from "mobx-react/native";

@observer
export default class ProfileItem extends Component {
  render() {
    const {profile, selected, isDay} = this.props;
    const displayName = profile.displayName;
    return <View style={{flex:1, flexDirection:'row', padding:10*k, paddingRight:0, alignItems:'center'}}>
      <View style={{padding:5*k}}>
        <Avatar source={!!profile.avatar && profile.avatar.source}
                size={40}
                isDay={isDay}
                title={displayName}/></View>
      <View style={{flex:1, padding:10*k}}><ProfileNameText
        isDay={isDay}>{profile.displayName}</ProfileNameText></View>
      {profile.isMutual && <Image style={{margin:20*k}} source={require('../../images/group9.png')}/>}
      {selected !== undefined && <View style={{width:40*k, padding:10*k}}>
        <Image style={{right:20*k}}
          source={selected ? require('../../images/contactSelect.png') : require('../../images/contactUnselect.png')}/>
      </View>}
      {this.props.children}
    </View>

  }
}

ProfileItem.propTypes = {
  profile: React.PropTypes.any.isRequired,
  isDay: React.PropTypes.bool.isRequired,
  selected: React.PropTypes.bool,
};