import React, { Component } from 'react';
import { Image, Dimensions, Text, StyleSheet, View } from 'react-native';
import { RNCubeTransition } from 'react-native-cube-transition';

export default class MyComponent extends Component {
  render() {
    const {navigation} = this.props;
    const { state, dispatch } = navigation;
    const { routes, index } = state;
    const router = this.props.router;

    // Figure out what to render based on the navigation state and the router:
    const Component = router.getComponentForState(state);
    alert(JSON.stringify(state));
    return (
      <View style={styles.container}>
        <RNCubeTransition style={styles.page}>
          <Component navigation={navigation} dispatch={dispatch} state={routes[index]} />
        </RNCubeTransition>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  page: {
    position: 'absolute',
    flexDirection: 'row',
    overflow: 'hidden',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    resizeMode: 'stretch',
    width,
    height,
  },
  view: {
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 30,
  },
});