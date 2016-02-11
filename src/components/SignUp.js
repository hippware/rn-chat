import React from 'react-native';
import styles from './styles';
import BackgroundVideo from './BackgroundVideo';
import Logo from './Logo';
const {View, Image, TextInput, TouchableOpacity, Text, Dimensions} = React;
import {DigitsLoginButton} from 'react-native-fabric-digits';
const coef = Dimensions.get('window').height/667;
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {username:'', password:''};
    }
    render(){
        return (
            <View style={styles.center}>
                <BackgroundVideo/>
                <Logo/>
                <View style={styles.container}>
                    <Text style={styles.tabHeader}>Create Account</Text>
                    <View style={styles.signUpForm}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <Image style={{left:20.5*coef}} source={require("../../images/iconUsername.png")}/>
                            <TextInput autoCorrect={false} autoCapitalize="none" onChangeText={username=>this.setState({username})} value={this.state.username}maxLength={30} placeholder="Username" placeholderTextColor="rgba(255,255,255,0.75)" style={styles.usernameInput} />
                        </View>
                        <View style={{height: 2*coef, backgroundColor:'rgba(155,155,155,0.15)'}}></View>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <Image style={{left:20.5*coef}} source={require("../../images/iconVisibility.png")}/>
                            <TextInput autoCorrect={false} autoCapitalize="none" onChangeText={password=>this.setState({password})} value={this.state.password} maxLength={20}  secureTextEntry={!this.state.showPassword} placeholder="Password" placeholderTextColor="rgba(255,255,255,0.75)" style={styles.passwordInput} />
                        </View>
                        {this.state.password != '' && <Button onPress={()=>this.setState({showPassword:!this.state.showPassword})}textStyle={styles.showHidePasswordText} style={styles.showHidePassword}>{this.state.showPassword ? 'Hide': 'Show'}</Button>}
                    </View>
                    <View style={styles.agreeNote}>
                        <View style={{flex:1, flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                            <Text style={styles.agreeNoteText}>By signing up, you agree to the </Text>
                            <TouchableOpacity onPress={Actions.privacyPolicy}><Text style={styles.linkText}>Privacy Policy</Text></TouchableOpacity>
                            <Text style={styles.agreeNoteText}> and the </Text>
                            <TouchableOpacity onPress={Actions.termsOfService}><Text style={styles.linkText}>Terms of Service.</Text></TouchableOpacity>
                        </View>
                    </View>
                    <Button onPress={()=>alert("Click")} style={styles.signUpButton} isDisabled={this.state.password==='' || this.state.username===''}
                            textStyle={styles.text}>Continue</Button>
                    <TouchableOpacity style={styles.login} onPress={Actions.login}><Text style={styles.text}>Already have an account? Log In</Text></TouchableOpacity>
                </View>


            </View>

        );
    }

}