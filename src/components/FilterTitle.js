import React from "react";
import Tabs from 'react-native-tabs';
import {navBarBackgroundColorNight, WIDTH, k} from '../globals';
const {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} = React;
import { connect, Provider } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {filterActivities, ALL, NEARBY, FRIENDS, TITLES} from '../actions';

class FilterTitle extends React.Component {
    render(){
        const modes = [ALL, FRIENDS, NEARBY];
        return <View style={{flex:1, paddingTop:20, alignItems:'center',justifyContent:'center', backgroundColor: this.props.isDay ? 'white' : navBarBackgroundColorNight}}>
            <TouchableOpacity onPress={()=>Actions.restoreActivities()}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={[styles.selectedText,{color: this.props.isDay ? 'rgba(63,50,77,1)' :'white' }]}>{this.props.activity.title}</Text>
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

export default connect(state=>({isDay:state.location.isDay,activity:state.activity}))(FilterTitle)

const styles = StyleSheet.create({
    selectedText: {
        fontFamily: 'Roboto-Medium',
        fontSize:16*k,
        letterSpacing:0.5
    },
});
