import React from 'react'
import {ImageProperties} from 'react-native'
import * as colors from '../../constants/colors'
import {observer} from 'mobx-react/native'
import {LazyImage} from '.'

type Props = {
  file: any
  resizeMode?: ImageProperties['resizeMode']
  style?: any
}

const ProgressiveImage = observer(({style, file, ...rest}: Props) => {
  style = file && file.loaded ? style : [style, {backgroundColor: colors.gray(222)}]
  return <LazyImage style={style} source={file.source} file={file} {...rest} />
})

export default ProgressiveImage
