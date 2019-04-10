import React from 'react'
import {Image, TouchableOpacity, View, Platform} from 'react-native'
import {avatarScale} from './Global'
import {showImagePicker} from './ImagePicker'
import {observer, inject} from 'mobx-react/native'
import {Spinner, PresenceDot} from './common'
import {observable} from 'mobx'
import {colors} from 'src/constants'

type Props = {
  style?: any
  wocky?: any
  cameraScene?: string
  warn?: any
  showDot?: boolean
}

const AVATAR_DIMENSION = 80 * avatarScale

@inject('wocky', 'warn')
@observer
class SignUpAvatar extends React.Component<Props> {
  @observable imgSrc

  render() {
    const {
      wocky: {profile},
      showDot,
      style,
    } = this.props
    const {avatar} = profile
    const theAvatar =
      (avatar && avatar.loaded && avatar.thumbnail) ||
      this.imgSrc ||
      require('../../images/addPhoto.png')
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
          <Spinner />
        ) : (
          <View
            style={[
              Platform.OS === 'android' &&
                avatar &&
                avatar.loaded &&
                avatar.thumbnail && {
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: AVATAR_DIMENSION + 3,
                  height: AVATAR_DIMENSION + 3,
                  borderWidth: 1.5,
                  borderColor: colors.PINK,
                  borderRadius: AVATAR_DIMENSION / 2,
                },
            ]}
          >
            <Image
              style={[
                {
                  width: AVATAR_DIMENSION,
                  height: AVATAR_DIMENSION,
                  borderRadius: AVATAR_DIMENSION / 2,
                },
                Platform.OS === 'ios' &&
                  avatar &&
                  avatar.loaded &&
                  avatar.thumbnail && {borderWidth: 1.5, borderColor: colors.PINK},
                style,
              ]}
              source={theAvatar}
              resizeMode="contain"
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
    const {profile, username, profiles} = this.props.wocky
    try {
      await profile.upload({
        file: src,
        width: response.width,
        height: response.height,
        size: response.size,
      })
      // change data within profiles cache!
      profiles.get(username, {...profile})
      this.imgSrc = src
    } catch (err) {
      // TODO handle upload error
      this.props.warn('upload error', err)
    }
  }
}

export default SignUpAvatar
