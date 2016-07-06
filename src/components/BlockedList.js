import React, {Component} from "react";
import {TouchableOpacity, Image, StyleSheet, ListView, View, Text} from "react-native";
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import Screen from './Screen';
import FilterBar from './FilterBar';
import model from '../model/model';
import assert from 'assert';
import ActionButton from './ActionButton';
import FriendCard from './FriendCard';
import Button from 'react-native-button';
import Separator from './Separator';
import friend from '../store/friend';
import Profile from '../model/Profile';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import {observer} from "mobx-react/native";
import location from '../store/location';

@observer
class FollowerCard extends Component {
  render(){
    
    const profile: Profile = this.props.profile;
    return <FriendCard {...this.props}>
      <TouchableOpacity onPress={() => friend.unblock(profile)}>
        <Image style={{margin:20*k}}  source={require('../../images/blockActive.png')}/>
      </TouchableOpacity>
    </FriendCard>
  }
}
FollowerCard.propTypes = {
  profile: React.PropTypes.any.isRequired,
};


export default class BlockedList extends Component {

  render(){
    
    
    const isDay = location.isDay;
    const list = model.friends.blocked;
    this.dataSource = ds.cloneWithRows(list.map(x=>x));
    return <Screen isDay={isDay}>
      <ListView ref="list" style={{flex:1}} scrollEventThrottle={1} {...this.props}
                enableEmptySections={true}
                dataSource={this.dataSource}
                renderRow={row => <FollowerCard key={row.user} isDay={isDay} profile={row}/>}>
      </ListView>
    </Screen>;
  }
}

