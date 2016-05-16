import React, {Component} from "react";
import {View} from "react-native";
import phoneService from '../services/PhoneService';
import {k} from '../globals';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import MyAccountTextInput from './MyAccountTextInput';
import { Actions } from 'react-native-router-flux';

export default class extends Component {
    render(){
        if (this.props.editMode){
            return <Card  {...this.props} style={{opacity:0.95}}>
                <Header>Profile Info</Header>
                <Separator width={1}/>
                <MyAccountTextInput autoFocus={true} name='firstName' placeholder='First Name'/>
                <MyAccountTextInput name='lastName' placeholder='Last Name'/>
                <MyAccountTextInput name='handle' image={require('../../images/iconUsernameSmall.png')} placeholder='Handle'/>
                <Cell image={require('../../images/iconPhoneSmall.png')}>{phoneService.formatInternational(this.props.profile.phoneNumber)}</Cell>
                <Separator width={1}/>
                <MyAccountTextInput name='email' image={require('../../images/iconEmail.png')} placeholder='Email'/>
            </Card>
        } else {
            return <Card style={{opacity:0.95}}>
                <Header>Profile Info</Header>
                <Separator width={1}/>
                <Cell
                    image={require('../../images/iconMembersXs.png')}>{this.props.profile.displayName}</Cell>
                <Separator width={1}/>
                <Cell image={require('../../images/iconUsernameSmall.png')}>{this.props.profile.handle}</Cell>
                <Separator width={1}/>
                {this.props.profile.phoneNumber && <Cell image={require('../../images/iconPhoneSmall.png')}>{phoneService.formatInternational(this.props.profile.phoneNumber)}</Cell>}
                    {this.props.profile.phoneNumber && <Separator width={1}/>}
                {this.props.profile.email && <Cell image={require('../../images/iconEmail.png')}>{this.props.profile.email}</Cell>}
            </Card>;
        }
    }
}
