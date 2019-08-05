import React, {ReactElement} from 'react'
import {Image} from 'react-native'
import {observer} from 'mobx-react'
import {IFileImage} from 'wocky-client'

interface IProps {
  file?: IFileImage | null
  placeholder?: ReactElement<any>
  // imageProps?: ImageProps
  imageProps: any
}

const LazyImage = observer(({file, placeholder, imageProps}: IProps) => {
  return (file && file.thumbnail) || !placeholder ? (
    <Image source={file && file.thumbnail} {...imageProps} />
  ) : (
    placeholder
  )
})

export default LazyImage
