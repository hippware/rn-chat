// @flow

import React from 'react'
import {Image, View, TextInput} from 'react-native'
import autobind from 'autobind-decorator'
import {k} from './Global'
import {colors} from '../constants'
import {observer} from 'mobx-react/native'
import {ValidateItem} from '../utils/formValidation'
import {RText} from './common'
import Cell from './Cell'

type Props = {
  icon?: any
  label: string
  store?: ValidateItem
}

@autobind
@observer
class FormTextInput extends React.Component<Props> {
  input: any

  focus() {
    this.input.focus()
  }

  blur() {
    this.input.blur()
  }

  render() {
    const {icon, label, store} = this.props

    return (
      <View>
        {store ? (
          <RText size={11} color={colors.PINK} style={{marginLeft: 40 * k, marginTop: 5 * k}}>
            {store.errorMessage}
          </RText>
        ) : (
          <View style={{height: 11 * k}} />
        )}

        <Cell
          image={icon}
          style={{justifyContent: 'center', paddingTop: 2 * k}}
          imageStyle={{height: 20 * k, width: 20 * k, marginHorizontal: 5 * k}}
        >
          {icon ? null : <View style={{width: 30 * k}} />}
          <TextInput
            style={{
              flex: 1,
              color: colors.DARK_PURPLE,
              fontFamily: 'Roboto-Regular',
              fontSize: 18 * k,
            }}
            placeholder={label}
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            ref={r => (this.input = r)}
            placeholderTextColor={colors.GREY}
            returnKeyType="next"
            onChangeText={text => {
              if (store) store.value = text
            }}
            value={store && store.value}
            autoCorrect={false}
            {...this.props}
          />
          {/* </View> */}
          <View style={{width: 15 * k, justifyContent: 'center', alignItems: 'center'}}>
            {store && store.isValid !== undefined ? (
              store.isValid ? (
                <Image source={require('../../images/checkMark.png')} />
              ) : (
                <Image source={require('../../images/x.png')} />
              )
            ) : null}
          </View>
        </Cell>
        <View style={{height: 1, backgroundColor: colors.DARK_PURPLE, opacity: 0.2}} />
      </View>
    )
  }
}

export default FormTextInput
