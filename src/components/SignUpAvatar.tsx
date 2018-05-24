// @flow

import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import {k} from './Global'
import {showImagePicker} from './ImagePicker'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'

type Props = {
  style?: Object
}

const AVATAR_DIMENSION = 80 * k

@inject('wocky')
@observer
class SignUpAvatar extends React.Component<Props> {
  @observable source: Object

  imageSelected = async (src, response) => {
    try {
      this.props.wocky.profile.upload({
        file: src,
        width: response.width,
        height: response.height,
        size: response.size,
      })
      this.source = src
    } catch (err) {
      // TODO handle upload error
      console.warn('upload error', err)
    }
  }

  render() {
    const {profile} = this.props.wocky
    const {avatar} = profile
    // TODO: should we switch to source instead of thumbnail?
    const theAvatar =
      this.source || (avatar && avatar.thumbnail) || require('../../images/addPhoto.png')
    return (
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => showImagePicker('Select Avatar', this.imageSelected)}
      >
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
      </TouchableOpacity>
    )
  }
}

export default SignUpAvatar
