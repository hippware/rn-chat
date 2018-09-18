import React from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import {k} from './Global'
import {showImagePicker} from './ImagePicker'
import {observer, inject} from 'mobx-react/native'
import {Spinner, PresenceDot} from './common'

type Props = {
  style?: any
  wocky?: any
  cameraScene?: string
  warn?: any
  showDot?: boolean
}

const AVATAR_DIMENSION = 80 * k

@inject('wocky', 'warn')
@observer
class SignUpAvatar extends React.Component<Props> {
  render() {
    const {wocky: {profile}, showDot, style} = this.props
    const {avatar} = profile
    const theAvatar = (avatar && avatar.thumbnail) || require('../../images/addPhoto.png')
    return (
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={() =>
          showImagePicker({
            title: 'Select Avatar',
            callback: this.imageSelected,
          })
        }
      >
        {avatar && (avatar.loading || profile.uploading) ? (
          <Spinner size={AVATAR_DIMENSION / 2} />
        ) : (
          <View>
            <Image
              style={[
                {
                  width: AVATAR_DIMENSION,
                  height: AVATAR_DIMENSION,
                  borderRadius: AVATAR_DIMENSION / 2,
                },
                style,
              ]}
              source={theAvatar}
              resizeMode="cover"
            />
            {showDot && (
              <PresenceDot
                profile={profile}
                size={30}
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                  left: undefined,
                  top: undefined,
                  height: 18,
                  width: 18,
                  borderRadius: 9,
                }}
              />
            )}
          </View>
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
