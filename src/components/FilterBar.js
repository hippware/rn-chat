import React from 'react-native';
import Tabs from 'react-native-tabs';
import {WIDTH, k} from '../globals';
const {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} = React;
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
        return <Tabs {...this.props}
                     style={[styles.tabs,this.props.style,{backgroundColor: isDay ? 'white' : 'rgb(63,50,77)'}]} iconStyle={styles.iconStyle}>
            {this.props.children.map(el=>el.type.displayName === "Text" ? React.cloneElement(el, textProps) : el)}
            </Tabs>
    }
}

export default connect(state=>({isDay:state.location.isDay}))(FilterBar)

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
    }
});
