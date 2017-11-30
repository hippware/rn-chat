// @flow

import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {k, width} from '../Global';
import {colors} from '../../constants';
import botStore from '../../store/botStore';
import {showImagePicker} from '../ImagePicker';
import {RText, Spinner} from '../common';

const TRANS_WHITE = colors.addAlpha(colors.WHITE, 0.75);

type Props = {
  isFirstScreen?: boolean,
};

@observer
class BotComposePhoto extends React.Component<Props> {
  @observable uploadingPhoto: boolean = false;

  onCoverPhoto = (): void => {
    if (!this.props.isFirstScreen) {
      showImagePicker('Image Picker', (source, response) => {
        this.uploadingPhoto = true;
        try {
          botStore.setCoverPhoto({source, ...response});
        } finally {
          this.uploadingPhoto = false;
        }
      });
    }
  };

  render() {
    const {isFirstScreen} = this.props;
    const backgroundColor = {backgroundColor: isFirstScreen ? colors.LIGHT_GREY : colors.LIGHT_BLUE};
    return botStore.bot.image && botStore.bot.image.source ? (
      <View style={{height: width}}>
        {this.uploadingPhoto ? (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Spinner size={38} />
          </View>
        ) : (
          <Image style={{width, height: width}} resizeMode='contain' source={botStore.bot.image.source} />
        )}
        <TouchableOpacity onPress={this.onCoverPhoto} style={styles.changePhotoButton}>
          <RText size={11} weight='Medium' color={colors.DARK_PURPLE} style={{letterSpacing: 0.5}}>
            CHANGE PHOTO
          </RText>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={[styles.imageContainer, backgroundColor]}>
        {!isFirstScreen && (
          <TouchableOpacity onPress={this.onCoverPhoto} style={{alignItems: 'center'}}>
            <Image source={require('../../../images/iconAddcover.png')} />
            <RText size={14} color={colors.WHITE}>
              Add Cover Photo
            </RText>
          </TouchableOpacity>
        )}
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
