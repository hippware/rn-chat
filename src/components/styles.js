import React from "react";
import {StyleSheet, PixelRatio, Dimensions} from "react-native";
const coef = Dimensions.get('window').height/667;

export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    center: {
        flex:1,
        alignItems: 'center',
        backgroundColor:'transparent'
    },
    text: {fontSize:15*coef, fontFamily:'Roboto-Regular',color:'white'},
    policyText:{paddingTop:10, color:'rgb(38,30,47)',fontFamily:'Roboto-Light', fontSize:15},
    showHidePasswordText: {fontSize:15*coef, fontFamily:'Roboto-Regular',color:'rgb(254,92,108)'},
    showHidePassword: {borderWidth:0, borderRadius:0, position:'absolute',right:20*coef, bottom:3*coef, padding:0},
    signUpButton: {position:'absolute',bottom:80*coef, left:30*coef, right:30*coef, height:50*coef, borderWidth: 0,borderRadius:2*coef,backgroundColor:'rgb(254,92,108)',alignItems:'center', justifyContent:'center'},
    signUpButtonInactive: {position:'absolute',bottom:80*coef, left:30*coef, right:30*coef, height:50*coef, borderRadius:2*coef,backgroundColor:'rgba(254,92,108,0.5)',alignItems:'center', justifyContent:'center'},
    login: {position:'absolute',bottom:40*coef, left:20*coef, right:20*coef, alignItems:'center', justifyContent:'center'},
    launchIcon: {top:102*coef, width:69*coef, height:79*coef, resizeMode:'contain'},
    activeDot: {backgroundColor:'white', width: 12*coef, height: 12*coef, borderRadius: 6*coef, marginLeft: 5*coef, marginRight: 5*coef},
    dot: {backgroundColor:'rgba(255,255,255,.26)', width: 12*coef, height: 12*coef,borderRadius: 6*coef, marginLeft: 5*coef, marginRight: 5*coef},
    tabContent: {top:240*coef,fontSize:18*coef,color:'white',fontFamily:'Roboto-Light',textAlign:'center',paddingLeft:52*coef,paddingRight:52*coef},
    loginText: {top:240*coef,fontSize:18*coef,color:'white',fontFamily:'Roboto-Regular',textAlign:'center',paddingLeft:52*coef,paddingRight:52*coef},
    tabHeader: {top:211*coef,fontSize:30*coef,textAlign:'center',color:'white',fontFamily:'Roboto-Regular'},
    signUpForm: {position:'absolute',top:270.4*coef,right:30*coef,left:30*coef,height:106*coef, borderRadius:2*coef, backgroundColor:'rgba(255,255,255,0.12)'},
    agreeNote: {position:'absolute',top:397.4*coef,right:35*coef,left:35*coef},
    agreeNoteText: {fontSize:13*coef,color:'white',fontFamily:'Roboto-Regular'},
    usernameInput:{flex:1, height: 51*coef, left:(18+15.2)*coef, right:15.2*coef, color: 'rgba(255,255,255,0.75)',fontFamily:'Roboto-Regular',fontSize:18*coef },
    passwordInput:{flex:1, height: 51*coef, left:(18+15.2)*coef, right:15.2*coef, color: 'rgba(255,255,255,0.75)',fontFamily:'Roboto-Regular',fontSize:18*coef },
    phoneInput:{flex:1, height: 51*coef, left:(17+12.5)*coef, right:15.2*coef, color: 'rgba(255,255,255,0.75)',fontFamily:'Roboto-Regular' },
    linkText:{fontSize:13*coef,color:'white',fontFamily:'Roboto-Medium'},
    paginationStyle:{bottom:170*coef},

});


