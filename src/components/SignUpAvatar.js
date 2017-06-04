import React, {Component} from 'react';
import {Image, View, TouchableOpacity, NativeModules} from 'react-native';
import {k} from './Global';
import profile from '../store/profileStore';
import autobind from 'autobind-decorator';
import showImagePicker from './ImagePicker';
import {observer} from 'mobx-react/native';

@autobind
@observer
export default class SignUpAvatar extends Component {
  onPhotoAdd() {
    showImagePicker('Select Avatar', (source, response) => {
      profile.uploadAvatar({
        file: source,
        width: response.width,
        height: response.height,
        size: response.fileSize,
      });
      this.avatar = source;
    });
  }

  render() {
    const borderWidth = this.props.avatar ? 2 * k : 0;
    // console.log("AVATAR:", JSON.stringify(this.props.avatar));
    const avatar = (this.props.avatar && this.props.avatar.source) || require('../../images/addPhoto.png');
    return (
      <TouchableOpacity style={{alignItems: 'center'}} onPress={this.onPhotoAdd}>
        <Image
            style={[
              {
                top: 70 * k,
                width: 82 * k,
                height: 80 * k,
                borderRadius: 40 * k,
                borderWidth,
                borderColor: 'white',
              },
              this.props.style,
            ]}
            source={avatar}
        />
      </TouchableOpacity>
    );
  }
}

SignUpAvatar.propTypes = {
  avatar: React.PropTypes.any,
};
