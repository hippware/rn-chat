import React from 'react-native';
import Tabs from 'react-native-tabs';
import {WIDTH, k} from '../globals';
const {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} = React;
import {filterActivities, ALL, NEARBY, FRIENDS, TITLES} from '../actions';
import { connect, Provider } from 'react-redux';

class FilterBar extends React.Component {
    render(){
        const isDay = this.props.isDay;
        const textProps = {
            selectedStyle: [styles.selectedText, { color: isDay ? 'rgba(63,50,77,1)' : 'white'}],
            style:styles.text,
            selectedIconStyle:styles.selectedIcon
        };
        if (this.props.hidden){
            return null;
        }
        return <Tabs onSelect={el=>this.props.dispatch(filterActivities(el.props.name))} selected={this.props.activity.mode}
                     style={[styles.tabs,{backgroundColor: isDay ? 'white' : 'rgb(63,50,77)'}]} iconStyle={styles.iconStyle}>
                <Text {...textProps} name={ALL}>{TITLES[ALL]}</Text>
                <Text {...textProps} name={FRIENDS}>{TITLES[FRIENDS]}</Text>
                <Text {...textProps} name={NEARBY}>{TITLES[NEARBY]}</Text>
                <Image name="search" onSelect={()=>console.log("Search")} source={require('../../images/iconSearchHome.png')}/>
            </Tabs>
    }
}

export default connect(state=>({activity:state.activity}))(FilterBar)

const styles = StyleSheet.create({
    tabs: {height:54*k, shadowOffset: {height:1, width:0}, shadowRadius:5*k, shadowOpacity:0.12, position:'relative',top:0},
    text: {
        color: 'rgba(155,155,155,1)',
        fontFamily: 'Roboto-Regular',
        fontSize:16*k
    },
    selectedText: {
        fontFamily: 'Roboto-Medium',
        fontSize:16*k,
        letterSpacing:0.5
    },
    selectedIcon: {
        borderBottomWidth:3*k,
        borderBottomColor:'rgb(254,92,108)'
    },
    iconStyle: {
        height:54*k,
        left: 10*k,
        right: 10*k,
    }
});
