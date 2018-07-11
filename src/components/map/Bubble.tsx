import React from 'react'
import {View, Image} from 'react-native'
import Triangle from './Triangle'
import {RText} from '../common'
import {colors} from '../../constants'
import {observer} from 'mobx-react/native'

// scale here - 1 is full image, 0.5 is bot details UI (half-screen), 0 is full map mode
type Props = {
  text: string
  image: any
  showLoader: boolean
  children?: any
}

@observer
export default class Bubble extends React.Component<Props> {
  render() {
    const {image, text, showLoader, children} = this.props
    const width = 58
    const height = 58
    const borderRadius = 9.6

    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: colors.PINK,
            borderRadius,
            width,
            height,
            overflow: 'hidden',
            borderWidth: 1.2,
            borderColor: colors.PINK,
          }}
        >
          {showLoader ? (
            <View style={{width, height: width, backgroundColor: colors.GREY}} />
          ) : (
            <Image style={{width, height: width}} resizeMode="contain" source={image} />
          )}

          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <RText
              color={colors.WHITE}
              size={13}
              style={{padding: 2}}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {text}
            </RText>
          </View>
          {children}
        </View>
        <Triangle width={14} height={8} color={colors.PINK} direction="down" />
      </View>
    )
  }
}
