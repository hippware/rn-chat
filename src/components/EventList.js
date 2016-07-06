import React, {Component} from "react";
import {View, InteractionManager, StyleSheet, ListView} from "react-native";
import PostOptionsMenu from './PostOptionsMenu';
import {k} from '../globals';
import {Actions} from 'react-native-router-flux';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import assert from 'assert';
import ChatCard from './ChatCard';
import {observer} from "mobx-react/native";
import model from '../model/model';
import EventChat from '../model/EventChat';
@observer
export default class EventList extends Component {
  
  render(){
    this.dataSource = (this.dataSource || ds).cloneWithRows(model.events.list.filter(el=>el.event instanceof EventChat).map(x=>x));
    
    return   <ListView ref="list" enableEmptySections={true}
                       style={styles.container}
                       scrollEventThrottle={1} {...this.props}
                       dataSource={this.dataSource}
                       renderRow={row => {
                         
                           return <ChatCard
                        key={row.event.chat.id} item={row.event.chat}
                        onPress={item=>Actions.chat({item})}/>;
                         
                        } }/>
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
