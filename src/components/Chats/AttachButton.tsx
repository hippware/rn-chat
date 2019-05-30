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
      <TouchableOpacity
        style={{borderWidth: 0, borderColor: 'transparent', paddingVertical: 15}}
        onPress={this.onAttach}
      >
        {this.uploading ? (
          <Spinner />
        ) : (
          <Image source={require('../../../images/iconAttach.png')} />
        )}
      </TouchableOpacity>
    )
  }

  onAttach = async () => {
    const {chat, notificationStore} = this.props
    const image = await showImagePicker()
    if (image) {
      try {
        this.uploading = true
        // TODO handle failures for upload
        await chat.message!.upload({
          size: image.size,
          file: image,
        })
        chat.sendMessage()
      } catch (e) {
        notificationStore.flash(e.message)
      } finally {
        this.uploading = false
      }
    }
  }
}

export default AttachButton
