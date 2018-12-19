import React from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {inject} from 'mobx-react/native'
import {showImagePicker} from '../ImagePicker'
import {IMessage} from 'wocky-client'

type Props = {
  message: IMessage
  notificationStore?: any
}

@inject('notificationStore')
class AttachButton extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity
        style={{borderWidth: 0, borderColor: 'transparent', paddingVertical: 15}}
        onPress={this.onAttach}
      >
        <Image source={require('../../../images/iconAttach.png')} />
      </TouchableOpacity>
    )
  }

  onAttach = () => {
    const {message, notificationStore} = this.props
    showImagePicker({
      title: 'Select Image',
      callback: async (source, response) => {
        try {
          await message.upload({
            file: source,
            // width: response.width,
            // height: response.height,
            size: response.size,
          })
          message.send()
        } catch (e) {
          notificationStore.flash(e.message)
        }
      },
    })
  }
}

export default AttachButton
