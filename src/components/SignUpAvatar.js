import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {k} from './Global';
import {showImagePicker} from './ImagePicker';
import {observer} from 'mobx-react/native';
import {compose, withState} from 'recompose';

type Props = {
  avatar?: Object,
  source: Object,
  setSource: Function,
  style?: Object,
};

const SignUpAvatar = ({source, setSource, avatar, style}: Props) => {
  const theAvatar = source || (avatar && avatar.source) || require('../../images/addPhoto.png');
  return (
    <TouchableOpacity
      style={{alignItems: 'center'}}
      onPress={() =>
        showImagePicker('Select Avatar', (src, response) => {
          // TODO: avatar image picker
          // profile.uploadAvatar({
          //   file: src,
          //   width: response.width,
          //   height: response.height,
          //   size: response.size,
          // });
          // setSource(src);
        })
      }
    >
      <Image
        style={[
          {
            width: 82 * k,
            height: 80 * k,
            borderRadius: 40 * k,
          },
          style,
        ]}
        source={theAvatar}
        resizeMode='cover'
      />
    </TouchableOpacity>
  );
};

const enhance = compose(observer, withState('source', 'setSource', null));

export default enhance(SignUpAvatar);
