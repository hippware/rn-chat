// @flow

import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {k, width} from '../Global';
import {colors} from '../../constants';
import botStore from '../../store/botStore';
import {showImagePicker} from '../ImagePicker';
import Map from '../map/Map';
import Bot from '../../model/Bot';
import BotMarker from '../map/BotMarker';
import Bubble from '../map/Bubble';

const TRANS_WHITE = colors.addAlpha(colors.WHITE, 0.75);

type Props = {
};

@observer
class BotComposePhoto extends React.Component<Props> {
  @observable uploadingPhoto: boolean = false;

  onCoverPhoto = (): void => {
    showImagePicker('Image Picker', (source, response) => {
      this.uploadingPhoto = true;
      try {
        botStore.setCoverPhoto({source, ...response});
      } finally {
        this.uploadingPhoto = false;
      }
    });
  };

  render() {
    const {bot} = botStore;
    const image = bot.image && bot.image.loaded ? bot.image.source : require('../../../images/addBotPhoto.png');
    const showLoader = bot.image && !bot.image.loaded;
    return (
      <View style={{height: width, backgroundColor: 'white', overflow: 'hidden'}}>
        <Map
          location={botStore.bot.location}
          showOnlyBot
          showUser={false}
          fullMap={false}
          scale={0.5}
          marker={<BotMarker scale={0.5} onImagePress={this.onCoverPhoto} bot={botStore.bot} />}
        />
        <View style={{position: 'absolute', height: width, width, justifyContent: 'center', alignItems: 'center'}}>
          <Bubble text={bot.addressData.locationShort} scale={0.5} image={image} showLoader={showLoader} />
        </View>
      </View>
    );
  }
}

export default BotComposePhoto;

const styles = StyleSheet.create({
  imageContainer: {
    height: width,
    justifyContent: 'center',
  },
  changePhotoButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20 * k,
    right: 20 * k,
    width: 126 * k,
    height: 30 * k,
    backgroundColor: TRANS_WHITE,
    borderRadius: 2 * k,
  },
});
