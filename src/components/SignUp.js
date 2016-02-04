import React from 'react-native';
import styles from './styles';
import BackgroundVideo from './BackgroundVideo';
import Logo from './Logo';
const {View, Image, TextInput, TouchableOpacity, Text, Dimensions} = React;
import {DigitsLoginButton} from 'react-native-fabric-digits';
const coef = Dimensions.get('window').height/667;
import {Actions} from 'react-native-router-flux';

export default class extends React.Component {
    componentWillUnmount(){
        console.log("Unmount component");
    }
    render(){
        return (
            <View style={styles.center}>
                <BackgroundVideo/>
                <Logo/>
                <View style={styles.container}>
                    <Text style={styles.tabHeader}>Let's get started!</Text>
                    <View style={styles.signUpForm}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <Image style={{left:20.5*coef}} source={require("../../images/iconUsername.png")}/>
                            <TextInput autoCorrect={false} autoCapitalize="none" maxLength={30} placeholder="Username" placeholderTextColor="rgba(255,255,255,0.75)" style={styles.usernameInput} />
                        </View>
                        <View style={{height: 2*coef, backgroundColor:'rgba(155,155,155,0.15)'}}></View>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <Image style={{left:20.5*coef}} source={require("../../images/iconPhone.png")}/>
                            <TextInput maxLength={20} keyboardType="number-pad" placeholder="Phone Number" placeholderTextColor="rgba(255,255,255,0.75)" style={styles.phoneInput} />
                        </View>
                    </View>
                    <View style={styles.agreeNote}>
                        <Text style={styles.agreeNoteText}>By signing up, you agree to the Privacy Policy and the Terms of Service.</Text>
                    </View>
                <DigitsLoginButton
                    options={{
                              title: "Connect with your phone",
                              appearance: {
                                backgroundColor: {
                                  hex: "#000000",
                                  alpha: 1
                                },
                                logoImageName: "logoName",
                                accentColor: {
                                  hex: "#FE5C6C",
                                  alpha: 1.0
                                },
                                headerFont: {
                                  name: "Roboto-Regular",
                                  size: 16
                                },
                                labelFont: {
                                  name: "Roboto-Regular",
                                  size: 18
                                },
                                bodyFont: {
                                  name: "Roboto-Light",
                                  size: 16
                                }
                              }
                            }}
                    completion={()=>console.log("Completion")}
                    text="Use my phone number"
                    buttonStyle={styles.signUpButton}
                    textStyle={styles.text}
                />
                <TouchableOpacity style={styles.login} onPress={Actions.login}>
                    <Text style={styles.text}>Already have an account? Log In</Text>
                </TouchableOpacity>
                </View>


            </View>

        );
    }

}