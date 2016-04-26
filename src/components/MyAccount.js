import React, {View, TouchableOpacity, Text, StyleSheet, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import BackgroundGradient from './BackgroundGradient';
import {k} from '../globals';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import SignUpAvatar from './SignUpAvatar';
import Separator from './Separator';
import {Actions} from 'react-native-router-flux';
import {PROFILE_UPDATE, PROFILE} from '../actions';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import validators from './FormValidators';
import LogoutButton from './LogoutButton';
import ProfileInfo from './ProfileInfo';

class MyAccount extends React.Component {
    //static renderNavigationBar(props){
    //    return props.editMode ? <NavBarEditMode {...props} title="Edit My Account"/>: <NavBar {...props} title="My Account"/>;
    //}
    //
    componentWillReceiveProps(props){
        if (props.save) {
            //alert("SAVE!" + JSON.stringify(GiftedFormManager.stores.form.values));
            this.props.dispatch({type:PROFILE_UPDATE, fields:GiftedFormManager.stores.form.values});
            Actions.viewAccount();
        } else {
            console.log("EDIT MIDE:", props.editMode);
            GiftedFormManager.resetValues("myAccount");
        }

    }

    render(){
        const Group = GiftedForm.GroupWidget;
        const {handle, firstName, lastName, email} = this.props.profile;
        return (
            <View style={{flex:1}} testID="myAccount">
                <BackgroundGradient />
                <GiftedForm name="myAccount" formStyles={{containerView: {top:80*k, backgroundColor:'transparent'}}} contentContainerStyle={{ paddingBottom: 80*k}}
                            validators={validators} defaults={{handle, firstName, lastName, email}}>
                    <SignUpAvatar avatar={this.props.profile.avatar } image={this.props.profile.avatarPath}
                                  style={{top:0, backgroundColor:'rgb(243,244,246)',borderRadius:33*k, width:66*k, height:66*k}}/>

                    {this.props.profile.error && <Text style={{color:'red', padding:10, textAlign:'center'}}>{this.props.profile.error}</Text>}

                    {this.props.editMode ?
                        <ProfileInfo profile={this.props.profile} editMode={true} /> :
                        <TouchableOpacity onPress={()=>Actions.editAccount()}><ProfileInfo profile={this.props.profile}/></TouchableOpacity>
                    }

                    <Card style={{opacity:0.95}}>
                        <Header>Settings</Header>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconVisibility.png')}>Visible to friends</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconLocation.png')}>Nearby filter is 2 miles</Cell>
                    </Card>
                    <Card style={{opacity:0.95}}>
                        <Header>Notifications</Header>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconMessageXs.png')}>Notify me instantly for message activity</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconChannelXs.png')}>Notify me instantly for channel activity</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconBotXs.png')}>Notify me for all bot activity</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconNotifications.png')}>Don’t notify me for 3 people</Cell>
                    </Card>
                    <View style={{height:100}}>
                        <LogoutButton />

                    </View>
                </GiftedForm>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    top: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 222,
        right: 0,
        opacity:0.79
    },
});

export default connect(state=>({profile:state.profile}))(MyAccount)