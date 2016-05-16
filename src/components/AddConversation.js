import {Router, Actions, Route, Animations, Schema} from 'react-native-router-flux';
import React from "react";
import TextDialog from './TextDialog';
import {addConversation} from '../actions/conversations';
import { connect } from 'react-redux/native';

class AddConversation extends React.Component {
    onAdd(username){
        if (!username){
            alert("Username cannnot be empty");
        } else {
            this.props.dispatch(addConversation(username, Math.floor(Date.now() / 1000)))
            Actions.pop();
        }
    }
    render(){
        return <TextDialog  onAdd={this.onAdd.bind(this)}/>
    }
}

export default connect()(AddConversation)