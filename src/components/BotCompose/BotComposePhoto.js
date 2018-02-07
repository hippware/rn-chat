// @flow

import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {width} from '../Global';
import {showImagePicker} from '../ImagePicker';
import Map from '../map/Map';
import Bubble from '../map/Bubble';

type Props = {
  afterPhotoPost: Function,
};

@inject('bot')
@observer
class BotComposePhoto extends React.Component<Props> {
  onCoverPhoto = (): void => {
    showImagePicker('Image Picker', async (source, response) => {
      try {
        await this.props.bot.upload({file: source, ...response});
        this.props.afterPhotoPost();
      } catch (err) {
        console.log('photo upload err', err);
        // TODO: notification...use bot.image.uploadError
      }
    });
  };

  render() {
    const {bot} = this.props;
    const image = bot.image && bot.image.loaded ? bot.image.source : require('../../../images/addBotPhoto.png');
    const showLoader = bot.image && (!bot.image.loaded || bot.image.uploading);
    return (
      <View style={{height: width, backgroundColor: 'white', overflow: 'hidden'}}>
        <Map location={bot.location} showOnlyBot showUser={false} fullMap={false} scale={0.5} />
        <View style={{position: 'absolute', height: width, width}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.onCoverPhoto}>
              <Bubble text={bot.addressData.locationShort} scale={0.5} image={image} showLoader={showLoader} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default BotComposePhoto;
