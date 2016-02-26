import React from 'react-native';
import Tabs from 'react-native-tabs';
import {WIDTH, k} from '../globals';
const {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} = React;
import {filterActivities, ALL, NEARBY, FRIENDS, TITLES} from '../actions/activity';
import { connect, Provider } from 'react-redux';
import {Actions} from 'react-native-router-flux';

class FilterTitle extends React.Component {
    render(){
        const modes = [ALL, FRIENDS, NEARBY];
        return <TouchableOpacity onPress={()=>Actions.refresh({showActivityNavBar: false})}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.selectedText}>{this.props.activity.title} </Text>
                <Image source={require("../../images/iconPostOptions.png")}/>
            </View>
        </TouchableOpacity>;
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

export default connect(state=>({activity:state.activity}))(FilterTitle)

const styles = StyleSheet.create({
    selectedText: {
        color: 'rgba(63,50,77,1)',
        fontFamily: 'Roboto-Medium',
        fontSize:16*k,
        letterSpacing:0.5
    },
});
