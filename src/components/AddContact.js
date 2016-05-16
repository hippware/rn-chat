import {Router, Actions, Route, Animations, Schema} from 'react-native-router-flux';
import React from "react";
import TextDialog from './TextDialog';
import {subscribe} from '../actions/xmpp/roster';
import { connect } from 'react-redux/native';

class AddContact extends React.Component {
    onAdd(username){
        if (!username){
            alert("Username cannnot be empty");
        } else {
            this.props.dispatch(subscribe(username))
            Actions.pop();
        }
    }
    render(){
        return <TextDialog  onAdd={this.onAdd.bind(this)}/>
    }
}

export default connect()(AddContact)