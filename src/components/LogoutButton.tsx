import React from 'react'
import {StyleSheet, Alert, TouchableOpacity, Text, View} from 'react-native'
import Button from 'apsl-react-native-button'
import {settings} from '../globals'
import {k} from './Global'
import {Actions} from 'react-native-router-flux'
import {inject, observer} from 'mobx-react/native'
import {IWocky} from 'wocky-client'

const LogoutButton = () => {
  if (settings.isTesting) {
    return (
      <Button
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
      <View>
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
                }
              }
            ])
          }}
          style={styles.button}
          testID="logout"
        >
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
        <RemoveProfileButton />
      </View>
    )
  }
}

const RemoveProfileButton = inject('wocky')(
  observer(({wocky}: {wocky?: IWocky}) => {
    return settings.isStaging ? (
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Delete Profile',
            `Are you reeeeally sure you want to remove this profile? This action cannot be reversed.`,
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Delete Profile',
                style: 'destructive',
                onPress: async () => {
                  Actions.pop({animated: false})
                  Actions.pop({animated: false})
                  Actions.logout()
                  wocky!.remove()
                }
              }
            ]
          )
        }}
        style={[styles.button, {marginTop: 80 * k}]}
        testID="deleteProfile"
      >
        <Text style={styles.text}>Delete Profile</Text>
      </TouchableOpacity>
    ) : null
  })
)

const styles = StyleSheet.create({
  text: {fontSize: 15 * k, fontFamily: 'Roboto-Regular', color: 'white'},
  button: {
    margin: 15 * k,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 2 * k,
    backgroundColor: 'rgb(254,92,108)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LogoutButton
