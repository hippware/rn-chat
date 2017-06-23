// @flow

import React from 'react';
import {View, Clipboard, Text, Animated, Alert, TouchableOpacity, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import Screen from './Screen';
import botFactory from '../factory/botFactory';
import {k, height, width, defaultCover} from '../globals';
import Avatar from './Avatar';
import {observer} from 'mobx-react/native';
import botStore from '../store/botStore';
import location from '../store/locationStore';
import autobind from 'autobind-decorator';
import statem from '../../gen/state';
import PhotoGrid from './PhotoGrid';
import model from '../model/model';
import {when} from 'mobx';
import BotNavBar from './BotNavBar';
import Popover from 'react-native-popover';
import ScrollViewWithImages from './ScrollViewWithImages';
import {colors} from '../constants';
const DOUBLE_PRESS_DELAY = 300;

const EditButton = ({isOwn, bot, style}) => {
  return (
    isOwn &&
    <TouchableOpacity
        onPress={() =>
        statem.logged.botEdit({
          item: bot.id,
        })}
        style={style}
    >
      <Text style={styles.editButtonText}>
        EDIT
      </Text>
    </TouchableOpacity>
  );
};

const MainImage = ({source, bot, handleImagePress, style}) => (
  <TouchableWithoutFeedback onPress={handleImagePress}>
    {source
      ? <Image style={style} resizeMode='cover' source={source} />
      : <Image style={style} source={defaultCover[bot.coverColor % 4]} resizeMode='cover' />}
  </TouchableWithoutFeedback>
);

const UserInfoRow = observer(({showPopover}) => {
  const {bot} = botStore;
  const profile = bot.owner;
  return (
    <View style={styles.userInfoRow}>
      <View style={{paddingRight: 11 * k}}>
        <Avatar size={36} profile={profile} isDay={location.isDay} borderWidth={0} />
      </View>
      <TouchableOpacity onPress={() => statem.logged.profileDetails({item: profile.user})} style={{flex: 1}}>
        <Text style={styles.handleText}>
          @{profile.handle}
        </Text>
      </TouchableOpacity>
      {location.location &&
        bot.location &&
        <View>
          <Image source={require('../../images/buttonViewMapBG.png')} />
          <TouchableOpacity onLongPress={showPopover} ref='button' onPress={statem.botDetails.map} style={styles.botLocationButton}>
            <View style={{paddingRight: 5}}>
              <Image source={require('../../images/iconBotLocation.png')} />
            </View>
            <Text style={styles.distanceText}>
              {location.distanceToString(
                location.distance(location.location.latitude, location.location.longitude, bot.location.latitude, bot.location.longitude)
              )}
            </Text>
          </TouchableOpacity>
        </View>}
    </View>
  );
});

const AddBot = observer(({subscribe, unsubscribe}) => {
  let onPress, buttonStyle, image, text, textStyle;
  if (botStore.bot.isSubscribed) {
    onPress = unsubscribe;
    buttonStyle = [styles.addBotButton, {backgroundColor: colors.WHITE}];
    image = require('../../images/iconCheckBotAdded.png');
    text = 'SAVED';
    textStyle = [styles.addBotText, {color: colors.PINK}];
  } else {
    onPress = subscribe;
    buttonStyle = styles.addBotButton;
    image = require('../../images/saveIcon.png');
    text = 'SAVE';
    textStyle = styles.addBotText;
  }
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Image source={image} style={styles.addBotIcon} resizeMode='contain' />
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
});

type Props = {
  // fullMap: boolean,
  item: string,
  isNew: boolean
};

type State = {
  // top: any,
  // fullMap: boolean,
  fadeAnim: any,
  showNavBar: true,
  navBarHeight: any,
  currentScreenWidth?: number,
  currentScreenHeight?: number,
  isVisible?: boolean,
  buttonRect?: Object
};

@autobind
@observer
export default class extends React.Component {
  props: Props;
  state: State;
  loading: boolean;
  lastImagePress: ?number;

  constructor(props: Props) {
    super(props);
    this.loading = false;
    this.state = {
      // top: new Animated.Value(this.props.fullMap ? height : 0),
      // fullMap: !!this.props.fullMap,
      fadeAnim: new Animated.Value(0),
      showNavBar: true,
      navBarHeight: new Animated.Value(70),
    };
  }

  async loadMoreImages() {
    if (botStore.bot && botStore.bot.imagesCount && botStore.bot._images.length && botStore.bot.imagesCount > botStore.bot._images.length) {
      if (!this.loading) {
        this.loading = true;
        await botStore.loadImages(botStore.bot._images[botStore.bot._images.length - 1].item);
        this.loading = false;
      }
    }
  }

  componentWillMount() {
    if (this.props.item && !this.props.isNew) {
      botStore.bot = botFactory.create({id: this.props.item});
      when(() => model.connected, botStore.load);
    }
  }

  // onLayout(event: Object) {
  //   var layout = event.nativeEvent.layout;
  //   this.setState({
  //     currentScreenWidth: layout.width,
  //     currentScreenHeight: layout.height,
  //   });
  // }

  unsubscribe() {
    Alert.alert(null, 'Are you sure you want to unsubscribe?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unsubscribe',
        style: 'destructive',
        onPress: () => botStore.unsubscribe(),
      },
    ]);
  }

  subscribe() {
    botStore.subscribe();
    // do animation
    this.setState({fadeAnim: new Animated.Value(1)});
    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {toValue: 0}).start();
    }, 500);
  }

  handleImagePress(e: Object) {
    const now = new Date().getTime();

    if (this.lastImagePress && now - this.lastImagePress < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      this.handleImageDoublePress(e);
    } else {
      this.lastImagePress = now;
    }
  }

  handleImageDoublePress() {
    const bot = botStore.bot;
    if (!bot.isSubscribed) {
      this.subscribe();
    }
  }

  showPopover() {
    Clipboard.setString(botStore.bot.address);
    this.refs.button.measure((ox, oy, w, h, px, py) => {
      this.setState({
        isVisible: true,
        buttonRect: {x: px, y: py, width: w, height: h},
      });
    });
    setTimeout(this.closePopover, 2000);
  }

  closePopover() {
    this.setState({isVisible: false});
  }

  render() {
    const {bot} = botStore;
    if (!bot) {
      console.warn('ERROR: No bot defined', this.props.item);
      return <Screen />;
    }
    const isOwn = !bot.owner || bot.owner.isOwn;
    const profile = bot.owner;
    if (!profile) {
      console.warn('ERROR: NO BOT PROFILE!');
      return <Screen />;
    }

    const theImage = bot.image && bot.image.source
      ? <Image style={{height: width}} resizeMode='cover' source={bot.image.source} />
      : <Image style={{height: width}} source={defaultCover[bot.coverColor % 4]} resizeMode='cover' />;

    const botDescription =
      !!bot.description &&
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={0} style={styles.descriptionText}>
          {bot.description}
        </Text>
      </View>;

    const attachPhotos =
      !isOwn &&
      !bot.imagesCount &&
      <View style={styles.attachPhoto}>
        <Image source={require('../../images/attachPhotoGray.png')} />
        <Text style={styles.noPhotosAdded}>
          No photos added
        </Text>
      </View>;

    const showNoMore =
      this.state.showNoMoreImages &&
      <View style={styles.showNoMore}>
        <Image source={require('../../images/graphicEndPhotos.png')} />
      </View>;

    return (
      <View style={styles.container}>
        <ScrollViewWithImages ref='scrollView' contentContainerStyle={{paddingTop: 70 * k}} style={{flex: 1}}>
          <View style={{height: width}}>
            <TouchableWithoutFeedback onPress={this.handleImagePress}>
              {theImage}
            </TouchableWithoutFeedback>
            <EditButton isOwn={isOwn} bot={bot} style={styles.editButton} />
            <Animated.View pointerEvents='none' style={[{opacity: this.state.fadeAnim}, styles.botAddedContainer]}>
              <Image source={require('../../images/iconBotAdded.png')} />
            </Animated.View>
          </View>
          {!isOwn && <AddBot subscribe={this.subscribe} unsubscribe={this.unsubscribe} />}
          <UserInfoRow profile={profile} bot={bot} showPopover={this.showPopover} />
          {botDescription}
          {attachPhotos}
          <PhotoGrid
              isOwn={isOwn}
              images={bot.thumbnails}
              onAdd={statem.botDetails.addPhoto}
              onView={index => statem.botDetails.editPhotos({index})}
          />
          {showNoMore}
        </ScrollViewWithImages>
        <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            contentStyle={{backgroundColor: colors.DARK_PURPLE}}
            placement='bottom'
            onClose={this.closePopover}
        >
          <Text style={styles.popoverText}>
            Address copied to clipboard
          </Text>
        </Popover>
        {this.state.showNavBar && <BotNavBar bot={bot} onPress={this.refs.scrollView && this.refs.scrollView.scrollToTop} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: location.isDay ? colors.WHITE : 'rgba(49,37,62,0.90)',
  },
  editButton: {
    borderRadius: 2,
    backgroundColor: colors.addAlpha(colors.WHITE, 0.75),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20 * k,
    width: 62 * k,
    right: 20 * k,
    height: 30 * k,
  },
  editButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 11 * k,
    color: colors.PURPLE,
    letterSpacing: 0.5,
  },
  addBotButton: {
    flexDirection: 'row',
    height: 40 * k,
    marginTop: -20 * k,
    width: 150 * k,
    alignSelf: 'center',
    backgroundColor: colors.PINK,
    borderRadius: 5 * k,
    borderColor: colors.PINK,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBotText: {
    fontSize: 15,
    letterSpacing: 0.5,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    marginLeft: 2 * k,
  },
  addBotIcon: {padding: 10 * k, width: 20 * k, height: 20 * k},
  popoverText: {
    fontFamily: 'Roboto-Regular',
    color: 'white',
    fontSize: 14 * k,
  },
  showNoMore: {
    paddingTop: 10,
    alignItems: 'center',
    paddingBottom: 21,
  },
  noPhotosAdded: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    // @TODO: #683. standardize. this is between GREY and LIGHT_GREY
    color: 'rgb(186,186,186)',
  },
  attachPhoto: {
    height: 201 * k,
    backgroundColor: colors.LIGHT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botLocationButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  descriptionContainer: {
    paddingLeft: 20 * k,
    paddingRight: 20 * k,
    paddingBottom: 15 * k,
  },
  descriptionText: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    color: location.isDay ? colors.DARK_PURPLE : colors.WHITE,
  },
  botAddedContainer: {
    height: width,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: colors.DARK_PURPLE,
  },
  handleText: {
    fontFamily: 'Roboto-Italic',
    fontSize: 13,
    letterSpacing: -0.1,
    color: colors.PURPLISH_GREY,
  },
  userInfoRow: {
    paddingTop: 15 * k,
    paddingBottom: 15 * k,
    paddingLeft: 20 * k,
    paddingRight: 20 * k,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
