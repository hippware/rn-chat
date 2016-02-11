import React from 'react-native';
const {View, Image, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} = React;
import {Actions} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import styles from './styles';
import BackgroundVideo from './BackgroundVideo';
import Logo from './Logo';
import SignUp from './SignUp';
import Drawer from './Drawer';
import {DigitsLoginButton} from 'react-native-fabric-digits';
import {phoneVerified} from '../actions/registration';

export default class Launch extends React.Component {
    constructor(props){
        super(props);
        this.completion = this.completion.bind(this);
        this.state = {};
    }

    completion(error, response) {
        if (error && error.code !== 1) {
            alert(error.message);
        } else if (response) {
            this.props.dispatch(phoneVerified(response));
            setTimeout(()=>Actions.signUp());
        }
    }

    render(){
        return (
            <View style={styles.center}>
                <BackgroundVideo/>
                <Logo/>
                <Swiper style={{flex:1}}
                        autoplay={false}
                        loop={true}
                        showsButtons={false}
                        paginationStyle={styles.paginationStyle}
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
                <DigitsLoginButton
                    options={{
                              title: "TinyRobot",
                              appearance: {
                                backgroundColor: {
                                  hex: "#3F324D",
                                  alpha: 1
                                },
                                logoImageName: "logoMark",
                                accentColor: {
                                  hex: "#FE5C6C",
                                  alpha: 1.0
                                },
                                headerFont: {
                                  name: "Roboto-Regular",
                                  size: 15
                                },
                                labelFont: {
                                  name: "Roboto-Regular",
                                  size: 18
                                },
                                bodyFont: {
                                  name: "Roboto-Light",
                                  size: 15
                                }
                              }
                            }}
                    completion={this.completion}
                    text="Join Now"
                    buttonStyle={styles.signUpButton}
                    textStyle={styles.text}
                />
                <TouchableOpacity style={styles.login} onPress={Actions.login}>
                    <Text style={styles.text}>Already have an account? Log In</Text>
                </TouchableOpacity>
            </View>
        );
        //<TouchableOpacity style={styles.signUpButton} >
        //    <Text style={styles.text}>Sign Up</Text>
        //</TouchableOpacity>

    }
}


