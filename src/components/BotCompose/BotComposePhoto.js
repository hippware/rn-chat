// @flow

import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {k, width} from '../Global';
import {colors} from '../../constants';
import {showImagePicker} from '../ImagePicker';
import Map from '../map/Map';
import BotMarker from '../map/BotMarker';
import Bubble from '../map/Bubble';

const TRANS_WHITE = colors.addAlpha(colors.WHITE, 0.75);

type Props = {
  // bot: Bot,
  afterPhotoPost: Function,
};

@inject('bot')
@observer
class BotComposePhoto extends React.Component<Props> {
  @observable uploadingPhoto: boolean = false;

  onCoverPhoto = (): void => {
    showImagePicker('Image Picker', (source, response) => {
      this.uploadingPhoto = true;
      try {
        // TODO: botStore.setCoverPhoto({source, ...response});
        this.props.afterPhotoPost();
      } finally {
        this.uploadingPhoto = false;
      }
    });
  };

  render() {
    const {bot} = this.props;
    const image = bot.image && bot.image.loaded ? bot.image.source : require('../../../images/addBotPhoto.png');
    const showLoader = bot.image && !bot.image.loaded;
    return (
      <View style={{height: width, backgroundColor: 'white', overflow: 'hidden'}}>
        <Map location={bot.location} showOnlyBot showUser={false} fullMap={false} scale={0.5} />
        <View style={{position: 'absolute', height: width, width}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.onCoverPhoto}>
              {/* TODO <Bubble text={bot.addressData.locationShort} scale={0.5} image={image} showLoader={showLoader} /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default BotComposePhoto;
