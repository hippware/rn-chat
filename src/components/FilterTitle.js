import React from "react";
import Tabs from 'react-native-tabs';
import {navBarBackgroundColorNight, WIDTH, k} from '../globals';
import {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} from "react-native";
import {Actions} from 'react-native-router-flux';

export default class FilterTitle extends React.Component {
    render(){
        return <View style={{flex:1, paddingTop:20, alignItems:'center',justifyContent:'center', backgroundColor: this.props.location.isDay ? 'white' : navBarBackgroundColorNight}}>
            <TouchableOpacity onPress={()=>Actions.restoreActivities()}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={[styles.selectedText,{color: this.props.location.isDay ? 'rgba(63,50,77,1)' :'white' }]}>All</Text>
                <Image source={require("../../images/iconPostOptions.png")}/>
            </View>
        </TouchableOpacity></View>;
        //return <TouchableOpacity onPress={()=>
        //        Actions.actionSheet({
        //            title:'Show',
        //            options:[TITLES[ALL], TITLES[FRIENDS], TITLES[NEARBY], "Cancel"],
        //            cancelButtonIndex:3,
        //            callback:(index)=>index<3 && this.props.dispatch(filterActivities(modes[index]))})}>
        //    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        //        <Text style={styles.selectedText}>{this.props.activity.title} </Text>
        //        <Image source={require("../../images/iconPostOptions.png")}/>
        //    </View>
        //</TouchableOpacity>;
    }
}

const styles = StyleSheet.create({
    selectedText: {
        fontFamily: 'Roboto-Medium',
        fontSize:16*k,
        letterSpacing:0.5
    },
});
