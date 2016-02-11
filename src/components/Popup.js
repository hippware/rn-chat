import React from 'react-native';
const {ScrollView, Image, View, Text, StyleSheet, Dimensions, TouchableOpacity} = React;
import {Actions} from 'react-native-router-flux';
const coef = Dimensions.get('window').height/667;

export default class extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <View style={{position:'absolute',right:15*coef, left:15*coef, top: 40*coef, bottom: 40*coef}}>
                    <View style={{position:'absolute',top:0,bottom:0,right:0,left:0, borderRadius:2*coef,opacity:0.95,backgroundColor:'rgba(255,255,255,1)'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:40*coef,height:50*coef}} onPress={Actions.dismiss}>
                                <Image style={{}} source={require("../../images/iconClose.png")}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 1*coef, backgroundColor:'rgba(155,155,155,0.15)'}}></View>
                        <ScrollView style={{paddingLeft:21*coef,paddingRight:21*coef}}>
                            {this.props.children}
                        </ScrollView>
                    </View>
                </View>
            </View>
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
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{flex:1,paddingTop:10, paddingLeft:21*coef,backgroundColor:'transparent',paddingTop:14*coef,paddingBottom:14*coef,color:'rgb(38,30,47)',fontFamily:'Roboto-Medium', fontSize:16},
});

