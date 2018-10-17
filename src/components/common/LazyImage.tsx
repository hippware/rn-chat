import React, {ReactElement} from 'react'
import {Image, ImageProps} from 'react-native'
import {observer} from 'mobx-react/native'
import {IFile} from 'wocky-client'

interface IProps extends ImageProps {
  file: IFile
  placeholder?: ReactElement<any>
}

@observer
class LazyImage extends React.Component<IProps> {
  componentDidMount() {
    const {file} = this.props
    if (file && !file.thumbnail) {
      file.download()
    }
  }
  render() {
    const {file, placeholder, ...rest} = this.props
    return file.thumbnail || !placeholder ? <Image {...rest} /> : placeholder
  }
}

export default LazyImage
