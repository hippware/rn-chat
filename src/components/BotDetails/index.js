// @flow

import React from 'react';
import {View, Text, Animated, Alert, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import Screen from '../Screen';
import botFactory from '../../factory/botFactory';
import {k, width, defaultCover} from '../Global';
import {observer} from 'mobx-react/native';
import botStore from '../../store/botStore';
import locationStore from '../../store/locationStore';
import statem from '../../../gen/state';
import PhotoGrid from '../PhotoGrid';
import model from '../../model/model';
import {when} from 'mobx';
import BotNavBar from '../BotNavBar';
import Popover from 'react-native-popover';
import ScrollViewWithImages from '../ScrollViewWithImages';
import {colors} from '../../constants';

import EditButton from './EditButton';
import AddBot from './AddBot';
import UserInfoRow from './UserInfoRow';

const DOUBLE_PRESS_DELAY = 300;

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

  loadMoreImages = async () => {
    if (botStore.bot && botStore.bot.imagesCount && botStore.bot._images.length && botStore.bot.imagesCount > botStore.bot._images.length) {
      if (!this.loading) {
        this.loading = true;
        await botStore.loadImages(botStore.bot._images[botStore.bot._images.length - 1].item);
        this.loading = false;
      }
    }
  };

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

  unsubscribe = () => {
    Alert.alert(null, 'Are you sure you want to unsubscribe?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unsubscribe',
        style: 'destructive',
        onPress: () => botStore.unsubscribe(),
      },
    ]);
  };

  subscribe = () => {
    botStore.subscribe();
    // do animation
    this.setState({fadeAnim: new Animated.Value(1)});
    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {toValue: 0}).start();
    }, 500);
  };

  handleImagePress = (e: Object) => {
    const now = new Date().getTime();

    if (this.lastImagePress && now - this.lastImagePress < DOUBLE_PRESS_DELAY) {
      delete this.lastImagePress;
      this.handleImageDoublePress(e);
    } else {
      this.lastImagePress = now;
    }
  };

  handleImageDoublePress = () => {
    const bot = botStore.bot;
    if (!bot.isSubscribed) {
      this.subscribe();
    }
  };

  setPopOverVisible = (isVisible: boolean, buttonRect: Object) => {
    this.setState({isVisible, buttonRect});
  };

  render() {
    const {bot} = botStore;
    if (!bot) {
      console.warn('ERROR: No bot defined', this.props);
      return <Screen />;
    }
    if (!bot.owner) {
      console.warn('ERROR: NO BOT PROFILE!');
      return <Screen />;
    }
    const isOwn = !bot.owner || bot.owner.isOwn;

    return (
      <View style={styles.container}>
        <ScrollViewWithImages ref='scrollView' contentContainerStyle={{paddingTop: 70 * k}} style={{flex: 1}}>
          <View style={{height: width}}>
            <TouchableWithoutFeedback onPress={this.handleImagePress}>
              {bot.image && bot.image.source
                ? <Image style={{height: width}} resizeMode='cover' source={bot.image.source} />
                : <Image style={{height: width}} source={defaultCover[bot.coverColor % 4]} resizeMode='cover' />}
            </TouchableWithoutFeedback>
            <EditButton isOwn={isOwn} bot={bot} />
            <Animated.View pointerEvents='none' style={[{opacity: this.state.fadeAnim}, styles.botAddedContainer]}>
              <Image source={require('../../../images/iconBotAdded.png')} />
            </Animated.View>
          </View>
          {!isOwn && <AddBot subscribe={this.subscribe} unsubscribe={this.unsubscribe} isSubscribed={bot.isSubscribed} />}
          <UserInfoRow setPopOverVisible={this.setPopOverVisible} />
          {!!bot.description &&
            <View style={styles.descriptionContainer}>
              <Text numberOfLines={0} style={styles.descriptionText}>
                {bot.description}
              </Text>
            </View>}
          {!isOwn &&
            !bot.imagesCount &&
            <View style={styles.attachPhoto}>
              <Image source={require('../../../images/attachPhotoGray.png')} />
              <Text style={styles.noPhotosAdded}>
                No photos added
              </Text>
            </View>}
          <PhotoGrid
              isOwn={isOwn}
              images={bot.thumbnails}
              onAdd={statem.botDetails.addPhoto}
              onView={index => statem.botDetails.editPhotos({index})}
          />
          {this.state.showNoMoreImages &&
            <View style={styles.showNoMore}>
              <Image source={require('../../../images/graphicEndPhotos.png')} />
            </View>}
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
    backgroundColor: locationStore.isDay ? colors.WHITE : 'rgba(49,37,62,0.90)',
  },
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
});
