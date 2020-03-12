import React, {ReactElement} from 'react'
import {Image} from 'react-native'
import {observer} from 'mobx-react'
import {IFile} from 'src/wocky'

interface IProps {
  file?: IFile | null
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
