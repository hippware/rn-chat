// @flow

import React from 'react';
import {Alert, Keyboard, TouchableOpacity, Image} from 'react-native';
import {observer, inject, Provider} from 'mobx-react/native';
import {observable} from 'mobx';
import {isAlive} from 'mobx-state-tree';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {k} from '../Global';
import {colors} from '../../constants';
import Screen from '../Screen';
import Button from '../Button';
import {Spinner} from '../common';
import EditControls from './EditControls';
import ComposeCard from './ComposeCard';
import BotComposeMap from './BotComposeMap';
import {settings} from '../../globals';

type Props = {
  botId: string,
  edit?: boolean,
  titleBlurred?: boolean,
};

@inject('wocky', 'notificationStore', 'analytics', 'log')
@observer
class BotCompose extends React.Component<Props> {
  botTitle: ?Object;
  @observable keyboardHeight: number = 0;
  @observable isLoading: boolean = false;
  controls: any;
  @observable bot: Bot;

  static leftButton = ({edit}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (edit) {
            Alert.alert('Unsaved Changes', 'Are you sure you want to discard the changes?', [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Discard',
                style: 'destructive',
                onPress: () => {
                  // TODO: undo on BotCompose
                  // botStore.bot.load(oldBot);
                  Actions.pop();
                },
              },
            ]);
          } else {
            Actions.pop();
          }
        }}
        style={{marginLeft: 10 * k}}
      >
        <Image source={require('../../../images/iconBackGrayNew.png')} style={{tintColor: settings.isStaging ? 'rgb(28,247,39)' : 'rgb(117,117,117)'}} />
      </TouchableOpacity>
    );
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    if (this.props.botId) {
      this.bot = this.props.wocky.getBot({id: this.props.botId});
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = ({endCoordinates, startCoordinates}) => {
    setTimeout(() => (this.keyboardHeight = startCoordinates.screenY - endCoordinates.screenY));
  };

  _keyboardDidHide = () => {
    this.keyboardHeight = 0;
  };

  save = async () => {
    const {bot} = this;
    if (!bot.title) {
      // TODO: slide-down notification
      Alert.alert('Title cannot be empty');
      this.botTitle && this.botTitle.focus();
      return;
    }
    try {
      this.isLoading = true;
      const {isNew, geofence} = bot;
      await bot.save();
      if (isNew) {
        Actions.pop({animated: false});
        Actions.pop();
        setTimeout(() => {
          if (geofence) Actions.geofenceShare({botId: bot.id});
          else Actions.botDetails({item: bot.id, isNew: true});
        });
      } else {
        Actions.pop();
      }
      this.props.analytics.track('botcreate_complete', this.bot.toJSON());
    } catch (e) {
      this.props.notificationStore.flash('Something went wrong, please try again.');
      this.props.analytics.track('botcreate_fail', {bot: this.bot.toJSON(), error: e});
      this.props.log('BotCompose save problem', e);
    } finally {
      this.isLoading = false;
    }
  };

  scrollToNote = () => {
    if (this.bot.description === '') this.controls.focus();
  };

  render() {
    const {edit, titleBlurred} = this.props;
    const {bot} = this;
    if (!bot || !isAlive(bot)) {
      this.props.log('NO BOT IS DEFINED');
      return <Screen />;
    }
    const isEnabled = bot.title && bot.title.trim().length > 0 && bot.location && bot.address;

    return (
      <Provider bot={bot}>
        <Screen>
          <KeyboardAwareScrollView style={{marginBottom: 50 * k}}>
            <BotComposeMap afterPhotoPost={this.scrollToNote} />
            <ComposeCard edit={edit} titleBlurred={titleBlurred} />
            <EditControls ref={r => (this.controls = r)} />
          </KeyboardAwareScrollView>
          <CreateSaveButton bot={bot} isLoading={this.isLoading} isEnabled={isEnabled} onSave={this.save} bottomPadding={bot.title !== '' ? this.keyboardHeight : 0} />
        </Screen>
      </Provider>
    );
  }
}

const CreateSaveButton = observer(({bot, isEnabled, isLoading, onSave, bottomPadding}) => {
  if (!bot || !isAlive(bot)) return null;
  const buttonText = bot.isNew ? (bot.isPublic ? 'Post' : 'Post (Private)') : 'Save Changes';
  return (
    <Button
      style={{bottom: bottomPadding - 10, right: 0, left: 0, position: 'absolute', borderRadius: 0, padding: 0, margin: 0}}
      buttonStyle={{padding: 0, margin: 0}}
      isDisabled={!isEnabled}
      onPress={onSave}
    >
      {isLoading ? <Spinner color='white' size={22} /> : buttonText}
    </Button>
  );
});

export default BotCompose;
