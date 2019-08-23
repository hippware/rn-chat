import React, {useState} from 'react'
import {TouchableOpacity, Image} from 'react-native'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react-lite'
import {showImagePicker} from '../ImageCropPicker'
import {IChat} from 'wocky-client'
import {Spinner} from '../common'

type Props = {
  chat: IChat
  notificationStore?: any
}

const AttachButton = inject('notificationStore')(
  observer(({chat, notificationStore}: Props) => {
    const [uploading, setUploading] = useState(false)

    async function onAttach() {
      setUploading(true)
      try {
        const image = await showImagePicker(false)
        if (image) {
          chat.sendMessage(image)
        }
      } finally {
        setUploading(false)
      }
    }

    return (
      <TouchableOpacity style={{marginHorizontal: 15}} onPress={onAttach}>
        {uploading ? <Spinner /> : <Image source={require('../../../images/cameraPink.png')} />}
      </TouchableOpacity>
    )
  })
)

export default AttachButton
