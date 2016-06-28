import React from "react";
import {View, Image, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import PhoneVerify from './PhoneVerify';
import {k} from '../globals';
import Logo from './Logo';
import Launch from './Launch';

export default function Promo({state, statem, phone, model}){
    return (
      <Launch>
          <View style={styles.container}>
              <Logo/>
              <Swiper style={{flex:1}}
                      autoplay={false}
                      loop={true}
                      showsButtons={false}
                      paginationStyle={styles.paginationStyle}
                      dot={<View style={styles.dot} />}
                      activeDot={<View style={styles.activeDot} />}
                      showsPagination={true}>
                  <View key="first" style={styles.center}>
                      <Text style={styles.tabHeader}>Welcome!</Text>
                      <Text style={styles.tabContent}>
                          TinyRobot is location messaging app that brings friends together for pub crawls or alerts you if your fav food truck is close.</Text>
                  </View>
                  <View key="second" style={styles.center}>
                      <Text style={styles.tabHeader}>Cras  Quis Nulla</Text>
                      <Text style={styles.tabContent}>
                          Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.
                      </Text>
                  </View>
                  <View key="third" style={styles.center}>
                      <Text style={styles.tabHeader}>Rhoncus Nec Lacus</Text>
                      <Text style={styles.tabContent}>
                          Ut porta viverra est, ut dignissim elit elementum ut. Nunc vel rhoncus nibh, ut tincidunt turpis. Integer ac enim pellentesque,
                      </Text>
                  </View>
              </Swiper>
              {!!state.props.error && <Text style={styles.error}>{state.props.error}</Text>}
              <PhoneVerify {...{statem}}/>
          </View>
      </Launch>
    );
}

const styles = StyleSheet.create({
    error: {position:'absolute',bottom:70*k, left:30*k, right:30*k, height:50*k, color:'red'},
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
    activeDot: {backgroundColor:'white', width: 12*k, height: 12*k, borderRadius: 6*k, marginLeft: 5*k, marginRight: 5*k},
    dot: {backgroundColor:'rgba(255,255,255,.26)', width: 12*k, height: 12*k,borderRadius: 6*k, marginLeft: 5*k, marginRight: 5*k},
    tabContent: {top:260*k,fontSize:18*k,color:'white',fontFamily:'Roboto-Light',textAlign:'center',paddingLeft:52*k,paddingRight:52*k},
    tabHeader: {top:251*k,fontSize:30*k,textAlign:'center',color:'white',fontFamily:'Roboto-Regular'},
    paginationStyle:{bottom:140*k}
});
