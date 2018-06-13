import React from 'react'
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {k} from '../Global'
import {colors} from '../../constants'
import {inject, observer} from 'mobx-react/native'
import {IHomeStore} from '../../store/HomeStore'

const settings = require('../../../images/settingsBtn.png')
const create = require('../../../images/create.png')
const toggle = require('../../../images/homeToggle.png')
const toggleOff = require('../../../images/homeToggleOff.png')

type Props = {
  homeStore?: IHomeStore
}

// TODO: make RightPanel slide to the right and back
@inject('homeStore')
@observer
export default class RightPanel extends React.Component<Props> {
  render() {
    const {set, homeMode, zoomToCurrentLocation} = this.props.homeStore!
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            /* TODO */
          }}
          style={styles.button}
        >
          <Image source={settings} />
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            onPress={() => {
              if (!homeMode) {
                zoomToCurrentLocation()
              }
              set({homeMode: !homeMode})
            }}
            style={[styles.button, styles.pill]}
          >
            <Image source={homeMode ? toggle : toggleOff} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              /* TODO */
            }}
            style={styles.button}
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
    marginBottom: 15 * k,
    paddingRight: 12 * k,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 15 * k,
  },
  pill: {
    shadowColor: colors.PINK,
    shadowRadius: 5 * k,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
  },
})
