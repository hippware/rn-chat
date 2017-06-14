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
  constructor(props) {
    super(props);
    this.state = {};
  }
  onPhotoAdd() {
    showImagePicker('Select Avatar', (source, response) => {
      profile.uploadAvatar({
        file: source,
        width: response.width,
        height: response.height,
        size: response.fileSize,
      });
      this.setState({source});
    });
  }

  render() {
    const avatar = this.state.source || (this.props.avatar && this.props.avatar.source) || require('../../images/addPhoto.png');
    return (
      <TouchableOpacity style={{alignItems: 'center'}} onPress={this.onPhotoAdd}>
        <Image
            style={[
              {
                width: 82 * k,
                height: 80 * k,
                borderRadius: 40 * k,
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
