import React, {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {k} from '../globals';
import Card from './Card';
import SignUpAvatar from './SignUpAvatar';
import Separator from './Separator';
import { DigitsLoginButton, DigitsLogoutButton } from 'react-native-fabric-digits';
import {logoutRequest} from '../actions/profile';
import {Actions} from 'react-native-router-flux';
import phoneService from '../services/PhoneService';

class Header extends React.Component {
    render(){
        return <View style={{padding: 15*k}}><Text style={{fontFamily:'Roboto-Medium',fontSize:16,color:'rgb(63,50,77)'}}>{this.props.children}</Text></View>
    }
}
class Cell extends React.Component {
    render(){
        return <View style={{flexDirection:'row', alignItems:'center', padding: 15*k}}>
                {this.props.image && <View style={{width:15*k, alignItems:'center'}}><Image source={this.props.image}/></View>}
                <View style={{flex:1, paddingLeft: 11*k}}><Text style={{fontFamily:'Roboto-Regular',fontSize:15,color:'rgb(63,50,77)'}}>{this.props.children}</Text></View>
            </View>
    }
}
class MyAccount extends React.Component {
    render(){
        return (
            <View style={{flex:1}}>
                <LinearGradient colors={['rgba(255,255,255,0)','rgb(241,242,244)','rgb(243,244,246)']} locations={[0,0.2,1]} style={styles.container}/>
                <ScrollView style={{top:70*k}} contentContainerStyle={{ paddingBottom: 70*k}}>
                    <SignUpAvatar image={this.props.profile.image || require("../../images/addPhoto.png")} style={{top:0, backgroundColor:'rgb(243,244,246)',borderRadius:33*k, width:66*k, height:66*k}}/>
                    <Card style={{opacity:0.95}}>
                        <Header>Profile Info</Header>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconMembersXs.png')}>{this.props.profile.firstName} {this.props.profile.lastName}</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconUsernameSmall.png')}>{this.props.profile.handle}</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconPhoneSmall.png')}>{phoneService.formatInternational(this.props.profile.phoneNumber)}</Cell>
                        <Separator width={1}/>
                        <Cell image={require('../../images/iconEmail.png')}>{this.props.profile.email}</Cell>
                    </Card>
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
                        <DigitsLogoutButton
                            completion={()=>{this.props.dispatch(logoutRequest());Actions.launch()}}
                            text="Logout"
                            buttonStyle={{position:'absolute',bottom:40*k, left:15*k, right:15*k, height:50*k, borderWidth: 0,borderRadius:2*k,backgroundColor:'rgb(254,92,108)',alignItems:'center', justifyContent:'center'}}
                            textStyle={{fontSize:15*k, fontFamily:'Roboto-Regular',color:'white'}} />

                    </View>
                </ScrollView>
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