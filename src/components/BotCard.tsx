// @flow

import React from 'react'
import {StyleSheet} from 'react-native'
import Card from './Card'
import {k} from './Global'
import BotCardInner from './BotCardInner'

type Props = {
  item: any
  onPress: any
}

const BotCard = (props: Props) => {
  const {item, onPress} = props
  return (
    <Card style={styles.card} onPress={() => onPress(item)} innerStyle={styles.inner}>
      <BotCardInner {...props} />
    </Card>
  )
}

export default BotCard

const styles = StyleSheet.create({
  card: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 1,
    paddingBottom: 5 * k,
  },
  inner: {
    paddingTop: 0 * k,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0 * k,
    height: 120 * k,
  },
})
