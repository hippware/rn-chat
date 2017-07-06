// @flow

import React from 'react';
import {View, Alert, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView} from 'react-native';

import {k, width} from './Global';
import {colors} from '../constants';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {when} from 'mobx';
import Card from './Card';
import Cell from './Cell';
import location from '../store/locationStore';
import {LOCATION} from '../model/Bot';
import statem from '../../gen/state';
import botFactory from '../factory/botFactory';
import bot from '../store/botStore';
import SaveButton from './SaveButton';
import Screen from './Screen';
import {Actions} from 'react-native-router-native';
import VisibilitySwitch from './BotVisibilitySwitch';
import BotInfoEditMenu from './BotInfoEditMenu';
import Button from './Button';
import {showImagePicker} from './ImagePicker';
import * as log from '../utils/log';

const TRANS_WHITE = colors.addAlpha(colors.WHITE, 0.75);

type Props = {
  item: number,
  edit?: boolean
};

type State = {
  isFirstScreen: boolean,
  isLoading?: boolean
};

@autobind
@observer
export default class LocationBot extends React.Component {
  props: Props;
  state: State;

  latitude: null;
  longitude: null;

  constructor(props: Props) {
    super(props);
    this.state = {
      isFirstScreen: false,
    };
  }

  next() {
    if (bot.bot.title.length > 0) {
      if (this.state.isFirstScreen) {
        this.setState({isFirstScreen: false});
      }
      this.refs.title.blur();
    }
  }

  componentWillMount() {
    if (this.props.item) {
      bot.bot = botFactory.create({id: this.props.item});
    }
    if (!bot.bot) {
      bot.create({type: LOCATION});

      when(
        () => location.location,
        () => {
          bot.location = location.location;
        }
      );
    } else {
      if (bot.bot.location) {
        this.latitude = bot.bot.location.latitude;
        this.longitude = bot.bot.location.longitude;
      }
    }
    if (bot.bot.isNew) {
      this.setState({isFirstScreen: true});
    }
  }

