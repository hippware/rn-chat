import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {IHomeStore} from 'src/store/HomeStore'
import {inject, observer} from 'mobx-react/native'

type Props = {
  children: any
  homeStore?: IHomeStore
}

const BottomPopup = inject('homeStore')(
  observer(({homeStore, children}: Props) => {
    // TODO: style this with border radius and shadow rather than an image. Allows setting background color to white
    return (
      <View style={{paddingTop: 50}}>
        <Image
          style={styles.absolute}
          source={
            homeStore.mapType === 'hybrid'
              ? require('../../images/bottomPopupDarkShadow.png')
              : require('../../images/bottomPopup.png')
          }
          resizeMode="stretch"
        />
        {children}
      </View>
    )
  })
)
export default BottomPopup

const styles = StyleSheet.create({
  absolute: {
    width: '100%',
    position: 'absolute',
  },
})
