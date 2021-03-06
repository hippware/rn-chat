import React from 'react'
import {ImageProperties} from 'react-native'
import * as colors from '../../constants/colors'
import {observer} from 'mobx-react'
import LazyImage from './LazyImage'

type Props = {
  file: any
  resizeMode?: ImageProperties['resizeMode']
  style?: any
}

const ProgressiveImage = observer(({style, file, ...rest}: Props) => {
  style = file && file.loaded ? style : [style, {backgroundColor: colors.gray(222)}]
  return <LazyImage file={file} imageProps={{style, ...rest}} />
})

export default ProgressiveImage
