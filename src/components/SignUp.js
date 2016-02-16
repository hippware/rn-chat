import React from 'react-native';
import BackgroundVideo from './BackgroundVideo';
const {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} = React;
import {DigitsLoginButton} from 'react-native-fabric-digits';
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button';
import {WIDTH, k} from '../globals';
import Separator from './Separator';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import SignUpTextInput from './SignUpTextInput';
import validatorjs from 'validator';
import PhotoAvatar from './PhotoAvatar';

//const SignUpTextInput = GiftedForm.TextInputWidget;
const Group = GiftedForm.GroupWidget;

class Group2 extends React.Component {
    render(){
        const children = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
                formStyles: this.props.formStyles,
                openModal: this.props.openModal,
                formName: this.props.formName,
                navigator: this.props.navigator,
                onFocus: this.props.onFocus,
                onValidation: this.props.onValidation,
                onBlur: this.props.onBlur,
            }));
            return <View {...this.props}>{children}</View>
    }
}

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {isValid: false};
    }

    handleValidation(validation) {
        console.log("VALIDATION:"+validation.isValid);
        if (this.state.isValid !== validation.isValid)
            this.setState({ isValid: validation.isValid })
    }
    render(){
        return (
            <View style={styles.center}>
                <BackgroundVideo/>
                <GiftedForm name="signIn" formStyles={{containerView:styles.container}} onValidation={this.handleValidation.bind(this)}
                            validators={validators}>
                    <Text style={styles.welcomeText}>
                        We’re so glad you’ve joined us
                    </Text>
                    <PhotoAvatar/>
                    <Group style={styles.signUpForm}>
                        <Group  style={styles.signUpFormInner}>
                            <SignUpTextInput name='username' image={require("../../images/iconUsername.png")} placeholder='Username'/>
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
                                widgetStyles={styles}/>
                    </Group>
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
    signUpButtonView: {top:170*k, paddingLeft:30*k, paddingRight:30*k, height:50*k},
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

const validators = {
    username: {
        title: 'Username',
        validate: [{
            validator: 'isLength',
            arguments: [3, 16],
            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
        },{
            validator: 'matches',
            arguments: /^[a-zA-Z0-9_]*$/,
            message: '{TITLE} can contains only alphanumeric characters'
        }]
    },
    firstName: {
        title: 'First Name',
        validate: [{
            validator: 'matches',
            arguments: /^[\u00BF-\u1FFF\u2C00-\uD7FF\w ]*$/i,
            message: '{TITLE} is invalid'
        }]
    },
    lastName: {
        title: 'Last Name',
        validate: [{
            validator: 'matches',
            arguments: /^[\u00BF-\u1FFF\u2C00-\uD7FF\w ]*$/i,
            message: '{TITLE} is invalid'
        }]
    },
    email: {
        title: 'Email',
        validate: [{
            validator: (...args) => {
                if (!args[0] || validatorjs.isEmail(args[0]) === true) {
                    return true;
                }
                return false;
            },
            message: '{TITLE} is not valid',
        }]
    }
};



