// @flow

import React from 'react';
import {Alert, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {k, width} from '../Global';
import {colors} from '../../constants';
import locationStore from '../../store/locationStore';
import Bot from '../../model/Bot';
import botStore from '../../store/botStore';
import Screen from '../Screen';
import Button from '../Button';
import * as log from '../../utils/log';
import {RText} from '../common';
import EditControls from './EditControls';
import ComposeCard from './ComposeCard';
import {showImagePicker} from '../ImagePicker';
import {Actions} from 'react-native-router-flux';

const TRANS_WHITE = colors.addAlpha(colors.WHITE, 0.75);

type Props = {
  bot: Bot,
  isFirstScreen?: boolean,
  edit?: boolean,
  titleBlurred?: boolean,
};

@observer
class BotCompose extends React.Component<Props> {
  @observable keyboardHeight: number = 0;
  @observable isLoading: boolean = false;
  card: any;

  setLoading = (s: boolean) => (this.isLoading = s);

  save = async () => {
    const {bot} = this.props;
    if (!bot.title) {
      Alert.alert('Title cannot be empty');
      this.card && this.card.focusTitle();
      return;
    }
    try {
      this.isLoading = true;

      const {isNew} = botStore.bot;
      await botStore.save();

      if (isNew) {
        Actions.pop({animated: false});
        Actions.pop();
        setTimeout(() => Actions.botDetails({item: botStore.bot.id, isNew: true}));
      } else {
        Actions.pop();
      }
    } catch (e) {
      Alert.alert('There was a problem saving your bot');
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  };

  onCoverPhoto = (): void => {
    if (!this.props.isFirstScreen) {
      showImagePicker('', (source, response) => {
        botStore.setCoverPhoto({source, ...response});
      });
    }
  };

  render() {
    const {bot, isFirstScreen, edit, titleBlurred} = this.props;
    if (!bot) {
      log.log('NO BOT IS DEFINED', {level: log.levels.ERROR});
      return <Screen isDay={locationStore.isDay} />;
    }
    const saveable = bot.title.length > 0 && bot.location && bot.address;

    return (
      <Screen isDay={locationStore.isDay}>
        <KeyboardAwareScrollView
          style={{marginBottom: isFirstScreen ? 0 : 50 * k}}
          onKeyboardWillShow={frames => setTimeout(() => (this.keyboardHeight = frames.endCoordinates.height), frames.duration)}
          onKeyboardWillHide={() => (this.keyboardHeight = 0)}
        >
          <PhotoArea isFirstScreen={isFirstScreen} onCoverPhoto={this.onCoverPhoto} />
          <ComposeCard isFirstScreen={isFirstScreen} edit={edit} titleBlurred={titleBlurred} ref={r => (this.card = r)} />
          {!isFirstScreen && <EditControls />}
        </KeyboardAwareScrollView>
        {!isFirstScreen && <CreateSaveButton isLoading={this.isLoading} save={this.save} isEnabled={saveable} bottomPadding={this.keyboardHeight} />}
      </Screen>
    );
  }
}

const PhotoArea = observer(({onCoverPhoto, isFirstScreen}) => {
  const backgroundColor = {backgroundColor: isFirstScreen ? colors.LIGHT_GREY : colors.LIGHT_BLUE};
  return botStore.bot.image && botStore.bot.image.source ? (
    <View style={{height: width}}>
      <Image style={{width, height: width}} resizeMode='contain' source={botStore.bot.image && botStore.bot.image.source} />
      <TouchableOpacity onPress={onCoverPhoto} style={styles.changePhotoButton}>
        <RText size={11} weight='Medium' color={colors.DARK_PURPLE} style={{letterSpacing: 0.5}}>
          CHANGE PHOTO
        </RText>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={[styles.imageContainer, backgroundColor]}>
      {!isFirstScreen && (
        <TouchableOpacity onPress={onCoverPhoto} style={{alignItems: 'center'}}>
          <Image source={require('../../../images/iconAddcover.png')} />
          <RText size={14} color={colors.WHITE}>
            Add Cover Photo
          </RText>
        </TouchableOpacity>
      )}
    </View>
  );
});

const CreateSaveButton = observer(({isEnabled, isLoading, save, bottomPadding}) => {
  const {bot} = botStore;
  const buttonText = bot.isNew ? (bot.isPublic ? 'Post' : 'Post (Private)') : 'Save Changes';
  const bottom = bottomPadding - 10;
  return (
    <Button
      style={{bottom, right: 0, left: 0, position: 'absolute', borderRadius: 0, padding: 0, margin: 0}}
      buttonStyle={{padding: 0, margin: 0}}
      isLoading={isLoading}
      isDisabled={!isEnabled}
      onPress={save}
    >
      {buttonText}
    </Button>
  );
});

export default BotCompose;

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
