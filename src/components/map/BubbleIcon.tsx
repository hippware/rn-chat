import React from 'react'
import {View, Image} from 'react-native'
import Triangle from './Triangle'
import {colors} from '../../constants'
import {observer} from 'mobx-react/native'

type Props = {
  icon?: string
  large?: boolean
}

// TODO: add in icons after bot creation flow is done
// const iconImg = require('../../../images/mapIcons/restaurant.png')
const defaultImg = require('../../../images/mapIcons/question.png')

@observer
export default class Bubble extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const {large} = this.props
    const imgSrc = defaultImg
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: colors.WHITE,
            borderRadius: 4,
            width: large ? 60 : 48,
            height: large ? 60 : 48,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.PINK,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={imgSrc} style={{width: 20, height: 20}} resizeMode="contain" />
        </View>
        <Triangle width={14} height={8} color={colors.PINK} direction="down" />
      </View>
    )
  }
}
