import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {Spinner} from './common'
import {observer} from 'mobx-react/native'
import {k} from './Global'

type Props = {
  footerImage?: any
  finished?: boolean
  style?: object
}

const ListFooter = observer(({footerImage, finished, style}: Props) => (
  <View style={[{alignItems: 'center', backgroundColor: 'white', height: 50 * k}, style]}>
    {finished ? (
      footerImage ? (
        <Image source={footerImage} style={styles.padding} />
      ) : null
    ) : (
      <Spinner style={styles.padding as any} />
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
