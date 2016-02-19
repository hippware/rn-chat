import React from 'react-native';
import Map from './Map';
const {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} = React;
import {Actions} from 'react-native-router-flux';
import {WIDTH, k} from '../globals';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from 'react-native-blur';
import TopButtons from './TopButtons';

export default class Home extends React.Component {
    render(){
        console.log("DRAWER6:"+this.context.drawer);
        return <View style={[styles.container, {backgroundColor:'red'}]}>
            <Map/>
            <View style={{position:'absolute',top:0,left:0,right:0,height:80}} >
                <TopButtons/>
            </View>

            </View>

        //<View style={{position:'absolute',bottom:0, top:0, right:0,left:0}}><Map/></View>
        //<LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} style={{height:96*k, top:0, right:0,left:0}}/>
        //<Image style={{position:'absolute',left:20*k,top:36*k}} source={require('../../images/iconMenu.png')}/>
        //<Image style={{position:'absolute',right:20*k,top:36*k}} source={require('../../images/iconMessage.png')}/>
        //<BlurView style={{position:'absolute',top:244*k,left:0,right:0,bottom:0}} blurType="light">
        //</BlurView>
        //<View style={{position:'absolute', top:191*k,height:53*k,left:0,right:0,borderWidth:1.5*k,borderColor:'white',shadowRadius:5*k, shadowOffset:{height:1*k,width:0}, shadowColor:'black',shadowOpacity:0.12,backgroundColor:'rgba(255,255,255,0.94)'}}>
        //    <Image style={{position:'absolute',right:70*k,top:18*k}} source={require('../../images/iconSearchHome.png')}/>
        //</View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

Home.contextTypes = {drawer: React.PropTypes.object};
