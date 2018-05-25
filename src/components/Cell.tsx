// @flow

import React from 'react'
import {Image, View, TouchableOpacity} from 'react-native'
import {k} from './Global'
import {colors} from '../constants'
import {observer} from 'mobx-react/native'
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
      <View style={[{flexDirection: 'row', alignItems: 'center', padding: 15 * k}, style]}>
        {image && (
          <View
            style={[
              {
                width: 15 * k,
                paddingLeft: 5 * k,
                paddingRight: 15 * k,
                alignItems: 'center',
              },
              imageStyle,
            ]}
          >
            <Image source={image} />
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
            <RText numberOfLines={1} size={15} style={[{flex: 1, color}, textStyle]}>
              {children}
            </RText>
          ) : (
            children
          )}
        </View>
        {onRemove && (
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
