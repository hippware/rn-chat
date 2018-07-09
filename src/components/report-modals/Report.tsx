import React from 'react'
import {Alert, StyleSheet, View, TextInput, Keyboard} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {k} from '../Global'
import {colors} from '../../constants'
import {RText} from '../common'
import {Actions} from 'react-native-router-flux'

type Props = {
  subtitle: string
  placeholder: string
  reportStore?: any
}

@inject('reportStore')
@observer
export default class Report extends React.Component<Props> {
  mounted: boolean = false
  keyboardHeight: number = 0

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  componentDidMount() {
    this.mounted = true
  }

  keyboardWillShow = e => {
    if (this.mounted) this.keyboardHeight = e.endCoordinates.height
  }

  keyboardWillHide = () => {
    if (this.mounted) this.keyboardHeight = 0
  }

  render() {
    const {placeholder, subtitle, reportStore} = this.props
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 5 * k,
          paddingBottom: this.keyboardHeight,
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
          <TextInput
            style={{flex: 1, fontSize: 15, fontFamily: 'Roboto-Regular'}}
            autoFocus
            multiline
            value={reportStore.text}
            onChangeText={text => (reportStore.text = text)}
            placeholder={placeholder}
            maxLength={1000}
            editable={!reportStore.submitting}
          />
        </View>
      </View>
    )
  }
}

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
