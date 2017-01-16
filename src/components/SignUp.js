import React from "react";
import {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} from "react-native";
import {Actions} from 'react-native-router-native';
import {width, k} from './Global';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import SignUpTextInput from './SignUpTextInput';
import SignUpAvatar from './SignUpAvatar';
import DeviceInfo from 'react-native-device-info';
import validators from './FormValidators';
import Launch from './Launch';
import {SignUpSceneState} from '../../gen/state';
import assert from 'assert';
import model from '../model/model';
import statem from '../../gen/state';
import BackgroundImage from './BackgroundImage';
import {observer} from "mobx-react/native";

@observer
class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {isValid: false};
  }
  
  handleValidation(validation) {
    if (this.state.isValid !== validation.isValid)
      this.setState({ isValid: validation.isValid })
  }
  render(){
    console.log("SignUP ERROR:", statem.signUpScene.props.error);
    if (statem.signUpScene.props.error){
      if (this.postSubmit) {
        setTimeout(()=>this.postSubmit([statem.signUpScene.props.error]));
      } else {
        //alert(JSON.stringify(statem.signUpScene.props.error));
      }
    }
    const Group = GiftedForm.GroupWidget;
    if (!model.profile){
      console.log("NULL PROFILE!");
      return null;
    }
    const avatar = model.profile.avatar;
    const {loaded, handle, firstName, lastName, email, user} = model.profile;
    if (!loaded){
      console.log("PROFILE IS NOT LOADED", handle, user);
    }
    return (
      <BackgroundImage source={require("../../images/bg2.png")}>
        {loaded && <GiftedForm name="signIn" formStyles={{containerView:styles.container}} onValidation={this.handleValidation.bind(this)}
                               scrollEnabled={true} validators={validators} defaults={{handle, firstName, lastName, email}}>
          <SignUpAvatar avatar={avatar}/>
          <Group style={styles.signUpForm}>
            <Group  style={styles.signUpFormInner}>
              <SignUpTextInput name='handle' placeholder='Username' autofocus image={require('../../images/iconUsername.png')} />
              <SignUpTextInput name='firstName' placeholder='First Name'/>
              <SignUpTextInput name='lastName' placeholder='Last Name'/>
              <SignUpTextInput name='email' placeholder='Email Address' keyboardType='email-address' last/>
            </Group>
          </Group>
          <View style={styles.agreeNote}>
            <View style={{flex:1, flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
              <Text style={styles.agreeNoteText}>By signing up, you agree to the </Text>
              <TouchableOpacity onPress={Actions.privacyPolicy}><Text style={styles.linkText}>Privacy Policy</Text></TouchableOpacity>
              </View>
            <View style={{flex:1, flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
              <Text style={styles.agreeNoteText}> and the </Text>
              <TouchableOpacity onPress={Actions.termsOfService}><Text style={styles.linkText}>Terms of Service.</Text></TouchableOpacity>
            </View>
          </View>
          <Group style={styles.signUpButtonView}>
            <GiftedForm.SubmitWidget
              title='Done'
              isDisabled={!this.state.isValid}
              widgetStyles={styles}
              onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                                if (isValid === true) {
                                  // prepare object
                                  this.postSubmit = postSubmit;
                                  statem.signUpScene.register(values);

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
        </GiftedForm>}
      </BackgroundImage>
    
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 110*k,
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
  signUpButtonView: {top:95*k, paddingLeft:37.5*k, paddingRight:37.5*k, height:50*k},
  submitButton: {
    borderRadius:2*k,
    height:50*k,
    margin:0,
    borderWidth: 0,backgroundColor:'rgb(254,92,108)'
  },
  signUpForm: {top:110*k,paddingLeft:37*k,paddingRight:37*k},
  signUpFormInner: {borderRadius:2*k, backgroundColor:'rgba(228,228,228,0.3)'},
  agreeNote: {top:195*k,paddingRight:36*k,paddingLeft:36*k},
  agreeNoteText: {fontSize:13*k,color:'rgb(38,30,47)',lineHeight:21*k, fontFamily:'Roboto-Light'},
  textInput:{flex:1, height: 51*k, left:20*k, right:15.2*k, color: 'rgba(255,255,255,0.75)',fontFamily:'Roboto-Regular',fontSize:18*k },
  phoneInput:{flex:1, height: 51*k, left:(17+12.5)*k, right:15.2*k, color: 'rgba(255,255,255,0.75)',fontFamily:'Roboto-Regular' },
  linkText:{fontSize:13*k,color:'rgb(38,30,47)',lineHeight:21*k, fontFamily:'Roboto-Medium'},
  paginationStyle:{bottom:170*k}
  
  
});

export default SignUp
