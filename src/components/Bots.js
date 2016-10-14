import React, {Component} from "react";
import {View, InteractionManager, StyleSheet, Text, ListView} from "react-native";
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import BotCard from './BotCard';
import {observer} from "mobx-react/native";
import statem from '../../gen/state';

@observer
export default class Bots extends Component {
  
  render(){
    const dataSource = ds.cloneWithRows(this.props.bots.map(x=>x));
    return   <ListView ref="list" enableEmptySections={true}
                       style={styles.container}
                       scrollEventThrottle={1} {...this.props}
                       dataSource={dataSource}
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
