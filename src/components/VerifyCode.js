import React from 'react';
import {View, Text, Keyboard, TextInput} from 'react-native';
import Button from 'apsl-react-native-button';
import DeviceInfo from 'react-native-device-info';

export default class VerifyCode extends React.Component {
  processText = (text) => {
    this.code = text;
  };

  render() {
    if (this.props.error) {
      alert(this.props.error);
    }
    return (<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Enter code</Text>
      <TextInput style={{height: 30, width: 100}}
        placeholder='Code'
        autoFocus
        autoCorrect={false}
        keyboardType='phone-pad'
        ref={r => (this.phoneText = r)}
        onChangeText={this.processText}
        value={this.code}
      />
      <Button onPress={this.props.onResend}>Resend</Button>
      <Button onPress={() => { Keyboard.dismiss(); alert(DeviceInfo.getUniqueID()); this.props.onVerify({code: this.code, resource: DeviceInfo.getUniqueID()});}}>Verify</Button>
    </View>);
  }
}
