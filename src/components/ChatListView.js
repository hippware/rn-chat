import React, {Component} from "react";
import {View, InteractionManager, Image, StyleSheet, Text, ListView} from "react-native";
import PostOptionsMenu from './PostOptionsMenu';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import ChatCard from './ChatCard';
import {observer} from "mobx-react/native";
import statem from '../../gen/state';
import autobind from 'autobind-decorator';

@observer
@autobind
export default class ChatsListView extends Component {
  constructor(props){
    super(props);
    this.state = {displayArea: {}, buttonRect: {}, isVisible:false};
    
  }
  
  onScrollEnd(){
    console.log("SCROLL END", this.state.pull)
    this.setState({pull: false});
  }
  
  onScrollStart(){
    console.log("SCROLL START", this.state.pull, this.downDirection)
    if (this.downDirection && !this.state.pull){
      this.setState({pull: true});
    }
  }
  onScroll(event) {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset != this.contentOffsetY) {
      this.downDirection = currentOffset < this.contentOffsetY;
      this.contentOffsetY = currentOffset;
    }
  }
  componentWillReceiveProps(props) {
    if (props.initialScroll) {
      this.refs.list.scrollTo({x: 0, y: 0, animated: true});
    }
  }
  
  render(){
    const dataSource = ds.cloneWithRows(this.props.chats);
    return   <ListView ref="list" enableEmptySections={true}
                       style={styles.container}
                       scrollEventThrottle={1} {...this.props}
                       dataSource={dataSource}
                       onScroll={this.onScroll}
                       onScrollBeginDrag={this.onScrollStart}
                       onScrollEndDrag={this.onScrollEnd}
                       renderFooter={()=>{return this.state.pull ? <View style={{paddingTop:10, alignItems:'center', paddingBottom:21}}><Image source={require('../../images/graphicEndMsgs.png')}/></View>: null}}
                       renderRow={row => <ChatCard
                        key={row.id} item={row}
                        onPress={item => statem.chats.chat({item: item.id})}/> }/>
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
    flex:1,
  }
});
