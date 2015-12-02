import {Router, Actions, Route, Animations, Schema} from 'react-native-redux-router';
import React from 'react-native';
import TextDialog from './TextDialog';
import {subscribe} from '../actions/xmpp/roster';

export default class AddContact {
    onAdd(username){
        if (!username){
            alert("Username cannnot be empty");
        } else {
            this.props.dispatch(subscribe(username))
            Actions.dismiss();
        }
    }
    render(){
        return <TextDialog  onAdd={this.onAdd.bind(this)}/>
    }
}