import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {width, height, k} from './Global';
import * as Progress from 'react-native-progress';
import {colors} from '../constants';

export default class Launch extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'transparent'}}>
        <View style={styles.container}>
          <Image style={styles.backgroundImage} source={require('../../images/Launch.gif')} />
        </View>
        <Progress.CircleSnail size={26 * k} thickness={2} style={{top: 556 * k}} color={colors.PINK} />
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {width, height},
});
