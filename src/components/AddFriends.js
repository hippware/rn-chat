import React, {TouchableOpacity, StyleSheet, ListView, View, Text, Component} from 'react-native';
import Screen from './Screen';
import { connect } from 'react-redux';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import AddFriendByUsername from './AddFriendByUsername';
import {Actions} from 'react-native-router-flux';

export default class extends Component {
    render(){
        return <Screen>
            <Card style={{opacity:0.95}}>
            <Cell
                image={require('../../images/iconAddressBook.png')}>Add Address Book Contacts</Cell>
            <Separator width={1}/>
            <Cell image={require('../../images/iconUsernameSmall.png')} onPress={Actions.addFriendByUsername}>Add by Username</Cell>
        </Card>
        </Screen>;
    }
}
