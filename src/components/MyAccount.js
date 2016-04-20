import React, {View, TouchableOpacity, Text, StyleSheet, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import BackgroundGradient from './BackgroundGradient';
import {k} from '../globals';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import NavBar from './NavBar';
import NavBarEditMode from './NavBarEditMode';
import SignUpAvatar from './SignUpAvatar';
import Separator from './Separator';
import {Actions} from 'react-native-router-flux';
import {PROFILE_UPDATE, PROFILE} from '../actions';
import phoneService from '../services/PhoneService';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import validators from './FormValidators';
import MyAccountTextInput from './MyAccountTextInput';
import LogoutButton from './LogoutButton';


class MyAccount extends React.Component {
    static renderNavigationBar(props){
        return props.editMode ? <NavBarEditMode {...props} title="Edit My Account"/>: <NavBar {...props} title="My Account"/>;
    }

    componentWillReceiveProps(props){
        if (props.save) {
            //alert("SAVE!" + JSON.stringify(GiftedFormManager.stores.form.values));
            this.props.dispatch({type:PROFILE_UPDATE, fields:GiftedFormManager.stores.form.values});
            Actions.refresh({save: false});
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
                    <SignUpAvatar image={this.props.profile.image || require("../../images/addPhoto.png")}
                                  style={{top:0, backgroundColor:'rgb(243,244,246)',borderRadius:33*k, width:66*k, height:66*k}}/>

                    {this.props.profile.error && <Text style={{color:'red', padding:10, textAlign:'center'}}>{this.props.profile.error}</Text>}

                    {this.props.editMode && <Card style={{opacity:0.95}}>
                        <Header>Profile Info</Header>
                        <Separator width={1}/>
                        <MyAccountTextInput autoFocus={true} name='firstName' placeholder='First Name'/>
                        <MyAccountTextInput name='lastName' placeholder='Last Name'/>
                        <MyAccountTextInput name='handle' image={require('../../images/iconUsernameSmall.png')} placeholder='Handle'/>
                        <Cell image={require('../../images/iconPhoneSmall.png')}>{phoneService.formatInternational(this.props.profile.phoneNumber)}</Cell>
                        <Separator width={1}/>
                        <MyAccountTextInput name='email' image={require('../../images/iconEmail.png')} placeholder='Email'/>
                    </Card>}

                    {!this.props.editMode && <TouchableOpacity onPress={()=>Actions.refresh({editMode: true, save:false})}><Card style={{opacity:0.95}}>
                        <Header>Profile Info</Header>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconMembersXs.png')}>{this.props.profile.firstName} {this.props.profile.lastName}</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconUsernameSmall.png')}>{this.props.profile.handle}</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconPhoneSmall.png')}>{phoneService.formatInternational(this.props.profile.phoneNumber)}</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconEmail.png')}>{this.props.profile.email}</Cell>
                    </Card></TouchableOpacity>}

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