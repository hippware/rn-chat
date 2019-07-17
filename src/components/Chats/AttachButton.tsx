import React from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {inject, observer} from 'mobx-react/native'
import {showImagePicker} from '../ImagePicker'
import {IChat} from 'wocky-client'
import {observable} from 'mobx'
import {Spinner} from '../common'

type Props = {
  chat: IChat
  notificationStore?: any
}

@inject('notificationStore')
@observer
class AttachButton extends React.Component<Props> {
  @observable uploading: boolean = false

  render() {
    return (
      <TouchableOpacity style={{marginHorizontal: 15}} onPress={this.onAttach}>
        {this.uploading ? (
          <Spinner />
        ) : (
          <Image source={require('../../../images/cameraPink.png')} />
        )}
      </TouchableOpacity>
    )
  }

  onAttach = async () => {
    const {chat} = this.props
    const image = await showImagePicker(false)
    if (image) {
      chat.sendMessage(image)
    }
  }
}

export default AttachButton
