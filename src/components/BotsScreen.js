import React, {Component} from "react";
import {TouchableOpacity, ListView, View, Text, StyleSheet} from "react-native";
import {Actions} from 'react-native-router-native';
import {k} from './Global';
import Screen from './Screen';
import ActionButton from './ActionButton';
import Bots from './Bots';
import location from '../store/location';
import model from '../model/model';
import {observer} from "mobx-react/native";
import NotificationComponent from './Notification';
import notification from '../store/notification';
import Notification from '../model/Notification';
import FilterBar from './FilterBar';

@observer
export default class BotsScreen extends Component {
  render(){
    const bots = this.props.filter === "all" ? model.bots.list : model.bots.own;
    const botList = bots.map(x=>x);
    console.log("BotsScreen render", this.props.filter, this.props.filter === "all", bots);
    
    const isDay = location.isDay;
    return <Screen isDay={isDay} style={{paddingTop:70*k}}>
      <FilterBar style={{paddingLeft:15*k, paddingRight:15*k}}
                 isDay={location.isDay}
                 onSelect={data=>Actions.refresh({filter:data.key})}
                 selected={this.props.filter}>
        <Text key="all">All</Text>
        <Text key="own">My Bots</Text>
  
      </FilterBar>
      <Bots ref="list" bots={botList} />
      <NotificationComponent style={{position:'absolute', top: 0}}/>
      <ActionButton/>
    </Screen>;
  }
}


BotsScreen.defaultProps = {
  filter: "all"
};
