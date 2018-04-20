import React from 'react'
import {Image, ImageProperties} from 'react-native'
import * as colors from '../../constants/colors'
import {observer} from 'mobx-react/native'

type Props = {
  file: any
  resizeMode?: ImageProperties['resizeMode']
  style?: any
}

const ProgressiveImage = observer(({style, file, ...rest}: Props) => {
  style = file && file.loaded ? style : [style, {backgroundColor: colors.gray(222)}]
  return <Image style={style} source={file && file.source} {...rest} />
})

export default ProgressiveImage
