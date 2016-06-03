import React, {Component} from "react";
import {View, TouchableOpacity} from "react-native";
import {format, getRegionCode} from '../store/PhoneStore';
import {k} from '../globals';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import MyAccountTextInput from './MyAccountTextInput';
import { Actions } from 'react-native-router-flux';
import MessageStore from '../store/MessageStore';

export default class ProfileInfo extends Component {
  render(){
    const isDay = this.props.isDay;
    const profile = this.props.profile;
    const message: MessageStore = this.props.message;
    
    if (this.props.editMode){
      return <Card  {...this.props} style={{opacity:0.95}}>
        <Header>Profile Info</Header>
        <Separator width={1}/>
        <MyAccountTextInput isDay={isDay} autoFocus={true} name='firstName' placeholder='First Name'/>
        <MyAccountTextInput isDay={isDay} name='lastName' placeholder='Last Name'/>
        <MyAccountTextInput isDay={isDay} name='handle' image={require('../../images/iconUsernameSmall.png')} placeholder='Handle'/>
        <Cell image={require('../../images/iconPhoneSmall.png')}>{format(this.props.profile.phoneNumber)}</Cell>
        <Separator width={1}/>
        <MyAccountTextInput isDay={isDay} name='email' image={require('../../images/iconEmail.png')} placeholder='Email'/>
      </Card>
    } else {
      return <Card isDay={isDay} style={{opacity:0.95}}>
        <Separator width={1}/>
        <Header>Profile Info</Header>
        <Separator width={1}/>
        <Cell
              image={require('../../images/iconMembersXs.png')}>{this.props.profile.displayName}</Cell>
        <Separator width={1}/>
        <Cell image={require('../../images/iconUsernameSmall.png')}>{this.props.profile.handle}</Cell>
        <Separator width={1}/>
        {!!this.props.profile.phoneNumber && <Cell image={require('../../images/iconPhoneSmall.png')}>{format(this.props.profile.phoneNumber)}</Cell>}
        {!!this.props.profile.phoneNumber && <Separator width={1}/>}
        {!!this.props.profile.email && <Cell image={require('../../images/iconEmail.png')}>{this.props.profile.email}</Cell>}
      </Card>;
    }
  }
}

ProfileInfo.propTypes = {
  profile: React.PropTypes.any.isRequired,
  message: React.PropTypes.any,
  isDay: React.PropTypes.bool.isRequired,
};