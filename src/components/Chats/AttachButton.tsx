import React from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {inject, observer} from 'mobx-react/native'
import {showImagePicker} from '../ImagePicker'
import {IMessage} from 'wocky-client'
import {observable} from 'mobx'
import {Spinner} from '../common'

type Props = {
  message: IMessage
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

  onAttach = () => {
    const {message, notificationStore} = this.props
    showImagePicker({
      callback: async (source, response) => {
        try {
          this.uploading = true
          await message.upload({
            file: source,
            size: response.size,
          })
          message.send()
        } catch (e) {
          notificationStore.flash(e.message)
        } finally {
          this.uploading = false
        }
      },
    })
  }
}

export default AttachButton
