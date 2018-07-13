import React from 'react'
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {k} from '../Global'
import {colors} from '../../constants'
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import {IHomeStore} from '../../store/HomeStore'
import {inject} from 'mobx-react'
import {settings} from '../../globals'

const settingsImg = require('../../../images/settingsBtn.png')
const create = require('../../../images/create.png')
const toggle = require('../../../images/homeToggle.png')
const toggleOff = require('../../../images/homeToggleOff.png')

type Props = {
  homeStore?: IHomeStore
}

const RightPanel = inject('homeStore')(
  observer(({homeStore: {listMode, toggleListMode}}: Props) => (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        onPress={() => Actions.bottomMenu()}
        onLongPress={() => settings.isStaging && Actions.debugScreen()}
        style={styles.button}
      >
        <Image source={settingsImg} />
      </TouchableOpacity>

      <View>
        <TouchableOpacity onPress={toggleListMode} style={[styles.button, styles.pill]}>
          <Image source={listMode === 'home' ? toggle : toggleOff} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Actions.botContainer()
          }}
          style={styles.button}
        >
          <Image source={create} />
        </TouchableOpacity>
      </View>
    </View>
  ))
)

export default RightPanel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-end',
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
