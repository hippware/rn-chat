import React from 'react'
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {observer} from 'mobx-react/native'
import {AutoExpandingTextInput} from '../common'
import {colors} from '../../constants'
import {IChat} from 'wocky-client'
import AttachButton from './AttachButton'

type InputProps = {
  chat: IChat
}

const InputArea = observer(({chat}: InputProps) => {
  return chat.message ? (
    <View style={styles.textInputContainer}>
      <AttachButton chat={chat} />
      <AutoExpandingTextInput
        style={styles.textInput}
        placeholder="Write a message"
        placeholderTextColor={colors.DARK_GREY}
        multiline
        autoFocus
        returnKeyType="default"
        enablesReturnKeyAutomatically
        onChangeText={t => chat.message!.setBody(t)}
        value={chat.message.content}
        blurOnSubmit={false}
        maxHeight={100}
        maxLength={500}
      />
      <TouchableOpacity
        disabled={!chat.message.content.trim()}
        onPress={() => {
          if (chat.message!.content.trim()) {
            chat.sendMessage()
          }
        }}
      >
        <Image
          source={
            chat.message.content.trim()
              ? require('../../../images/iconSendActive.png')
              : require('../../../images/iconSendInactive.png')
          }
        />
      </TouchableOpacity>
    </View>
  ) : null
})

export default InputArea

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 100,
    fontFamily: 'Roboto-Regular',
    flex: 1,
    margin: 0,
    padding: 0,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
    color: colors.DARK_PURPLE,
  },
})
