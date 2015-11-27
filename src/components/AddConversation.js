import {Router, Actions, Route, Animations, Schema} from 'react-native-redux-router';
import React from 'react-native';
import TextDialog from './TextDialog';
import {addConversation} from '../actions/conversations';

export default class AddConversation {
    onAdd(username){
        if (!username){
            alert("Username cannnot be empty");
        } else {
            this.props.dispatch(addConversation(username, Math.floor(Date.now() / 1000)))
            Actions.dismiss();
        }
    }
    render(){
        return <TextDialog  onAdd={this.onAdd.bind(this)}/>
    }
}