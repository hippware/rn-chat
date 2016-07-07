import React, {Component} from "react";
import {View, InteractionManager, StyleSheet, ListView} from "react-native";
import PostOptionsMenu from './PostOptionsMenu';
import {k} from '../globals';
import {Actions} from 'react-native-router-flux';
import {observer} from "mobx-react/native";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import assert from 'assert';
import EventChatCard from './EventChatCard';
import EventFriendCard from './EventFriendCard';
import model from '../model/model';
import EventChat from '../model/EventChat';
import EventFriend from '../model/EventFriend';

const map = {
  EventChat: EventChatCard,
  EventFriend: EventFriendCard,
};
@observer
export default class EventList extends Component {
  
  render(){
    this.dataSource = (this.dataSource || ds).cloneWithRows(model.events.list.map(x=>x));
    
    return   <ListView ref="list" enableEmptySections={true}
                       style={styles.container}
                       scrollEventThrottle={1} {...this.props}
                       dataSource={this.dataSource}
                       renderRow={row => {
                            const CardClass = map[row.event.constructor.name];
                            return <CardClass key={row.event.id} item={row.event} />;
                          }
                       }/>;
    //   <PostOptionsMenu
    // width={this.state.displayArea.width - 15*k}
    // isVisible={this.state.isVisible}
    // fromRect={this.state.buttonRect}
    // item={this.state.item}
    // placement='bottom'
    // displayArea={this.state.displayArea}
    // onClose={this.closePopover.bind(this)}/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});
