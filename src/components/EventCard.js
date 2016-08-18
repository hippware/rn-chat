import React from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
import {k} from './Global';
import ResizedImage from './ResizedImage';
import { Actions } from 'react-native-router-native';
import Profile from '../model/Profile';
import Chats from '../model/Chats';
import EventChat from '../model/EventChat';
import Chat from '../model/Chat';
import {observer} from "mobx-react/native";
import location from '../store/location';
import statem from '../../gen/state';

@observer
export default class EventCard extends React.Component {
  render(){
    const isDay = location.isDay;
    const event = this.props.item;
    return <View/>
    return (
      <Card style={[{marginTop:10}, this.props.style]}
            isDay={isDay}
            onPress={this.props.onPress}
            innerStyle={{paddingTop:20*k,paddingLeft:1,paddingRight:1,paddingBottom:10*k}}
            footer={
                        <View style={{position:'absolute',top:0,left:30*k,right:0,height:40*k}}>
                          <View style={{flex:1, flexDirection:'row'}}>
                          </View>

                            {this.props.onPostOptions && <TouchableOpacity ref='button' onPress={e=>this.props.onPostOptions(e, this.refs.button)}
                                style={{position:'absolute', flexDirection:'row',  backgroundColor:'transparent', alignItems:'center', top:20*k, right:20*k}}>
                                <Text style={{fontFamily:'Roboto-Light',fontSize:12, color:'rgb(155,155,155)'}}>{event.date} </Text>
                                <Image source={require("../../images/iconPostOptions.png")}/>
                            </TouchableOpacity>}
                            {!this.props.onPostOptions && <View style={{position:'absolute', backgroundColor:'transparent', flexDirection:'row', alignItems:'center', top:20*k, right:5*k}}>
                                    <Text style={{fontFamily:'Roboto-Light',fontSize:12*k, color:'rgb(155,155,155)'}}>{event.date}</Text>
                                </View>
                                }
                        </View>
                        }>
        {this.props.children}
      </Card>
    );
  }
}
