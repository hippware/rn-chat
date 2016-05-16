import React, {Component} from "react";
import {View} from "react-native";
import Avatar from './Avatar';
export default class extends Component {
    render(){
        return <View style={{alignItems:'center', height:80}}>
            <Avatar size={65} source={this.props.profile.avatar} displayName={this.props.profile.displayName}/>
        </View>
    }
}