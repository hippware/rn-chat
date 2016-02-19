import React from 'react-native';
import {DigitsLoginButton} from 'react-native-fabric-digits';
import {processLogin} from '../actions/profile';
import {k} from '../globals';
import { connect, Provider } from 'react-redux';

class PhoneVerify extends React.Component {
    completion(error, response) {
        if (error && error.code !== 1) {
            alert(error.message);
        } else if (response) {
            this.props.dispatch(processLogin(response));
        }
    }

    render(){
        return (
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
                    completion={this.completion.bind(this)}
                    text="Sign In"
                    buttonStyle={{position:'absolute',bottom:40*k, left:30*k, right:30*k, height:50*k, borderWidth: 0,borderRadius:2*k,backgroundColor:'rgb(254,92,108)',alignItems:'center', justifyContent:'center'}}
                    textStyle={{fontSize:15*k, fontFamily:'Roboto-Regular',color:'white'}}
                />
        );

    }
}

export default connect(state=>({profile:state.profile}))(PhoneVerify)


