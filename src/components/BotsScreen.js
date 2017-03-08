import React, {Component} from "react";
import {TouchableOpacity, ListView, View, Text, StyleSheet} from "react-native";
import {Actions} from 'react-native-router-native';
import {k} from './Global';
import Screen from './Screen';
import BotButton from './BotButton';
import Bots from './BotListView';
import location from '../store/locationStore';
import model from '../model/model';
import {observer} from "mobx-react/native";
import NotificationComponent from './Notification';
import notification from '../store/notificationStore';
import Notification from '../model/Notification';
import FilterBar from './FilterBar';

@observer
export default class BotsScreen extends Component {
  render(){
    //console.log("BosScreen render", this.props.filter, this.props.filter === "all", bots);
    
    const isDay = location.isDay;
    return <Screen isDay={isDay} style={{paddingTop:70*k}}>
      <FilterBar style={{paddingLeft:15*k, paddingRight:15*k}}
                 isDay={location.isDay}
                 onSelect={data=>Actions.refresh({filter:data.key})}
                 selected={this.props.filter}>
        <Text key="all">All</Text>
        <Text key="own">My Bots</Text>
  
      </FilterBar>
      <Bots ref="list" filter={this.props.filter} />
      <NotificationComponent style={{position:'absolute', top: 0}}/>
      <BotButton/>
    </Screen>;
  }
}


BotsScreen.defaultProps = {
  filter: "all"
};
