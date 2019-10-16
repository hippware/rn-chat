import React from 'react'
import {Image, View, TouchableOpacity} from 'react-native'
import {colors} from '../constants'
import {observer} from 'mobx-react'
import {RText} from './common'

type Props = {
  style: any
  imageStyle: any
  textStyle?: any
  image: any
  children?: any
  onRemove?: any
  onPress?: any
}

const Cell = observer(
  ({style, imageStyle, textStyle, image, children, onRemove, onPress}: Props) => {
    // const color = location.isDay ? colors.navBarTextColorDay : colors.navBarTextColorNight;
    const color = colors.navBarTextColorDay
    const cell = (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 13,
            paddingTop: 9,
            paddingHorizontal: 10,
          },
          style,
        ]}
      >
        {!!image && (
          <View style={{alignItems: 'center'}}>
            <Image source={image} style={imageStyle} />
          </View>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {typeof children === 'string' ? (
            <RText numberOfLines={1} style={[{flex: 1, color}, textStyle]}>
              {children}
            </RText>
          ) : (
            children
          )}
        </View>
        {!!onRemove && (
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={onRemove}
          >
            <Image source={require('../../images/iconCloseSmall.png')} />
          </TouchableOpacity>
        )}
      </View>
    )

    return onPress ? (
      <TouchableOpacity onPress={onPress} style={style}>
        {cell}
      </TouchableOpacity>
    ) : (
      cell
    )
  }
)

export default Cell
