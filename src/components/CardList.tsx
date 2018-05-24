// @flow

import React from 'react'
import {StyleSheet} from 'react-native'
import {
  KeyboardAwareFlatList,
  KeyboardAwareFlatListProps,
} from 'react-native-keyboard-aware-scroll-view'
import {colors} from '../constants'

const {backgroundColorCardDay} = colors

interface IProps extends KeyboardAwareFlatListProps<any> {
  innerStyle?: any
  emptyUI?: any
  data: any[]
}

const CardList = (props: IProps) => {
  const {style, data, emptyUI, innerStyle, ...others} = props
  const backgroundColor = backgroundColorCardDay
  return data.length || !emptyUI ? (
    <KeyboardAwareFlatList
      data={data}
      {...others}
      contentContainerStyle={[styles.inner, {backgroundColor}, innerStyle]}
    />
  ) : (
    emptyUI
  )
}

export default CardList

const styles = StyleSheet.create({
  inner: {
    borderWidth: 0,
    borderColor: 'white',
    borderRadius: 2,
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 2,
    shadowOpacity: 0.12,
  },
})
