// @flow

import React from 'react';
import {Alert, TouchableOpacity, Image} from 'react-native';
import {observer, inject, Provider} from 'mobx-react/native';
import {observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {k} from '../Global';
import {colors} from '../../constants';
import Screen from '../Screen';
import Button from '../Button';
import * as log from '../../utils/log';
import {Spinner} from '../common';
import EditControls from './EditControls';
import ComposeCard from './ComposeCard';
import PhotoArea from './BotComposePhoto';
import {settings} from '../../globals';

type Props = {
  botId: string,
  edit?: boolean,
  titleBlurred?: boolean,
};

@inject('wocky')
@observer
class BotCompose extends React.Component<Props> {
  botTitle: ?Object;
  @observable keyboardHeight: number = 0;
  @observable isLoading: boolean = false;
  controls: any;
  @observable bot: Bot;

  // TODO: undo on BotCreate
  // static leftButton = ({edit}) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         if (edit) {
  //           Alert.alert('Unsaved Changes', 'Are you sure you want to discard the changes?', [
  //             {text: 'Cancel', style: 'cancel'},
  //             {
  //               text: 'Discard',
  //               style: 'destructive',
  //               onPress: () => {
  //                 botStore.bot.load(oldBot);
  //                 Actions.pop();
  //               },
  //             },
  //           ]);
  //         } else {
  //           Actions.pop();
  //         }
  //       }}
  //       style={{marginLeft: 10 * k}}
  //     >
  //       <Image source={require('../../../images/iconBackGrayNew.png')} style={{tintColor: settings.isStaging ? 'rgb(28,247,39)' : 'rgb(117,117,117)'}} />
  //     </TouchableOpacity>
  //   );
  // };

  componentWillMount() {
    if (this.props.botId) {
      this.bot = this.props.wocky.getBot({id: this.props.botId});
    }
  }

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
      const {isNew} = bot;
      await bot.save();
      if (isNew) {
        Actions.pop({animated: false});
        Actions.pop();
        setTimeout(() => Actions.botDetails({item: bot.id, isNew: true}));
      } else {
        Actions.pop();
      }
    } catch (e) {
      // TODO: notificationStore.flash('Something went wrong, please try again.');
      alert('Something went wrong, please try again.');
      log.log('BotCompose save problem', e);
    } finally {
      this.isLoading = false;
    }
  };

  setKeyboardHeight = (frames) => {
    // TODO: more elegant solution...maybe animate the save button position instead of a hard switch?
    setTimeout(() => (this.keyboardHeight = frames.endCoordinates.height), frames.duration);
  };

  scrollToNote = () => {
    if (this.bot.description === '') this.controls.focus();
  };

  render() {
    const {edit, titleBlurred} = this.props;
    const {bot} = this;
    if (!bot) {
      log.log('NO BOT IS DEFINED', {level: log.levels.ERROR});
      return <Screen />;
    }
    const isEnabled = bot.title && bot.title.length > 0 && bot.location && bot.address;

    return (
      <Provider bot={bot}>
        <Screen>
          <KeyboardAwareScrollView style={{marginBottom: 50 * k}} onKeyboardWillShow={this.setKeyboardHeight} onKeyboardWillHide={() => (this.keyboardHeight = 0)}>
            <PhotoArea afterPhotoPost={this.scrollToNote} />
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
