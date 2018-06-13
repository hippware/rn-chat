import React from 'react'
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {k} from '../Global'
import {colors} from '../../constants'

const settings = require('../../../images/settingsBtn.png')
const create = require('../../../images/create.png')
const toggle = require('../../../images/homeToggle.png')

// TODO: make RightPanel slide to the right and back
export default class RightPanel extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            /* TODO */
          }}
        >
          <Image source={settings} />
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            onPress={() => {
              /* TODO */
            }}
            style={[styles.button, styles.pill]}
          >
            <Image source={toggle} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              /* TODO */
            }}
          >
            <Image source={create} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-end',
    paddingTop: 15 * k,
    paddingRight: 12 * k,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 130 * k, // HACK: hardcoded
  },
  button: {
    marginVertical: 15 * k,
  },
  pill: {
    shadowColor: colors.PINK,
    shadowRadius: 5 * k,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
  },
})
