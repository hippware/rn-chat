// @flow

import React from 'react';
import {Alert} from 'react-native';
import {observer} from 'mobx-react/native';
import {toJS, observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {k} from '../Global';
import {colors} from '../../constants';
import locationStore from '../../store/locationStore';
import {LOCATION} from '../../model/Bot';
import botFactory from '../../factory/botFactory';
import botStore from '../../store/botStore';
import Screen from '../Screen';
import Button from '../Button';
import * as log from '../../utils/log';
import {Spinner} from '../common';
import EditControls from './EditControls';
import ComposeCard from './ComposeCard';
import analyticsStore from '../../store/analyticsStore';
import PhotoArea from './BotComposePhoto';

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
class BotCompose extends React.Component<Props, State> {
  latitude: null;
  longitude: null;
  botTitle: ?Object;
  @observable keyboardHeight: number = 0;

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
      log.log('BotCompose save problem', e);
    } finally {
      this.setState({isLoading: false});
    }
  };

  setKeyboardHeight = (frames) => {
    // TODO: more elegant solution...maybe animate the save button position instead of a hard switch?
    setTimeout(() => (this.keyboardHeight = frames.endCoordinates.height), frames.duration);
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
        <KeyboardAwareScrollView
          style={{marginBottom: isFirstScreen ? 0 : 50 * k}}
          onKeyboardWillShow={this.setKeyboardHeight}
          onKeyboardWillHide={() => (this.keyboardHeight = 0)}
        >
          <PhotoArea isFirstScreen={isFirstScreen} />
          <ComposeCard isFirstScreen={isFirstScreen} edit={edit} titleBlurred={titleBlurred} />
          {!isFirstScreen && <EditControls />}
        </KeyboardAwareScrollView>
        {!isFirstScreen && <CreateSaveButton isLoading={this.state.isLoading} isEnabled={isEnabled} onSave={this.save} bottomPadding={this.keyboardHeight} />}
      </Screen>
    );
  }
}

const CreateSaveButton = observer(({isEnabled, isLoading, onSave, bottomPadding}) => {
  const {bot} = botStore;
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
