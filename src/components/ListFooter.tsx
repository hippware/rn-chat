import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {Spinner} from './common'
import {observer} from 'mobx-react/native'

type Props = {
  footerImage?: any
  finished: boolean
  style?: Object
}

const ListFooter = observer(({footerImage, finished, style}: Props) => (
  <View style={[style, {alignItems: 'center'}]}>
    {finished ? (
      footerImage ? (
        <Image source={footerImage} style={styles.padding} />
      ) : null
    ) : (
      <Spinner style={styles.padding} />
    )}
  </View>
))

export default ListFooter

const styles = StyleSheet.create({
  padding: {
    marginTop: 10,
    marginBottom: 21,
  },
})
