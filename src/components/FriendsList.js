import React, {Component} from "react";
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import Screen from './Screen';
import FilterBar from './FilterBar';
import Model from '../model/Model';
import assert from 'assert';
import ActionButton from './ActionButton';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class FriendsList extends Component {

  render(){
    const model: Model = this.props.model;
    const FriendCard = this.props.FriendCard;
    assert(FriendCard, "FriendCard component is not passed");
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
                renderRow={row => <FriendCard key={row.user} isDay={isDay} profile={row}/>}>
      </ListView>
      <ActionButton/>
    </Screen>;
  }
}


FriendsList.propTypes = {
  model: React.PropTypes.any.isRequired
};