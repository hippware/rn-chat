import React, {ReactElement} from 'react'
import {Image} from 'react-native'
import {IFile} from 'wocky-client'

interface IProps {
  file?: IFile | null
  placeholder?: ReactElement<any>
  // imageProps?: ImageProps
  imageProps: any
}

export default class LazyImage extends React.Component<IProps> {
  render() {
    const {file, placeholder, imageProps} = this.props
    // console.log('LAZY IMAGE:', JSON.stringify(file), imageProps)
    return file || !placeholder ? <Image source={file} {...imageProps} /> : placeholder
  }
}
