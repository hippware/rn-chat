// @flow

import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal, Image, TouchableWithoutFeedback} from 'react-native';
import {k, width, height} from './Global';
import {Actions} from 'react-native-router-flux';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import model from '../model/model';

@autobind
@observer
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: true};
  }
  onRightButton() {
    this.setState({isVisible: false});
  }
  onLeftButton() {
    this.setState({isVisible: false});
    Actions.drawerOpen();
  }
  render() {
    return (<Modal visible={Actions.currentScene === 'friends' && !model.friends.all.length && this.state.isVisible} transparent>
      <TouchableWithoutFeedback onPress={() => this.setState({isVisible: false})}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.onRightButton()} style={styles.rightButton}>
            <Image source={require('../../images/followers.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onLeftButton()} style={styles.leftButton} />
          <Image source={require('../../images/curveLine.png')} style={{position: 'absolute', top: 70, right: 17}} />
          <View style={{top: 230, width: 200, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center', color: 'white', fontFamily: 'Roboto-Regular', fontSize: 18}}>
              <Text style={{fontFamily: 'Roboto-Medium'}}>Tinyrobot</Text><Text> is more fun with friends!{'\n'}{'\n'}</Text>
              <Text style={{fontSize: 16}}>Tap to add friends</Text>
            </Text>
          </View>
          <Image source={require('../../images/transparentLogo.png')} style={{width: 74, height: 85, top: 250, alignSelf: 'center'}} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>);
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  leftButton: {
    position: 'absolute',
    top: 26,
    left: 6,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    position: 'absolute',
    top: 26,
    right: 6,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
