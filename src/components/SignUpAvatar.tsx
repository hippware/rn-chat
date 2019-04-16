import React from 'react'
import {TouchableOpacity, ImageURISource} from 'react-native'
import {avatarScale} from './Global'
import {showImagePicker, PickerImage} from './ImagePicker'
import {observer, inject} from 'mobx-react/native'
import {Spinner, Avatar} from './common'
import {observable} from 'mobx'
import {colors} from 'src/constants'

type Props = {
  wocky?: any
  warn?: any
}

const AVATAR_DIMENSION = 80 * avatarScale

@inject('wocky', 'warn')
@observer
class SignUpAvatar extends React.Component<Props> {
  @observable imgSrc?: ImageURISource

  render() {
    const {profile} = this.props.wocky!
    const {avatar} = profile
    const theAvatar =
      (avatar && avatar.loaded && avatar.thumbnail) ||
      this.imgSrc ||
      require('../../images/addPhoto.png')

    const avatarProps = avatar &&
      avatar.loaded &&
      avatar.thumbnail && {borderWidth: 1.5, borderColor: colors.PINK}
    return (
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={() =>
          showImagePicker({
            title: 'Select Avatar',
            afterImagePicked: this.imageSelected,
          })
        }
      >
        {avatar && (avatar.loading || profile.uploading) ? (
          <Spinner />
        ) : (
          <Avatar size={AVATAR_DIMENSION} image={theAvatar} {...avatarProps} tappable={false} />
        )}
      </TouchableOpacity>
    )
  }

  imageSelected = async (image: PickerImage) => {
    const {profile, username, profiles} = this.props.wocky
    try {
      await profile.upload({size: image.size, file: image})
      // change data within profiles cache!
      profiles.get(username, {...profile})
      this.imgSrc = image
    } catch (err) {
      // TODO handle upload error
      this.props.warn('upload error', err)
    }
  }
}

export default SignUpAvatar
