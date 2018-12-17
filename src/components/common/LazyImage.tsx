import React, {ReactElement} from 'react'
import {Image} from 'react-native'
import {observer} from 'mobx-react/native'
import {IFile} from 'wocky-client'

interface IProps {
  file?: IFile | null
  placeholder?: ReactElement<any>
  // imageProps?: ImageProps
  imageProps: any
}

@observer
export default class LazyImage extends React.Component<IProps> {
  render() {
    const {file, placeholder, imageProps} = this.props
    return file || !placeholder ? <Image source={file} {...imageProps} /> : placeholder
  }
}
