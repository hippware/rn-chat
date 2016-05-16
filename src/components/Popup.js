import React from "react";
const {ScrollView, Image, View, Text, StyleSheet, Dimensions, TouchableOpacity} = React;
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import {BlurView} from 'react-native-blur';

export default class extends React.Component {
    render(){
        return (
            <BlurView style={styles.container} blurType="dark">
                <View style={{position:'absolute',right:15*k, left:15*k, top: 40*k, bottom: 40*k}}>
                    <View style={{position:'absolute',top:0,bottom:0,right:0,left:0, borderRadius:2*k,opacity:0.90,backgroundColor:'white'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:40*k,height:50*k}} onPress={Actions.pop}>
                                <Image style={{}} source={require("../../images/iconClose.png")}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 1*k, backgroundColor:'rgba(155,155,155,0.15)'}}></View>
                        <ScrollView style={{paddingLeft:21*k,paddingRight:21*k}}>
                            {this.props.children}
                        </ScrollView>
                    </View>
                </View>
            </BlurView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{flex:1,paddingTop:10, paddingLeft:21*k,backgroundColor:'transparent',paddingTop:14*k,paddingBottom:14*k,color:'rgb(38,30,47)',fontFamily:'Roboto-Medium', fontSize:16},
});

