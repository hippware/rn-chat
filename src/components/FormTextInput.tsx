import React from 'react'
import {Image, View, TextInputProperties, TouchableOpacity, Platform} from 'react-native'
import {k} from './Global'
import {colors} from '../constants'
import {observer} from 'mobx-react'
import {ValidateItem} from '../utils/formValidation'
import {RText, RTextInput, Separator} from './common'
import Cell from './Cell'

interface IProps extends TextInputProperties {
  icon?: any
  label: string
  store?: ValidateItem
  imageStyle?: any
}

export class FormTextInput extends React.Component<IProps> {
  input: any

  focus = () => {
    this.input.focus()
  }

  blur = () => {
    this.input.blur()
  }

  render() {
    const {icon, label, store, imageStyle} = this.props

    return (
      <>
        {store && store.errorMessage ? (
          <RText size={12} color={colors.PINK} style={{marginLeft: 50, marginTop: 10}}>
            {store.errorMessage}
          </RText>
        ) : (
          <View style={{height: 10}} />
        )}

        <Cell
          image={icon}
          style={{justifyContent: 'center', paddingTop: 2}}
          imageStyle={[{marginRight: 13, marginLeft: 8 * k}, imageStyle]}
        >
          {icon ? null : <View style={{width: 40}} />}
          <RTextInput
            style={{
              width: '100%',
              color: colors.DARK_PURPLE,
              fontFamily: 'Roboto-Regular',
              fontSize: 18,
              padding: 0,
              paddingLeft: 10,
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
          {Platform.OS === 'android' && !!store && !!store!.value && store!.value.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                if (store) store.value = ''
              }}
              style={{position: 'absolute', right: 15}}
            >
              <Image source={require('../../images/deleteAllText.png')} />
            </TouchableOpacity>
          )}
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
        <Separator backgroundColor={'rgba(63, 50, 77, .2)'} />
      </>
    )
  }
}

export default observer(FormTextInput)
