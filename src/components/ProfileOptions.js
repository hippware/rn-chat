import React, {Component} from "react";
import {TouchableOpacity, Alert, StyleSheet, ListView, View, Text} from "react-native";
import Screen from './Screen';
import Avatar from './Avatar';
import Card from './Card';
import Cell from './Cell';
import * as actions from '../actions';
import Header from './Header';
import Separator from './Separator';
import ProfileAvatar from './ProfileAvatar';

export default class ProfileOptions extends Component {
    render(){
        const data = this.props.profile;
        const user = data.username;
        const {isFavorite, isFriend} = data;
        return <Screen>
            <ProfileAvatar profile={this.props.profile}/>
            <Card style={{opacity:0.95}}>
                <Header>Options</Header>
                <Separator width={1}/>
                <TouchableOpacity onPress={()=>this.props.dispatch({user:this.props.profile.username, type: isFavorite ? actions.REMOVE_ROSTER_FROM_FAVORITES : actions.ADD_ROSTER_TO_FAVORITES})}>
                    <Cell image={require('../../images/iconFavOptions.png')}>{isFavorite ? "Remove from faves" : "Add to faves"}</Cell>
                </TouchableOpacity>
                <Separator width={1}/>
                {isFriend && <TouchableOpacity onPress={()=>Alert.alert("Are you sure?", null, [
                        {text:'Yes', onPress:()=>this.props.dispatch({type:actions.REMOVE_ROSTER_ITEM, user})},
                        {text:'No'}
                        ])}>
                    <Cell textStyle={{color:'red'}}>Remove from friends</Cell>
                </TouchableOpacity>}
                {!isFriend && <TouchableOpacity onPress={()=>this.props.dispatch({type:actions.ADD_ROSTER_ITEM, user, data})}>
                    <Cell>Add to friends</Cell>
                </TouchableOpacity>}
                <Separator width={1}/>
                <Cell textStyle={{color:'red'}}>Block User</Cell>
            </Card>
        </Screen>;
    }
}
