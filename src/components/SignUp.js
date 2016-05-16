import React from "react-native";
const {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} = React;
import {Actions} from 'react-native-router-flux';
import {WIDTH, k} from '../globals';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import SignUpTextInput from './SignUpTextInput';
import PhotoAvatar from './SignUpAvatar';
import { connect, Provider } from 'react-redux';
import {PROFILE_UPDATE} from '../actions';
import DeviceInfo from 'react-native-device-info';
import validators from './FormValidators';
import Launch from './Launch';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {isValid: false};
    }

    handleValidation(validation) {
        if (this.state.isValid !== validation.isValid)
            this.setState({ isValid: validation.isValid })
    }
    componentWillUpdate(props){
        if (props.profile && props.profile.error){
            if (this.postSubmit) {
                this.postSubmit([props.profile.error]);
            } else {
                alert(props.profile.error);
            }
        }
    }
    render(){
        const Group = GiftedForm.GroupWidget;
        const {handle, firstName, lastName, email} = this.props.profile;
        return (
            <Launch>
                <GiftedForm name="signIn" formStyles={{containerView:styles.container}} onValidation={this.handleValidation.bind(this)}
                            validators={validators} defaults={{handle, firstName, lastName, email}}>
                    <Text style={styles.welcomeText}>
                        We’re so glad you’ve joined us
                    </Text>
                    <PhotoAvatar ref="avatar"/>
                    <Group style={styles.signUpForm}>
                        <Group  style={styles.signUpFormInner}>
                            <SignUpTextInput name='handle' placeholder='Username'/>
                            <SignUpTextInput name='firstName' placeholder='First Name'/>
                            <SignUpTextInput name='lastName' placeholder='Last Name'/>
                            <SignUpTextInput name='email' placeholder='Email Address' keyboardType='email-address'/>
                        </Group>
                    </Group>
                    <View style={styles.agreeNote}>
                        <View style={{flex:1, flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                            <Text style={styles.agreeNoteText}>By signing up, you agree to the </Text>
                            <TouchableOpacity onPress={Actions.privacyPolicy}><Text style={styles.linkText}>Privacy Policy</Text></TouchableOpacity>
                            <Text style={styles.agreeNoteText}> and the </Text>
                            <TouchableOpacity onPress={Actions.termsOfService}><Text style={styles.linkText}>Terms of Service.</Text></TouchableOpacity>
                        </View>
                    </View>
                    <Group style={styles.signUpButtonView}>
                        <GiftedForm.SubmitWidget
                            title='Continue'
                            isDisabled={!this.state.isValid}
                            widgetStyles={styles}
                            onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                                if (isValid === true) {
                                  // prepare object
                                  this.postSubmit = postSubmit;
                                  this.props.dispatch({type:PROFILE_UPDATE, fields:values});

                                  //values.gender = values.gender[0];
                                  //values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                                  /* Implement the request to your server using values variable
                                  ** then you can do:
                                  ** postSubmit(); // disable the loader
                                  ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                                  ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                                  ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                                  */
                                }
                      }}/>
                    </Group>
                </GiftedForm>
            </Launch>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor:'transparent',
        right: 0,
    },
    center: {
        flex:1,
        alignItems: 'center',
        backgroundColor:'transparent'
    },
    welcomeText:{top:55*k,paddingRight:30*k,paddingLeft:30*k,fontSize:30*k,textAlign:'center',shadowOpacity:0.2, shadowColor:'rgb(0,0,0)',shadowRadius:2*k, shadowOffset:{width:0,height:0},color:'white',fontFamily:'Roboto-Regular'},
    text: {fontSize:15*k, fontFamily:'Roboto-Regular',color:'white'},
    signUpButtonView: {top:160*k, paddingLeft:30*k, paddingRight:30*k, height:50*k},
    submitButton: {
        borderRadius:2*k,
        height:50*k,
        margin:0,
        borderWidth: 0,backgroundColor:'rgb(254,92,108)'
    },
    signUpForm: {top:90.4*k,paddingLeft:30*k,paddingRight:30*k},
    signUpFormInner: {borderRadius:2*k, backgroundColor:'rgba(255,255,255,0.12)'},
    agreeNote: {top:100*k,paddingRight:36*k,paddingLeft:36*k},
    agreeNoteText: {fontSize:13*k,color:'white',fontFamily:'Roboto-Regular'},
    textInput:{flex:1, height: 51*k, left:20*k, right:15.2*k, color: 'rgba(255,255,255,0.75)',fontFamily:'Roboto-Regular',fontSize:18*k },
    phoneInput:{flex:1, height: 51*k, left:(17+12.5)*k, right:15.2*k, color: 'rgba(255,255,255,0.75)',fontFamily:'Roboto-Regular' },
    linkText:{fontSize:13*k,color:'white',fontFamily:'Roboto-Medium'},
    paginationStyle:{bottom:170*k}


});

export default connect(state=>({profile:state.profile}))(SignUp)
