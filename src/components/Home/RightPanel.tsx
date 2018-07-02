import React from 'react'
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {k} from '../Global'
import {colors} from '../../constants'
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'

const settings = require('../../../images/settingsBtn.png')
const create = require('../../../images/create.png')
const toggle = require('../../../images/homeToggle.png')
const toggleOff = require('../../../images/homeToggleOff.png')

type Props = {
  listMode: string
  toggleListMode: () => void
}

// TODO: make RightPanel slide to the right and back
@observer
export default class RightPanel extends React.Component<Props> {
  render() {
    const {listMode, toggleListMode} = this.props
    return (
      <View style={styles.container} pointerEvents="box-none">
        <TouchableOpacity
          onPress={() => Actions.bottomMenu()}
          // TODO: remove this when the settings menu is done
          onLongPress={() => Actions.codePush()}
          style={styles.button}
        >
          <Image source={settings} />
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
