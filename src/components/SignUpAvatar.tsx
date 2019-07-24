import React from 'react'
import {TouchableOpacity, ImageURISource} from 'react-native'
import {avatarScale} from './Global'
import {showImagePicker} from './ImagePicker'
import {observer, inject} from 'mobx-react'
import {Spinner, Avatar} from './common'
import {observable} from 'mobx'
import {colors} from '../constants'
import {warn} from '../utils/logger'

type Props = {
  wocky?: any
}

const AVATAR_DIMENSION = 80 * avatarScale

@inject('wocky')
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
        onPress={this.selectImage}
      >
        {avatar && (avatar.loading || profile.uploading) ? (
          <Spinner />
        ) : (
          <Avatar size={AVATAR_DIMENSION} image={theAvatar} {...avatarProps} tappable={false} />
        )}
      </TouchableOpacity>
    )
  }

  selectImage = async () => {
    const image = await showImagePicker()
    if (image) {
      const {profile, username, profiles} = this.props.wocky
      try {
        profile.setFile(image)
        await profile.upload()
        // change data within profiles cache!
        profiles.get(username, {...profile})
        this.imgSrc = image
      } catch (err) {
        // TODO handle upload error
        warn('upload error', err)
      }
    }
  }
}

export default SignUpAvatar
