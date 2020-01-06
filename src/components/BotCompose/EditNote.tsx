import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Platform} from 'react-native'
import {RText, RTextInput} from '../common'
import {k, width, minHeight} from '../Global'
import {colors} from '../../constants'
import {IBot} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {GradientButton} from '../common'
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

type Props = {
  botId: string
}

const EditNote = observer((props: Props) => {
  const [bot, setBot] = useState<IBot | undefined>(undefined)
  const wocky = useWocky()

  useEffect(() => {
    setBot(wocky.getBot({id: props.botId}))
  }, [])

  return bot ? (
    <View style={{position: 'absolute', bottom: 0}}>
      <RTextInput
        style={[
          styles.textStyle,
          {
            width,
            height: 150,
            paddingTop: 15,
            textAlignVertical: 'top',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
          },
        ]}
        placeholder="Tell us about this place!"
        onChangeText={text => bot!.load({description: text})}
        value={bot!.description}
        autoFocus
        multiline
        selectionColor={colors.COVER_BLUE}
      />
      <GradientButton
        innerStyle={{
          width,
          // backgroundColor: colors.PINK, // TODO: gradient background
          paddingVertical: 15 * k,
          alignItems: 'center',
        }}
        isPink
        onPress={() => Actions.pop()}
      >
        <RText color="white" size={15}>
          Add Note
        </RText>
      </GradientButton>
    </View>
  ) : null
})

const styles = StyleSheet.create({
  textStyle: {
    height: 50 * minHeight,
    left: 0,
    right: 0,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 1,
    borderTopColor: colors.GREY,
    borderTopWidth: 1,
    backgroundColor: 'white',
    padding: 13,
    paddingLeft: 21 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
  },
})

// const KeyboardAwareEditNote = withKeyboardHOC(EditNote)
const KeyboardAwareEditNote = Platform.OS === 'ios' ? withKeyboardHOC(EditNote) : EditNote
export default KeyboardAwareEditNote
