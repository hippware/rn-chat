import React from 'react'
import {Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, Text} from 'react-native'
import Cell from './Cell'
import {colors} from '../constants'

export default class CellOptional extends React.Component {
  render() {
    return (
      <Cell
        style={{backgroundColor: 'rgba(228,228,228,0.24)'}}
        imageStyle={{paddingLeft: 20}}
        textStyle={{color: colors.DARK_GREY}}
        {...this.props}
      />
    )
  }
}
