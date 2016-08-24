import React, {Component} from "react";
import {View, InteractionManager, StyleSheet, ListView} from "react-native";
import PostOptionsMenu from './PostOptionsMenu';
import {k} from './Global';
import {Actions} from 'react-native-router-native';
import {observer} from "mobx-react/native";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import assert from 'assert';
import EventChatCard from './EventChatCard';
import EventFriendCard from './EventFriendCard';
import EventMessage from '../model/EventMessage';
import EventMessageCard from './EventMessageCard';
import model from '../model/model';
import EventChat from '../model/EventChat';
import EventFriend from '../model/EventFriend';


@observer
export default class EventList extends Component {
  constructor(props){
    super(props);
    this.contentOffsetY = 0;
    this.state = {displayArea: {}, buttonRect: {}, isVisible:false};
    
  }
  onScroll(event) {
    // switch nav bar is scroll position is below threshold
    this.contentOffsetY = event.nativeEvent.contentOffset.y;
    if (this.props.onScroll){
      this.props.onScroll(event);
    }
  }
  
  showPopover(row, {nativeEvent}, button) {
    let delta = 0;
    // scroll up if element is too low
    if (nativeEvent.pageY>this.height-200){
      this.refs.list.scrollTo({x:0, y:this.contentOffsetY+nativeEvent.pageY-(this.height-200), animated:false});
    }
    InteractionManager.runAfterInteractions(() =>
      button.measure((ox, oy, width, height, px, py) => {
        this.setState({
          isVisible: true,
          item:row,
          displayArea: {x: 13*k, y: 0, width: this.width-29*k, height: this.height},
          buttonRect: {x: px+width/2-16*k, y: py-10, width: width, height: height}
        });
      }));
  }

  closePopover() {
    this.setState({isVisible: false});
  }

  onLayout({nativeEvent}){
    this.width = nativeEvent.layout.width;
    this.height = nativeEvent.layout.height;
  }
  
  render(){
    const list = model.events.list.map(x=>x);
    console.log("EVENT LIST:", JSON.stringify(list));
    this.dataSource = (this.dataSource || ds).cloneWithRows(list);
    
    return   <View style={{flex:1}}>
      <ListView onLayout={this.onLayout.bind(this)} ref="list" enableEmptySections={true}
                style={styles.container}
                scrollEventThrottle={1} {...this.props}
                onScroll={this.onScroll.bind(this)}
                dataSource={this.dataSource}
                renderRow={row => {
                            let CardClass = EventMessageCard;
                            console.log("ROW EVENT", row.event);
                            if (row.event instanceof EventFriend){
                              CardClass = EventFriendCard;
                            }
                            if (row.event instanceof EventMessage) {
                              CardClass = EventMessageCard;
                            }
                            return <CardClass key={row.event.id} item={row.event} onPostOptions={this.showPopover.bind(this, row)}/>;
                          }
                       }/>
      <PostOptionsMenu
        width={this.state.displayArea.width - 15*k}
        isVisible={this.state.isVisible}
        fromRect={this.state.buttonRect}
        item={this.state.item}
        placement='bottom'
        displayArea={this.state.displayArea}
        onClose={this.closePopover.bind(this)}/>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});
