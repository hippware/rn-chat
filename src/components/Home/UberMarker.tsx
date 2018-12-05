import React from 'react'
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import Bubble from '../map/Bubble'
import commonStyles from '../styles'
import IconStore from 'src/store/IconStore'
import {BotIcon} from '../common'
import {IHomeStore} from 'src/store/HomeStore'

const dragTheMap = require('../../../images/dragTheMap.png')
const tapToChange = require('../../../images/tapToChange.png')

type Props = {
  iconStore?: IconStore
  homeStore?: IHomeStore
}

const UberMarker = inject('iconStore', 'homeStore')(
  observer(({iconStore, homeStore}: Props) => {
    const {emoji, isEmojiKeyboardShown, toggleEmojiKeyboard} = iconStore!
    const {isIconEditable} = homeStore!
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
        <Wrapper toggle={toggleEmojiKeyboard} isTouchable={isIconEditable}>
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
            <BotIcon icon={emoji || '❔'} size={24} />
          </Bubble>
          {isIconEditable && <Image source={tapToChange} style={styles.changeCTA as any} />}
        </Wrapper>
        {!isEmojiKeyboardShown && <Image source={dragTheMap} />}
      </View>
    )
  })
)

const Wrapper = ({isTouchable, children, toggle}) => {
  return isTouchable ? (
    <TouchableOpacity onPress={toggle}>{children}</TouchableOpacity>
  ) : (
    <View>{children}</View>
  )
}

export default UberMarker

const styles = StyleSheet.create({
  changeCTA: {
    position: 'absolute',
    top: -40,
    left: 30,
  },
})
