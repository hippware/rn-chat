import React from 'react'
import {StyleSheet, Alert, TouchableOpacity, Text} from 'react-native'
import Button from 'apsl-react-native-button'
import {settings} from '../globals'
import {k} from './Global'
import {Actions} from 'react-native-router-flux'

const LogoutButton = () => {
  if (settings.isTesting) {
    return (
      <Button
        testID="logout"
        onPress={() => {
          Actions.logout({remove: true})
        }}
        style={styles.button}
        textStyle={styles.text}
      >
        Logout
      </Button>
    )
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Log Out', `Are you sure you want to log out?`, [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Log Out',
              style: 'destructive',
              onPress: async () => {
                Actions.pop({animated: false})
                Actions.pop({animated: false})
                Actions.logout()
              },
            },
          ])
        }}
        style={styles.button}
      >
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {fontSize: 15 * k, fontFamily: 'Roboto-Regular', color: 'white'},
  button: {
    position: 'absolute',
    bottom: 40 * k,
    left: 15 * k,
    right: 15 * k,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 2 * k,
    backgroundColor: 'rgb(254,92,108)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LogoutButton
