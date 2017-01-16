import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, ListView, View, Text} from "react-native";
import Screen from './Screen';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import AddFriendByUsername from './AddFriendByUsername';
import {Actions} from 'react-native-router-native';
import location from '../store/location';

export default class AddFriends extends Component {
    render(){
        const isDay = location.isDay;
        return <Screen isDay={isDay}>
            <Card isDay={isDay} style={{opacity:0.95}}>
            <Cell
                image={require('../../images/iconAddressBook.png')}>Add Address Book Contacts</Cell>
            <Separator width={1}/>
            <Cell image={require('../../images/iconUsernameSmall.png')} onPress={()=>Actions.addFriendByUsername()}>Add by Username</Cell>
        </Card>
        </Screen>;
    }
}

