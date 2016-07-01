import React, {Component} from "react";
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import Screen from './Screen';
import FilterBar from './FilterBar';
import Model from '../model/Model';
import assert from 'assert';
import ActionButton from './ActionButton';
import FriendCard from './FriendCard';
import Button from 'react-native-button';
import Separator from './Separator';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class FriendsList extends Component {

  render(){
    const model: Model = this.props.model;
    const isDay = this.props.location.isDay;
    const list = this.props.filter === "all" ? model.friends.all : model.friends.nearby;
    this.dataSource = ds.cloneWithRows(list.map(x=>x));
    return <Screen isDay={isDay}>
      <FilterBar isDay={isDay} style={{paddingLeft:15*k, paddingRight:15*k}}
                 onSelect={data=>Actions.refresh({filter:data.key})}
                 selected={this.props.filter}>
        <Text key="all">All</Text>
        <Text key="nearby">Nearby</Text>
        <Image key="search" onSelect={()=>alert("Not implemented!")} source={require("../../images/iconFriendsSearch.png")}></Image>
        <Image key="add" onSelect={()=>Actions.addFriends()}  source={require("../../images/iconAddFriend.png")}></Image>
      </FilterBar>
      {!!model.friends.followers.length &&
      <View>
        {!!model.friends.newFollowers.length && <TouchableOpacity style={styles.newButton}
                                                       onPress={()=>Actions.followers({filter:'newFollowers'})}>
          <Text style={styles.text}>You have {model.friends.newFollowers.length} new follower{model.friends.newFollowers.length > 1 ? 's' : ''}</Text>
          <Text style={styles.italicText}>Follow back so you can message them</Text>
        </TouchableOpacity>}
        {!model.friends.newFollowers.length && <Button containerStyle={styles.button} onPress={Actions.followers} style={styles.text}>
          You have {model.friends.followers.length} Follower{model.friends.followers.length > 1 ? 's' : ''}
        </Button>}
        <Separator/>
      </View>}
      {!model.friends.followers.length && !!model.friends.blocked.length &&
      <View>
        <Button containerStyle={styles.button} onPress={Actions.blocked} style={styles.text}>
          {model.friends.blocked.length} Blocked
        </Button>
        <Separator/>
      </View>}
      <ListView ref="list" style={{flex:1}} scrollEventThrottle={1} {...this.props}
                enableEmptySections={true}
                dataSource={this.dataSource}
                renderRow={row => <FriendCard key={row.user} isDay={isDay} profile={row}/>}>
      </ListView>
      <ActionButton/>
    </Screen>;
  }
}

FriendsList.defaultProps = {
  filter: 'all',
}

const styles = StyleSheet.create({
  button: {
    right:0, left:0, alignItems:'center', justifyContent:'center', marginTop: 8*k, marginBottom: 8*k,
    height:40*k, backgroundColor:'rgb(155,155,155)', shadowOpacity: 0.12, shadowRadius: 5,
    shadowOffset: {height: 1, width: 0}},
  newButton: {
    right:0, left:0, alignItems:'center', justifyContent:'center', marginTop: 8*k, marginBottom: 8*k,
    height:66*k, backgroundColor:'rgba(254,92,108,0.9)', shadowOpacity: 0.12, shadowRadius: 5,
    shadowOffset: {height: 1, width: 0}},
  text: {color:'white',letterSpacing:0.7, fontSize:15, fontFamily:'Roboto-Regular', textAlign:'center'},
  italicText: {color:'white',letterSpacing:0.7, fontSize:15, fontFamily:'Roboto-Italic', textAlign:'center'}
});


FriendsList.propTypes = {
  model: React.PropTypes.any.isRequired
};