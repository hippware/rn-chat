import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {observer} from 'mobx-react'
import {AutoExpandingTextInput, RText} from '../common'
import {colors} from '../../constants'
import {IChat} from 'wocky-client'
import AttachButton from './AttachButton'
import {addAlpha} from 'src/constants/colors'

type InputProps = {
  chat: IChat
}

const InputArea = observer(({chat}: InputProps) => {
  return chat.message ? (
    <View style={styles.container}>
      <AttachButton chat={chat} />
      <AutoExpandingTextInput
        style={styles.textInput}
        placeholder="Write a message..."
        placeholderTextColor={addAlpha(colors.DARK_GREY, 0.5)}
        multiline
        returnKeyType="default"
        enablesReturnKeyAutomatically
        onChangeText={t => chat.message!.setBody(t)}
        value={chat.message.content}
        blurOnSubmit={false}
        maxHeight={100}
        maxLength={500}
      />
      {chat.message.content.trim().length > 0 && (
        <TouchableOpacity
          onPress={() => {
            chat!.sendMessage()
          }}
          hitSlop={{top: 5, right: 5, bottom: 5, left: 5}}
          style={{position: 'absolute', right: 20, borderWidth: 0}}
        >
          <RText size={16} color={colors.PINK}>
            Send
          </RText>
        </TouchableOpacity>
      )}
    </View>
  ) : null
})

export default InputArea

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: colors.GREY,
  },
  textInput: {
    fontFamily: 'Roboto-Regular',
    flex: 1,
    margin: 0,
    paddingHorizontal: 20,
    paddingRight: 55,
    paddingTop: 12,
    paddingBottom: 11,
    fontSize: 15,
    color: colors.DARK_PURPLE,
    borderWidth: 1,
    borderRadius: 22,
    borderColor: colors.GREY,
    alignItems: 'center',
  },
})
