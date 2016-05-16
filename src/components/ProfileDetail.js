import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, ListView, View, Text} from "react-native";
import Screen from './Screen';
import Avatar from './Avatar';
import ProfileInfo from './ProfileInfo';
import ProfileAvatar from './ProfileAvatar';
import { connect } from 'react-redux';

class ProfileDetail extends Component {
    render(){
        return <Screen>
            <View style={{paddingTop:10}}>
                <ProfileAvatar profile={this.props.profile}/>
                <ProfileInfo profile={this.props.profile} />
            </View>
        </Screen>;
    }
}

export default connect(state=>({profile:state.profiles.data[state.profiles.selected]}))(ProfileDetail)