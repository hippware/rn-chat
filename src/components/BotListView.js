import React, {Component} from "react";
import {View, InteractionManager, StyleSheet, Text, ListView} from "react-native";
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
export default class Bots extends Component {
  async onScroll(event) {
    if (!this.loading && event.nativeEvent.contentOffset.y+ height + 200 >= event.nativeEvent.contentSize.height){
      this.loading = true;
      if (this.props.filter == "all") {
        await botStore.following(model.followingBots.earliestId);
      } else {
        await botStore.list(model.ownBots.earliestId);
      }
      this.loading = false;
    }
  }
  
  
  render(){
    console.log("Bots render", this.props.filter);
    const bots = this.props.filter === "all" ? model.followingBots.list : model.ownBots.list;
    const dataSource = ds.cloneWithRows(bots.map(x=>x));
    return   <ListView ref="list" enableEmptySections={true}
                       style={styles.container}
                       scrollEventThrottle={1} {...this.props}
                       dataSource={dataSource}
                       onScroll={this.onScroll}
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
