import React, {useState} from 'react'
import {TouchableOpacity, ImageURISource} from 'react-native'
import {avatarScale} from './Global'
import {showImagePicker} from './ImagePicker'
import {Spinner, Avatar} from './common'
import {colors} from '../constants'
import {warn} from '../utils/logger'
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

const AVATAR_DIMENSION = 80 * avatarScale

const SignUpAvatar = observer(() => {
  const [imgSrc, setImgSrc] = useState<ImageURISource | null>(null)
  const {profile, username, profiles} = useWocky()

  const selectImage = async () => {
    const image = await showImagePicker()
    if (image) {
      try {
        profile!.setFile(image)
        await profile!.upload()
        // change data within profiles cache!
        profiles.get(username!, {...profile})
        setImgSrc(image)
      } catch (err) {
        // TODO handle upload error
        warn('upload error', err)
      }
    }
  }

  if (!profile) return null
  const {avatar} = profile
  const theAvatar =
    (avatar && avatar.loaded && avatar.thumbnail) || imgSrc || require('../../images/addPhoto.png')

  const avatarProps = avatar &&
    avatar.loaded &&
    avatar.thumbnail && {borderWidth: 1.5, borderColor: colors.PINK}
  return (
    <TouchableOpacity
      style={{alignItems: 'center', justifyContent: 'center'}}
      onPress={selectImage}
    >
      {!!avatar && (avatar.loading || profile!.uploading) ? (
        <Spinner />
      ) : (
        <Avatar size={AVATAR_DIMENSION} image={theAvatar} {...avatarProps} tappable={false} />
      )}
    </TouchableOpacity>
  )
})

export default SignUpAvatar
