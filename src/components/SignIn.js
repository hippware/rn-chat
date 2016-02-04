import React from 'react-native';
import styles from './styles';
import BackgroundVideo from './BackgroundVideo';
import Logo from './Logo';
const {View, Image, TextInput, TouchableOpacity, Text, Dimensions} = React;
import {DigitsLoginButton} from 'react-native-fabric-digits';
const coef = Dimensions.get('window').height/667;
import {Actions} from 'react-native-router-flux';

export default class extends React.Component {
    render(){
        return (
            <View style={styles.center}>
                <BackgroundVideo/>
                <Logo/>
                <View style={styles.container}>
                    <Text style={styles.tabHeader}>Welcome back!</Text>
                        <View style={styles.signUpForm}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Image style={{left:20.5*coef}} source={require("../../images/iconUsername.png")}/>
                                <TextInput autoCorrect={false} autoCapitalize="none" maxLength={30} placeholder="Username" placeholderTextColor="rgba(255,255,255,0.75)" style={styles.usernameInput} />
                            </View>
                            <View style={{height: 2*coef, backgroundColor:'rgba(155,155,155,0.15)'}}></View>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Image style={{left:20.5*coef}} source={require("../../images/iconVisibility.png")}/>
                                <TextInput maxLength={20} secureTextEntry={true} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.75)" style={styles.phoneInput} />
                            </View>
                        </View>
                        <View style={styles.agreeNote}>
                            <Text style={styles.agreeNoteText}>Forgot Password? </Text>
                        </View>
                        <TouchableOpacity style={styles.signUpButton} >
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.login} onPress={Actions.signUp}>
                            <Text style={styles.text}>New here? Sign Up</Text>
                        </TouchableOpacity>
                </View>


            </View>

        );
    }

}