import React, {Component} from "react";
import {View, InteractionManager, StyleSheet, Image, Text, ListView} from "react-native";
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import BotCard from './BotCard';
import {observer} from "mobx-react/native";
import {observable} from 'mobx';
import statem from '../../gen/state';
import model from '../model/model';
import autobind from 'autobind-decorator';
import {k, width, height} from './Global';
import botStore from '../store/botStore';

@autobind
@observer
export default class BotListView extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  async onScroll(event) {
    if (event.nativeEvent.contentOffset.y + height + 200 >= event.nativeEvent.contentSize.height) {
      if (!this.bots.finished && !this.loading) {
        this.loading = true;
        if (this.props.filter == "all") {
          await botStore.following(model.followingBots.earliestId);
        } else {
          await botStore.list(model.ownBots.earliestId);
        }
        this.loading = false;
      }
      
    }
  }
  
  onScrollEnd(){
    this.setState({pull: false});
  }
  
  onScrollStart(){
    if (this.bots.finished && !this.state.pull){
      this.setState({pull: true});
    }
  }
  
  
  render(){
    this.bots = this.props.filter === "all" ? model.followingBots : model.ownBots;
    const bots = this.bots;
    console.log("Bots render", this.props.filter, bots.finished);
    const dataSource = ds.cloneWithRows(bots.list.map(x=>x));
    return   <ListView ref="list" enableEmptySections={true}
                       style={styles.container}
                       scrollEventThrottle={1} {...this.props}
                       onScrollBeginDrag={this.onScrollStart}
                       onScrollEndDrag={this.onScrollEnd}
                       dataSource={dataSource}
                       onScroll={this.onScroll}
                       renderFooter={()=>{return this.state.pull ? <View style={{paddingTop:10, alignItems:'center', paddingBottom:21}}><Image source={require('../../images/graphicEndBots.png')}/></View>: null}}
                       renderRow={row => <BotCard
                        key={row.id} item={row}
                        onPress={item => statem.botsScene.botDetails({item: item.id})}/> }/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});
