import React, {Component} from "react";
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import moment from 'moment'
import Card from './Card';
import Avatar from './Avatar';
import Screen from './Screen';
import CardText from './CardText';
import FilterBar from './FilterBar';
import assert from 'assert';
import Model from '../model/Model';
import Profile from '../model/Profile';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class FriendsCard extends React.Component {
  render(){
    const profile: Profile = this.props.profile;
    assert(profile, "Profile is not defined");
    return <TouchableOpacity onPress={()=>Actions.profileDetail({item:profile, title:profile.displayName})}>
      <Card isDay={this.props.isDay} style={this.props.style}
            innerStyle={{paddingTop:5*k,paddingLeft:10*k,paddingRight:10*k,paddingBottom:5*k}}>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{padding:5*k}}><Avatar source={profile.avatar && profile.avatar.source} title={profile.displayName} borderWidth={0}/></View>
          <View style={{flex:1, padding:10*k}}><CardText isDay={this.props.isDay}>{profile.displayName} </CardText></View>
        </View>
      </Card>
    </TouchableOpacity>;
  }
}

export default class FriendsList extends Component {

  render(){
    const model: Model = this.props.model;
    const isDay = this.props.model.isDay;
    let list = model.friends.current;
    this.dataSource = (this.dataSource || ds).cloneWithRows(list.map(x=>x));
    const friends = this.props.model.friends;
    return <Screen isDay={isDay}>
      <FilterBar isDay={isDay} style={{paddingLeft:15*k, paddingRight:15*k}}
                 onSelect={data=>friends.setFilter(data.key)}
                 selected={friends.filter}>
        <Text key="all">All</Text>
        <Text key="nearby">Nearby</Text>
        <Image key="search" onSelect={()=>alert("Not implemented!")} source={require("../../images/iconFriendsSearch.png")}></Image>
        <Image key="add" onSelect={()=>Actions.addFriends()}  source={require("../../images/iconAddFriend.png")}></Image>
      </FilterBar>
      <ListView ref="list" style={{flex:1}} scrollEventThrottle={1} {...this.props}
                enableEmptySections={true}
                dataSource={this.dataSource}
                renderRow={row => <FriendsCard key={row.user} isDay={isDay} profile={row}/>}>
      </ListView>
    </Screen>;
  }
}


FriendsList.propTypes = {
  model: React.PropTypes.any.isRequired
};