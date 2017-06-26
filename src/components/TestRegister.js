import React from 'react';
import {View, Image, Text, TextInput, StyleSheet} from 'react-native';
import Button from 'apsl-react-native-button';
import statem from '../../gen/state';
import {Actions} from 'react-native-router-native';
import {k, width} from './Global';
import {colors} from '../constants';
import autobind from 'autobind-decorator';
import profileStore from '../store/profileStore';

type Props = {
  resource: string
};

@autobind
export default class extends React.Component {
  props: Props;
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  async testRegister() {
    try {
      await profileStore.testRegister(this.props.navigation.state.params.resource, this.state.text);
      Actions.connect();
      // statem.promoScene.pop();
    } catch (e) {
      alert(e);
    }
  }
  render() {
    if (!this.props.navigation.state.params.resource) {
      return null;
    }
    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 83 * k}}>
        <Image source={require('../../images/logoMark.png')} />
        <Text
            style={{
              paddingTop: 15 * k,
              fontFamily: 'Roboto-Light',
              fontSize: 18,
              color: colors.PINK,
            }}
        >
          STAGING
        </Text>
        <Text
            style={{
              padding: 10 * k,
              paddingTop: 40 * k,
              width,
              textAlign: 'left',
              fontFamily: 'Roboto-Medium',
              fontSize: 16,
              color: colors.PINK,
            }}
        >
          Enter your test phone number
        </Text>
        <View
            style={{
              height: 0.5 * k,
              width,
              backgroundColor: colors.GREY,
            }}
        />
        <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width,
              padding: 10 * k,
            }}
        >
          <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: 16 * k,
              }}
          >
            +1555
          </Text>
          <TextInput
              autoFocus
              maxLength={7}
              keyboardType='phone-pad'
              onChangeText={text => this.setState({text})}
              value={this.state.text}
              style={{
                paddingLeft: 10 * k,
                fontSize: 16 * k,
                fontFamily: 'Roboto-Regular',
                width: 300 * k,
                height: 30 * k,
              }}
          />
        </View>
        <View
            style={{
              height: 0.5 * k,
              width,
              backgroundColor: colors.GREY,
            }}
        />
        <Button onPress={this.testRegister} style={styles.buttonStyle} textStyle={styles.textStyle}>
          Next
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    bottom: 290 * k,
    left: 30 * k,
    right: 30 * k,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 2 * k,
    backgroundColor: 'rgb(254,92,108)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: 'white',
  },
});
