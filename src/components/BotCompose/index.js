// @flow

import React from 'react';
import {View, Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import {when, toJS} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {k, width} from '../Global';
import {colors} from '../../constants';
import locationStore from '../../store/locationStore';
import {LOCATION} from '../../model/Bot';
import botFactory from '../../factory/botFactory';
import botStore from '../../store/botStore';
import Screen from '../Screen';
import Button from '../Button';
import {showImagePicker} from '../ImagePicker';
import * as log from '../../utils/log';
import {RText} from '../common';
import EditControls from './EditControls';
import ComposeCard from './ComposeCard';
import analyticsStore from '../../store/analyticsStore';

const TRANS_WHITE = colors.addAlpha(colors.WHITE, 0.75);

type Props = {
  isFirstScreen?: boolean,
  item?: number,
  edit?: boolean,
  titleBlurred?: boolean,
};

type State = {
  isLoading?: boolean,
};

@observer
class BotCompose extends React.Component {
  props: Props;
  state: State;

  latitude: null;
  longitude: null;
  botTitle: ?Object;

  static onRight = ({isFirstScreen}) => {
    const {title, location, address} = botStore.bot;
    if (title.trim().length && location && address) {
      if (isFirstScreen) {
        Actions.refresh({isFirstScreen: false, titleBlurred: true});
      }
    }
  };

  static rightTitle = ({isFirstScreen}) => {
    return isFirstScreen ? 'Next' : null;
  };

  static rightButtonTintColor = () => (botStore.bot.title.trim().length && botStore.bot.location && botStore.bot.address && colors.PINK) || colors.DARK_GREY;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.item) {
      botStore.bot = botFactory.create({id: this.props.item});
    }
    if (!botStore.bot) {
      botStore.create({type: LOCATION});

      when(
        () => locationStore.location,
        () => {
          botStore.location = locationStore.location;
        },
      );
    } else if (botStore.bot.location) {
      this.latitude = botStore.bot.location.latitude;
      this.longitude = botStore.bot.location.longitude;
    }
  }

  componentWillReceiveProps(props: Props) {
    if (!props.isFirstScreen && this.props.isFirstScreen) {
      analyticsStore.track('botcreate_namebot', toJS(botStore.bot));
    }
  }

  save = async () => {
    if (!botStore.bot.title) {
      Alert.alert('Title cannot be empty');
      this.botTitle && this.botTitle.focus();
      return;
    }
    try {
      this.setState({isLoading: true});

      const isNew = botStore.bot.isNew;
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
      this.setState({isLoading: false});
    }
  };

  onCoverPhoto = (): void => {
    if (!this.props.isFirstScreen) {
      showImagePicker('Image Picker', (source, response) => {
        botStore.setCoverPhoto({source, ...response});
      });
    }
  };

  render() {
    const {isFirstScreen, edit, titleBlurred} = this.props;
    if (!botStore.bot) {
      log.log('NO BOT IS DEFINED', {level: log.levels.ERROR});
      return <Screen isDay={locationStore.isDay} />;
    }
    const isEnabled = botStore.bot.title.length > 0 && botStore.bot.location && botStore.bot.address;

    return (
      <Screen isDay={locationStore.isDay}>
        <KeyboardAwareScrollView style={{marginBottom: isFirstScreen ? 0 : 50 * k}}>
          <PhotoArea onCoverPhoto={this.onCoverPhoto} isFirstScreen={isFirstScreen} />
          <ComposeCard isFirstScreen={isFirstScreen} edit={edit} titleBlurred={titleBlurred} />
          {!isFirstScreen && <EditControls />}
        </KeyboardAwareScrollView>
        {!isFirstScreen && <CreateSaveButton isLoading={this.state.isLoading} isEnabled={isEnabled} onSave={this.save} />}
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

const CreateSaveButton = observer(({isEnabled, isLoading, onSave}) => (
  <Button
    style={{bottom: -10, right: 0, left: 0, position: 'absolute', borderRadius: 0, padding: 0, margin: 0}}
    buttonStyle={{padding: 0, margin: 0}}
    isLoading={isLoading}
    isDisabled={!isEnabled}
    onPress={onSave}
  >
    {botStore.bot.isNew ? 'Post' : 'Save Changes'}
  </Button>
));

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