  removeBot() {
    Alert.alert(null, 'Are you sure you want to delete this bot?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          bot.remove(bot.bot.id, bot.bot.server);
          Actions.pop();
          Actions.pop({animated: false});
        },
      },
    ]);
  }

  async save() {
    if (!bot.bot.title) {
      Alert.alert('Title cannot be empty');
      this.refs.title.focus();
      return;
    }
    try {
      this.setState({isLoading: true});

      const isNew = bot.bot.isNew;
      await bot.save();

      if (isNew) {
        Actions.pop({animated: false});
        Actions.pop();
        setTimeout(() => statem.botsScene.botDetails({item: bot.bot.id, isNew: true}));
      } else {
        Actions.pop();
      }
    } catch (e) {
      alert(e);
    } finally {
      this.setState({isLoading: false});
    }
  }

  onCoverPhoto(): void {
    if (!this.state.isFirstScreen) {
      showImagePicker('Image Picker', (source, response) => {
        bot.setCoverPhoto({source, ...response});
      });
    }
  }

  renderCard = () => {
    const {edit} = this.props;
    const address = `${bot.bot.isCurrent ? 'Current - ' : ''}${bot.bot.address}`;
    const titleColor = {color: location.isDay ? colors.navBarTextColorDay : colors.navBarTextColorNight};
    return (
      <KeyboardAvoidingView behavior='position'>
        <Card isDay={location.isDay} style={{paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0}}>
          <Cell
              style={{padding: 10 * k}}
              image={require('../../images/iconBotName.png')}
              imageStyle={{paddingLeft: 14 * k}}
              textStyle={{fontFamily: 'Roboto-Light'}}
              onRemove={() => (bot.bot.title = '')}
          >
            <View style={styles.textWrapper}>
              <TextInput
                  autoFocus={!edit}
                  placeholder='Name your bot'
                  ref='title'
                  placeholderTextColor={colors.GREY}
                  value={bot.bot.title}
                  onChangeText={text => (bot.bot.title = text)}
                  returnKeyType={this.state.isFirstScreen ? 'next' : 'done'}
                  onSubmitEditing={this.next}
                  blurOnSubmit={false}
                  maxLength={60}
                  style={[styles.titleInput, titleColor]}
              />
            </View>
          </Cell>
          <View>
            <Cell
                imageStyle={{paddingLeft: 8 * k}}
                onPress={() => statem.handle('setAddress', {bot: bot.bot})}
                image={require('../../images/iconBotLocation.png')}
            >
              {address}
            </Cell>
          </View>
        </Card>
      </KeyboardAvoidingView>
    );
  };

  renderCreateSaveButton = (isEnabled: boolean) => (
    <Button
        style={{bottom: 0, right: 0, left: 0, position: 'absolute', borderRadius: 0}}
        isLoading={this.state.isLoading}
        isDisabled={!isEnabled}
        onPress={this.save}
    >
      {bot.bot.isNew ? 'Create Bot' : 'Save Changes'}
    </Button>
  );

  renderCancelDelete = () => (
    <View>
      <BotInfoEditMenu bot={bot.bot} />
      <VisibilitySwitch bot={bot.bot} />
      <View style={{height: 100}}>
        {bot.bot.isNew &&
          <Button
              onPress={() => {
                Actions.pop({animated: false});
                Actions.pop();
              }}
              textStyle={{color: colors.PINK}}
              style={styles.crud}
          >
            Cancel Bot
          </Button>}
        {!bot.bot.isNew &&
          <Button onPress={this.removeBot} textStyle={{color: colors.PINK}} style={styles.crud}>
            Delete Bot
          </Button>}
      </View>
    </View>
  );

  renderAddCoverPhoto = () => {
    const {isFirstScreen} = this.state;
    const addCoverColor = {color: isFirstScreen ? colors.GREY : 'white'};
    const imgSource = isFirstScreen ? require('../../images/attachPhotoGray.png') : require('../../images/iconAddcover.png');
    return (
      <TouchableOpacity onPress={this.onCoverPhoto} style={{alignItems: 'center'}}>
        <Image source={imgSource} />
        <Text style={[styles.textAddCover, addCoverColor]}>
          Add Cover Photo
        </Text>
      </TouchableOpacity>
    );
  };

  renderChangePhoto = () => (
    <View style={{height: width}}>
      <Image style={{width, height: width}} resizeMode='contain' source={bot.bot.image && bot.bot.image.source} />
      <TouchableOpacity onPress={this.onCoverPhoto} style={styles.changePhotoButton}>
        <Text style={styles.changePhotoText}>
          CHANGE PHOTO
        </Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const {isFirstScreen} = this.state;
    if (!bot.bot) {
      log.log('NO BOT IS DEFINED', {level: log.levels.ERROR});
      return <Screen isDay={location.isDay} />;
    }
    const isEnabled = bot.bot.title.length > 0 && bot.bot.location && bot.bot.address;
    const backgroundColor = {backgroundColor: isFirstScreen ? colors.LIGHT_GREY : colors.LIGHT_BLUE};

    return (
      <Screen isDay={location.isDay}>
        <ScrollView keyboardShouldPersistTaps='always'>
          {!!(bot.bot.image && bot.bot.image.source)
            ? this.renderChangePhoto()
            : <View style={[styles.imageContainer, backgroundColor]}>
                {!isFirstScreen && this.renderAddCoverPhoto()}
              </View>}

          {this.renderCard()}
          {!isFirstScreen && this.renderCancelDelete()}
        </ScrollView>
        {isFirstScreen ? <SaveButton title='Next' active={isEnabled} onSave={this.next} /> : this.renderCreateSaveButton(isEnabled)}
      </Screen>
    );
  }
}

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
  changePhotoText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 11 * k,
    color: colors.DARK_PURPLE,
    letterSpacing: 0.5,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10 * k,
    alignItems: 'center',
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
  textAddCover: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  titleInput: {
    height: 25 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});
