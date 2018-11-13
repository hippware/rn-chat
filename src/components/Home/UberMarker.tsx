import React from 'react'
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import Bubble from '../map/Bubble'
import commonStyles from '../styles'
import IconStore from 'src/store/IconStore'
import {BotIcon} from '../common'

const dragTheMap = require('../../../images/dragTheMap.png')
const tapToChange = require('../../../images/tapToChange.png')

type Props = {
  iconStore?: IconStore
}

const UberMarker = inject('iconStore')(
  observer(({iconStore}: Props) => {
    const {emoji, setEmoji} = iconStore!
    return (
      <View
        pointerEvents="box-none"
        style={[
          commonStyles.absolute,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <TouchableOpacity onPress={() => setEmoji('1')}>
          <Bubble
            style={{
              backgroundColor: 'white',
            }}
            outerStyle={{
              shadowOffset: {height: 2, width: 0},
              shadowRadius: 3,
              shadowOpacity: 0.12,
            }}
            imageStyle={{width: 20, height: 20}}
            size={48}
          >
            <BotIcon icon={emoji!} size={20} />
          </Bubble>
          <Image source={tapToChange} style={styles.changeCTA as any} />
        </TouchableOpacity>
        <Image source={dragTheMap} />
      </View>
    )
  })
)

export default UberMarker

const styles = StyleSheet.create({
  changeCTA: {
    position: 'absolute',
    top: -40,
    left: 30,
  },
})
