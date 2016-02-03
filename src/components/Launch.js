import React from 'react-native';
const {View, Image, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} = React;
import {Actions} from 'react-native-router-flux';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
import LinearGradient from 'react-native-linear-gradient';

const coef = Dimensions.get('window').height/667;
export default class Launch extends React.Component {
    componentDidMount(){
        //setTimeout(()=>Actions.processLogin(),50);
    }

    render(){
        //<Image source={require("../../images/logoMark@1.png")} />
        return (
            <View style={styles.center}>
                <Video source={{uri: "Launch"}} // Can be a URL or a local file.
                           rate={1.0}                   // 0 is paused, 1 is normal.
                           volume={0}                 // 0 is muted, 1 is normal.
                           muted={true}                // Mutes the audio entirely.
                           paused={false}               // Pauses playback entirely.
                           resizeMode="cover"           // Fill the whole screen at aspect ratio.
                           repeat={true}                // Repeat forever.
                           style={styles.container} />
                <LinearGradient colors={['rgba(0,0,0,0)','rgba(0,0,0,1)']} style={[styles.container,{opacity:0.67}]}/>
                <View style={styles.center}><Image style={styles.launchIcon} source={require("../../images/logoMark.png")} /></View>
                <Swiper style={{flex:1}} index={0} showsPagination={false} ref="swiper" loop={false}>
                    <View style={{flex:1}}>
                        <Swiper style={{flex:1}}
                                autoplay={false}
                                loop={true}
                                showsButtons={false}
                                paginationStyle={{bottom:170*coef}}
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
                        <TouchableOpacity style={styles.signUpButton} onPress={()=>this.refs.swiper.scrollTo(1)}>
                            <Text style={styles.text}>Join Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login}>
                            <Text style={styles.text}>Already have an account? Log In</Text>
                        </TouchableOpacity>
                    </View>


                    <View key="third" style={styles.center}>
                        <Text style={styles.tabHeader}>Let's get started</Text>
                        <View style={styles.signUpForm}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Image style={{left:20.5*coef}} source={require("../../images/iconUsername.png")}/>
                                <TextInput maxLength={30} placeholder="Username" placeholderTextColor="rgba(255,255,255,0.75)" style={styles.usernameInput} />
                            </View>
                            <View style={{height: 2*coef, backgroundColor:'rgba(155,155,155,0.15)'}}></View>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Image style={{left:20.5*coef}} source={require("../../images/iconPhone.png")}/>
                                <TextInput maxLength={20} keyboardType="number-pad" placeholder="Phone Number" placeholderTextColor="rgba(255,255,255,0.75)" style={styles.phoneInput} />
                            </View>
                        </View>
                        <View style={styles.agreeNote}>
                            <Text style={styles.agreeNoteText}>
                                By signing up, you agree to the Privacy Policy and the Terms of Service.
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.signUpButton} >
                            <Text style={styles.text}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login}>
                            <Text style={styles.text}>Already have an account? Log In</Text>
                        </TouchableOpacity>


                    </View>
                </Swiper>
            </View>
        );

    }
}


var styles = StyleSheet.create({
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
    signUpButton: {position:'absolute',bottom:80*coef, left:30*coef, right:30*coef, height:50*coef, borderRadius:2*coef,backgroundColor:'rgb(254,92,108)',alignItems:'center', justifyContent:'center'},
    login: {position:'absolute',bottom:40*coef, left:20*coef, right:20*coef, alignItems:'center', justifyContent:'center'},
    launchIcon: {top:102*coef, width:69*coef, height:79*coef, resizeMode:'contain'},
    activeDot: {backgroundColor:'white', width: 12*coef, height: 12*coef, borderRadius: 6*coef, marginLeft: 5*coef, marginRight: 5*coef},
    dot: {backgroundColor:'rgba(255,255,255,.26)', width: 12*coef, height: 12*coef,borderRadius: 6*coef, marginLeft: 5*coef, marginRight: 5*coef},
    tabContent: {top:240*coef,fontSize:18*coef,color:'white',fontFamily:'Roboto-Regular',textAlign:'center',paddingLeft:52*coef,paddingRight:52*coef},
    loginText: {top:240*coef,fontSize:18*coef,color:'white',fontFamily:'Roboto-Regular',textAlign:'center',paddingLeft:52*coef,paddingRight:52*coef},
    tabHeader: {top:211*coef,fontSize:30*coef,color:'white',fontFamily:'Roboto-Regular'},
    signUpForm: {position:'absolute',top:270.4*coef,right:30*coef,left:30*coef,height:106*coef, borderRadius:2*coef, backgroundColor:'rgba(255,255,255,0.12)'},
    agreeNote: {position:'absolute',top:397.4*coef,right:35*coef,left:35*coef},
    agreeNoteText: {fontSize:13*coef,color:'white',fontFamily:'Roboto-Regular',textAlign:'center'},
    usernameInput:{flex:1, height: 51*coef, left:(18+15.2)*coef, right:15.2*coef, color: 'rgba(255,255,255,0.75)',fontFamily:'Roboto-Regular' },
    phoneInput:{flex:1, height: 51*coef, left:(17+12.5)*coef, right:15.2*coef, color: 'rgba(255,255,255,0.75)',fontFamily:'Roboto-Regular' },
});