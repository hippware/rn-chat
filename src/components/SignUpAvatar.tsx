import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import {k} from './Global'
import {showImagePicker} from './ImagePicker'
import {observer, inject} from 'mobx-react/native'
import {Spinner} from './common'

type Props = {
  style?: any
  wocky?: any
  cameraScene?: string
  warn?: any
}

const AVATAR_DIMENSION = 80 * k

@inject('wocky', 'warn')
@observer
class SignUpAvatar extends React.Component<Props> {
  render() {
    const {profile} = this.props.wocky
    const {avatar} = profile
    const theAvatar = (avatar && avatar.thumbnail) || require('../../images/addPhoto.png')
    return (
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center', height: AVATAR_DIMENSION}}
        onPress={() =>
          showImagePicker({
            title: 'Select Avatar',
            callback: this.imageSelected,
            cameraScene: 'cameraSignup',
          })
        }
      >
        {avatar && (avatar.loading || profile.uploading) ? (
          <Spinner size={AVATAR_DIMENSION / 2} />
        ) : (
          <Image
            style={[
              {
                width: AVATAR_DIMENSION,
                height: AVATAR_DIMENSION,
                borderRadius: AVATAR_DIMENSION / 2,
              },
              this.props.style,
            ]}
            source={theAvatar}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    )
  }

  imageSelected = async (src, response) => {
    try {
      await this.props.wocky.profile.upload({
        file: src,
        width: response.width,
        height: response.height,
        size: response.size,
      })
    } catch (err) {
      // TODO handle upload error
      this.props.warn('upload error', err)
    }
  }
}

export default SignUpAvatar
