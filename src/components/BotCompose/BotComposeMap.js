// @flow

import React from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {width} from '../Global';
import {showImagePicker} from '../ImagePicker';
import Map from '../map/Map';
import Bubble from '../map/Bubble';
import {isAlive} from 'mobx-state-tree';
import {Actions} from 'react-native-router-flux';
import BotMarker from '../map/BotMarker';

type Props = {
  afterPhotoPost: Function,
};

@inject('bot', 'notificationStore')
@observer
class BotComposeMap extends React.Component<Props> {
  // HACK to solve the bug with MapView.Marker's onSelect that works only once, so we need to change the key every selection
  @observable selected = false;
  onCoverPhoto = (): void => {
    this.selected = !this.selected;
    showImagePicker('Image Picker', async (source, response) => {
      try {
        await this.props.bot.upload({file: source, ...response});
        this.props.afterPhotoPost();
      } catch (err) {
        console.log('photo upload err', err);
        this.props.notificationStore.flash(`Upload error: ${this.props.bot.image.uploadError}`);
      }
    });
  };

  render() {
    const {bot} = this.props;
    if (!bot || !isAlive(bot)) return null;
    const image = bot.image && bot.image.loaded ? bot.image.thumbnail : require('../../../images/addBotPhoto.png');
    const showLoader = bot.image && (!bot.image.loaded || bot.image.uploading);
    return (
      <View style={{height: width, backgroundColor: 'white', overflow: 'hidden'}}>
        <Map
          geofence={bot.geofence}
          location={{...bot.location}}
          showOnlyBot
          showUser={false}
          fullMap={false}
          scrollEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          zoomEnabled={false}
          onMapPress={() => Actions.botAddress({botId: bot.id})}
          scale={0.5}
          marker={<BotMarker id={bot.id + this.selected} onImagePress={this.onCoverPhoto} image={image} showLoader={showLoader} scale={0.5} bot={bot} />}
        />
      </View>
    );
  }
}

export default BotComposeMap;
