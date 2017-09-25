// @flow

import React from 'react';
import {View, Alert, Image, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {observer} from 'mobx-react/native';
import {when} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {k, width} from './Global';
import {colors} from '../constants';
import Cell from './Cell';
import location from '../store/locationStore';
import {LOCATION} from '../model/Bot';
import botFactory from '../factory/botFactory';
import botStore from '../store/botStore';
import Screen from './Screen';
import VisibilitySwitch from './BotVisibilitySwitch';
import Button from './Button';
import {showImagePicker} from './ImagePicker';
import * as log from '../utils/log';
import {RText} from './common';

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

class LocationBot extends React.Component {
  props: Props;
  state: State;

  latitude: null;
  longitude: null;
  botTitle: ?Object;

  static onRight = ({isFirstScreen}) => {
    const {title, location: loc, address} = bot.bot;
    if (title.trim().length && loc && address) {
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
        () => location.location,
        () => {
          botStore.location = location.location;
        },
      );
    } else if (botStore.bot.location) {
      this.latitude = botStore.bot.location.latitude;
      this.longitude = botStore.bot.location.longitude;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.titleBlurred) {
      this.botTitle.blur();
    }
  }

  removeBot = () => {
    Alert.alert(null, 'Are you sure you want to delete this bot?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          botStore.remove(botStore.bot.id, botStore.bot.server);
          Actions.pop();
          Actions.pop({animated: false});
        },
      },
    ]);
  };

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
      alert('There was a problem saving your bot');
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

  next = () => {
    if (this.props.isFirstScreen && botStore.bot.title.trim().length) {
      Actions.refresh({isFirstScreen: false});
    }
    this.botTitle && this.botTitle.blur();
  };

  renderCard = () => {
    const {edit} = this.props;
    const address = `${botStore.bot.isCurrent ? 'Current - ' : ''}${botStore.bot.address}`;
    const titleColor = {color: location.isDay ? colors.navBarTextColorDay : colors.navBarTextColorNight};
    return (
      <View style={{backgroundColor: colors.WHITE}}>
        <Cell
          style={[{padding: 10 * k}, styles.separator]}
          image={require('../../images/faceless.png')}
          imageStyle={{paddingLeft: 14 * k}}
          textStyle={{fontFamily: 'Roboto-Light'}}
          onRemove={() => (botStore.bot.title = '')}
        >
          <View style={styles.textWrapper}>
            <TextInput
              autoFocus={!edit}
              placeholder='Name your bot'
              ref={t => (this.botTitle = t)}
              placeholderTextColor={colors.GREY}
              value={botStore.bot.title}
              onChangeText={text => (botStore.bot.title = text)}
              returnKeyType={this.props.isFirstScreen ? 'next' : 'done'}
              onSubmitEditing={this.next}
              blurOnSubmit={false}
              maxLength={60}
              style={[styles.titleInput, titleColor]}
            />
          </View>
        </Cell>
        <Cell
          imageStyle={{paddingLeft: 8 * k}}
          style={styles.separator}
          onPress={() => Actions.botAddress({bot: botStore.bot})}
          image={require('../../images/iconBotLocationPink.png')}
        >
          {address}
        </Cell>
      </View>
    );
  };

  renderEditControls = () => (
    <View>
      <View style={[{backgroundColor: colors.WHITE}, styles.separator]}>
        <VisibilitySwitch bot={botStore.bot} />
        <Cell imageStyle={{paddingLeft: 10 * k, paddingTop: 7 * k, alignSelf: 'flex-start'}} style={styles.separator} image={require('../../images/botNotePink.png')}>
          <TextInput
            multiline
            style={{height: 200 * k, flex: 1, fontFamily: 'Roboto-Regular', fontSize: 15}}
            placeholder="What's cool about this place?"
            onChangeText={text => (botStore.bot.description = text)}
            value={botStore.bot.description}
            maxLength={1500}
          />
        </Cell>
      </View>
      {botStore.bot.isNew ? (
        <Button
          onPress={() => {
            Actions.pop({animated: false});
            Actions.pop();
          }}
          textStyle={{color: colors.PINK}}
          style={styles.crud}
        >
          Cancel Bot
        </Button>
      ) : (
        <Button onPress={this.removeBot} textStyle={{color: colors.PINK}} style={styles.crud}>
          Delete Bot
        </Button>
      )}
    </View>
  );

  renderAddCoverPhoto = () => {
    const {isFirstScreen} = this.props;
    const imgSource = isFirstScreen ? require('../../images/attachPhotoGray.png') : require('../../images/iconAddcover.png');
    return (
      <TouchableOpacity onPress={this.onCoverPhoto} style={{alignItems: 'center'}}>
        <Image source={imgSource} />
        <RText size={14} color={isFirstScreen ? colors.GREY : colors.WHITE}>
          Add Cover Photo
        </RText>
      </TouchableOpacity>
    );
  };

  renderChangePhoto = () => (
    <View style={{height: width}}>
      <Image style={{width, height: width}} resizeMode='contain' source={botStore.bot.image && botStore.bot.image.source} />
      <TouchableOpacity onPress={this.onCoverPhoto} style={styles.changePhotoButton}>
        <RText size={11} weight='Medium' color={colors.DARK_PURPLE} style={{letterSpacing: 0.5}}>
          CHANGE PHOTO
        </RText>
      </TouchableOpacity>
    </View>
  );

  renderCreateSaveButton = (isEnabled: boolean) => (
    <Button
      style={{bottom: -10, right: 0, left: 0, position: 'absolute', borderRadius: 0, padding: 0, margin: 0}}
      buttonStyle={{padding: 0, margin: 0}}
      isLoading={this.state.isLoading}
      isDisabled={!isEnabled}
      onPress={this.save}
    >
      {botStore.bot.isNew ? 'Post' : 'Save Changes'}
    </Button>
  );

  render() {
    const {isFirstScreen} = this.props;
    if (!botStore.bot) {
      log.log('NO BOT IS DEFINED', {level: log.levels.ERROR});
      return <Screen isDay={location.isDay} />;
    }
    const isEnabled = botStore.bot.title.length > 0 && botStore.bot.location && botStore.bot.address;
    const backgroundColor = {backgroundColor: isFirstScreen ? colors.LIGHT_GREY : colors.LIGHT_BLUE};

    return (
      <Screen isDay={location.isDay}>
        <KeyboardAwareScrollView style={{marginBottom: isFirstScreen ? 0 : 50 * k}}>
          {botStore.bot.image && botStore.bot.image.source ? (
            this.renderChangePhoto()
          ) : (
            <View style={[styles.imageContainer, backgroundColor]}>{!isFirstScreen && this.renderAddCoverPhoto()}</View>
          )}

          {this.renderCard()}
          {!isFirstScreen && this.renderEditControls()}
        </KeyboardAwareScrollView>
        {!isFirstScreen && this.renderCreateSaveButton(isEnabled)}
      </Screen>
    );
  }
}

export default observer(LocationBot);

const styles = StyleSheet.create({
  card: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: colors.WARM_GREY,
  },
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
  textWrapper: {
    flex: 1,
    paddingRight: 10 * k,
    justifyContent: 'center',
  },
  crud: {
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 0,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  titleInput: {
    height: 25 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});
