import React from 'react-native';
const {View, Image, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} = React;
import {Actions} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import styles from './styles';
import BackgroundVideo from './BackgroundVideo';
import Logo from './Logo';
import SignUp from './SignUp';

export default class Launch extends React.Component {
    constructor(props){
        super(props);
        this.onJoin = this.onJoin.bind(this);
    }
    onJoin(){
        this.refs.swiper.scrollTo(1);
    }
    componentDidMount(){
        //setTimeout(()=>Actions.processLogin(),50);
    }

    render(){
        //<Image source={require("../../images/logoMark@1.png")} />
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
                        <TouchableOpacity style={styles.signUpButton} onPress={Actions.signUp}>
                            <Text style={styles.text}>Join Now</Text>
                        </TouchableOpacity>
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


