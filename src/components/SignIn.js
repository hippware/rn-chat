import React from "react";
import BackgroundVideo from './BackgroundVideo';
import {View, Image, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions} from "react-native";
import {DigitsLoginButton} from 'react-native-fabric-digits';
const coef = Dimensions.get('window').height / 667;
import {Actions} from 'react-native-router-native';

export default class extends React.Component {
    render() {
        return (
            <View style={styles.center}>
                <BackgroundVideo/>
                <Logo/>
                <View style={styles.container}>
                    <Text style={styles.tabHeader}>Welcome back!</Text>
                    <View style={styles.signUpForm}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Image style={{left: 20.5 * coef}} source={require("../../images/iconUsername.png")}/>
                            <TextInput autoCorrect={false} autoCapitalize="none" maxLength={30} placeholder="Username"
                                       placeholderTextColor="rgba(255,255,255,0.75)" style={styles.usernameInput}/>
                        </View>
                        <View style={{height: 2 * coef, backgroundColor: 'rgba(155,155,155,0.15)'}}></View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Image style={{left: 20.5 * coef}} source={require("../../images/iconVisibility.png")}/>
                            <TextInput maxLength={20} secureTextEntry={true} placeholder="Password"
                                       placeholderTextColor="rgba(255,255,255,0.75)" style={styles.phoneInput}/>
                        </View>
                    </View>
                    <View style={styles.agreeNote}>
                        <Text style={styles.agreeNoteText}>Forgot Password? </Text>
                    </View>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.login} onPress={Actions.signUp}>
                        <Text style={styles.text}>New here? Sign Up</Text>
                    </TouchableOpacity>
                </View>


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
    center: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    text: {fontSize: 15 * coef, fontFamily: 'Roboto-Regular', color: 'white'},
    policyText: {paddingTop: 10, color: 'rgb(38,30,47)', fontFamily: 'Roboto-Light', fontSize: 15},
    showHidePasswordText: {fontSize: 15 * coef, fontFamily: 'Roboto-Regular', color: 'rgb(254,92,108)'},
    showHidePassword: {
        borderWidth: 0,
        borderRadius: 0,
        position: 'absolute',
        right: 20 * coef,
        bottom: 3 * coef,
        padding: 0
    },
    signUpButton: {
        position: 'absolute',
        bottom: 80 * coef,
        left: 30 * coef,
        right: 30 * coef,
        height: 50 * coef,
        borderWidth: 0,
        borderRadius: 2 * coef,
        backgroundColor: 'rgb(254,92,108)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpButtonInactive: {
        position: 'absolute',
        bottom: 80 * coef,
        left: 30 * coef,
        right: 30 * coef,
        height: 50 * coef,
        borderRadius: 2 * coef,
        backgroundColor: 'rgba(254,92,108,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    login: {
        position: 'absolute',
        bottom: 40 * coef,
        left: 20 * coef,
        right: 20 * coef,
        alignItems: 'center',
        justifyContent: 'center'
    },
    launchIcon: {top: 102 * coef, width: 69 * coef, height: 79 * coef, resizeMode: 'contain'},
    activeDot: {
        backgroundColor: 'white',
        width: 12 * coef,
        height: 12 * coef,
        borderRadius: 6 * coef,
        marginLeft: 5 * coef,
        marginRight: 5 * coef
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,.26)',
        width: 12 * coef,
        height: 12 * coef,
        borderRadius: 6 * coef,
        marginLeft: 5 * coef,
        marginRight: 5 * coef
    },
    tabContent: {
        top: 240 * coef,
        fontSize: 18 * coef,
        color: 'white',
        fontFamily: 'Roboto-Light',
        textAlign: 'center',
        paddingLeft: 52 * coef,
        paddingRight: 52 * coef
    },
    loginText: {
        top: 240 * coef,
        fontSize: 18 * coef,
        color: 'white',
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        paddingLeft: 52 * coef,
        paddingRight: 52 * coef
    },
    tabHeader: {
        top: 211 * coef,
        fontSize: 30 * coef,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Roboto-Regular'
    },
    signUpForm: {
        position: 'absolute',
        top: 250.4 * coef,
        right: 30 * coef,
        left: 30 * coef,
        height: 106 * coef,
        borderRadius: 2 * coef,
        backgroundColor: 'rgba(255,255,255,0.12)'
    },
    agreeNote: {position: 'absolute', top: 397.4 * coef, right: 35 * coef, left: 35 * coef},
    agreeNoteText: {fontSize: 13 * coef, color: 'white', fontFamily: 'Roboto-Regular'},
    usernameInput: {
        flex: 1,
        height: 51 * coef,
        left: (18 + 15.2) * coef,
        right: 15.2 * coef,
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'Roboto-Regular',
        fontSize: 18 * coef
    },
    passwordInput: {
        flex: 1,
        height: 51 * coef,
        left: (18 + 15.2) * coef,
        right: 15.2 * coef,
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'Roboto-Regular',
        fontSize: 18 * coef
    },
    phoneInput: {
        flex: 1,
        height: 51 * coef,
        left: (17 + 12.5) * coef,
        right: 15.2 * coef,
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'Roboto-Regular'
    },
    linkText: {fontSize: 13 * coef, color: 'white', fontFamily: 'Roboto-Medium'},
    paginationStyle: {bottom: 170 * coef}


});


