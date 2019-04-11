import React from 'react'
import {TouchableOpacity} from 'react-native'
import {avatarScale} from './Global'
import {showImagePicker} from './ImagePicker'
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
  @observable imgSrc

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
            callback: this.imageSelected,
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
