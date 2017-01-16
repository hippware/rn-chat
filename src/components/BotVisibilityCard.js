import React from "react";
import {View, Slider, Alert, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
  from "react-native"

import Map from './Map';
import {Annotation} from 'react-native-mapbox-gl';
import {width, k} from './Global';
import {backgroundColorDay, backgroundColorNight, navBarTextColorDay, navBarTextColorNight} from '../globals';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {when, computed, autorun, observable} from 'mobx';
import Card from './Card';
import Cell from './Cell';
import CellWithText from './CellWithText';
import Separator from './Separator';
import location from '../store/location';
import Header from './Header';
import Bot, {VISIBILITY_FRIENDS, VISIBILITY_FOLLOWERS, VISIBILITY_WHITELIST, VISIBILITY_PUBLIC, VISIBILITY_OWNER} from '../model/Bot';
import Location from '../model/Location';
import statem from '../../gen/state';
import botFactory from '../factory/bot';
import bot from '../store/bot';
import GradientHeader from './GradientHeader';
import SaveButton from './SaveButton';
import Screen from './Screen';
import CellOptional from './CellOptional';
import {Actions} from 'react-native-router-native';

@autobind
@observer
export default class BotVisibilityCard extends React.Component {
  values = {};
  constructor(props){
    super(props);
    this.values[VISIBILITY_FRIENDS] = 'Visible to you and all friends';
    this.values[VISIBILITY_OWNER] = 'Visible to you';
    this.values[VISIBILITY_WHITELIST] = 'Visible to you and select friends';
    this.values[VISIBILITY_PUBLIC] = 'Visible to everyone with link';
    this.values[VISIBILITY_FOLLOWERS] = 'Visible to all friends and followers';
  }
  render(){
    const bot = this.props.bot;
    return <Card isDay={location.isDay} style={{opacity:0.95}}>
      <Header>Settings</Header>
      <Separator width={1}/>
      <Cell onPress={statem.logged.botVisibilityContainer} image={require('../../images/iconVisibility.png')}>{this.values[bot.visibility]}</Cell>
      <Separator width={1}/>
      <Cell image={require('../../images/iconPermissions.png')}>Only you can add photos</Cell>
    </Card>
  }
}