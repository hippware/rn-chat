import React, {useState, useEffect, useRef} from 'react'
import {Alert, StyleSheet, TextInput, View, Keyboard} from 'react-native'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import {k} from '../Global'
import {colors} from '../../constants'
import {RText, RTextInput} from '../common'
import {Actions} from 'react-native-router-flux'

type Props = {
  subtitle: string
  placeholder: string
  reportStore?: any
}

const Report = inject('reportStore')(
  observer(({subtitle, placeholder, reportStore}: Props) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const text = useRef<TextInput | null>(null)

    useEffect(() => {
      const kwh = () => setKeyboardHeight(0)
      const kws = e => setKeyboardHeight(e.endCoordinates.height)
      Keyboard.addListener('keyboardWillShow', kws)
      Keyboard.addListener('keyboardWillHide', kwh)
      return () => {
        Keyboard.removeListener('keyboardWillShow', kws)
        Keyboard.removeListener('keyboardWillHide', kwh)
      }
    }, [])

    return (
      <View
        style={{
          flex: 1,
          marginBottom: 5 * k,
          paddingBottom: keyboardHeight,
          backgroundColor: colors.WHITE,
        }}
      >
        <View style={[styles.row, {borderTopWidth: k, borderBottomWidth: 4 * k}]}>
          <RText weight="Medium" size={16} color={colors.DARK_PURPLE}>
            {subtitle}
          </RText>
        </View>
        <View style={[styles.row, {borderBottomWidth: k}]}>
          <RText weight="Medium" size={16}>
            Reason
          </RText>
        </View>
        <View style={[styles.row, {flex: 1, paddingBottom: 5}]}>
          <RTextInput
            style={{
              flex: 1,
              fontSize: 15,
              fontFamily: 'Roboto-Regular',
              textAlignVertical: 'top',
            }}
            multiline
            value={reportStore.text}
            onChangeText={t => (reportStore.text = t)}
            placeholder={placeholder}
            maxLength={1000}
            editable={!reportStore.submitting}
            textInputRef={text}
          />
        </View>
      </View>
    )
  })
)

export const afterReport = reportStore =>
  Alert.alert('Thank You', 'We have received your report.', [
    {
      text: 'OK',
      onPress: () => {
        Actions.pop()
        reportStore.text = ''
      },
    },
  ])

const styles = StyleSheet.create({
  row: {
    borderColor: colors.GREY,
    paddingHorizontal: 20 * k,
    paddingVertical: 14 * k,
  },
})

export default Report
