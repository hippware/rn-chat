// @flow

import React from 'react';
import {View, FlatList, Text, Animated, Alert, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import {observable} from 'mobx';
import Popover from 'react-native-popover';
import {observer} from 'mobx-react/native';
import Screen from '../Screen';
import botFactory from '../../factory/botFactory';
import {k, width, defaultCover} from '../Global';
import botStore from '../../store/botStore';
import locationStore from '../../store/locationStore';
import {colors} from '../../constants';
import EditButton from './EditButton';
import AddBot from './AddBot';
import UserInfoRow from './UserInfoRow';
import Bot from '../../model/Bot';
import BotNavBarMixin from '../BotNavBarMixin';
import BotPostCard from './BotPostCard';
import ListFooter from '../ListFooter';
import AddBotPost from './AddBotPost';

const DOUBLE_PRESS_DELAY = 300;

type Props = {
  item: string,
  isNew: boolean,
};

type State = {
  fadeAnim: any,
  showNavBar: true,
  navBarHeight: any,
  currentScreenWidth?: number,
  currentScreenHeight?: number,
  isVisible?: boolean,
  buttonRect?: Object,
};

class BotDetails extends BotNavBarMixin(React.Component) {
  props: Props;
  state: State;
  loading: boolean;
  lastImagePress: ?number;
  @observable bot: Bot;

  constructor(props: Props) {
    super(props);
    this.loading = false;
    this.state = {
      fadeAnim: new Animated.Value(0),
      showNavBar: true,
      navBarHeight: new Animated.Value(70),
    };
  }

  componentWillMount() {
    this.bot = botFactory.create({id: this.props.item});
    botStore.load(this.bot);
  }

  componentWillReceiveProps(props) {
    if (props.scrollToFirst && this.getList().length) {
      this.list.scrollToIndex({index: 0, viewPosition: 0.5});
    }
  }

  unsubscribe = () => {
    Alert.alert(null, 'Are you sure you want to unsubscribe?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unsubscribe',
        style: 'destructive',
        onPress: () => botStore.unsubscribe(this.bot),
      },
    ]);
  };

  subscribe = () => {
    botStore.subscribe(this.bot);
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
    const bot = this.bot;
    if (!bot.isSubscribed) {
      this.subscribe();
    }
  };

  setPopOverVisible = (isVisible: boolean, buttonRect: Object) => {
    this.setState({isVisible, buttonRect});
  };
  renderHeader = ({bot, isOwn}) => {
    return (<View style={{flex: 1}} onLayout={({nativeEvent}) => (this.headerHeight = nativeEvent.layout.height)}>
      <View style={{height: width, backgroundColor: 'white'}}>
        <TouchableWithoutFeedback onPress={this.handleImagePress}>
          {bot.image && bot.image.source
            ? <Image style={{height: width, width}} resizeMode='contain' source={bot.image.source} />
            : <Image style={{height: width, width}} source={defaultCover[bot.coverColor % 4]} resizeMode='contain' />}
        </TouchableWithoutFeedback>
        <EditButton isOwn={isOwn} bot={bot} />
        <Animated.View pointerEvents='none' style={[{opacity: this.state.fadeAnim}, styles.botAddedContainer]}>
          <Image source={require('../../../images/iconBotAdded.png')} />
        </Animated.View>
      </View>
      {!isOwn && <AddBot subscribe={this.subscribe} unsubscribe={this.unsubscribe} isSubscribed={bot.isSubscribed} />}
      <UserInfoRow setPopOverVisible={this.setPopOverVisible} bot={bot} />
      {!!bot.description &&
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={0} style={styles.descriptionText}>
          {bot.description}
        </Text>
      </View>}
      <View style={{height: 8.5, width}} />
      <View style={{height: 45, width, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
        <Image style={{marginLeft: 14, width: 14, height: 14}} source={require('../../../images/postsIcon.png')} />
        <Text style={{marginLeft: 7, fontFamily: 'Roboto-Regular', fontSize: 15, letterSpacing: 0.3, color: colors.DARK_PURPLE}}>Posts</Text>
        <Text style={{marginLeft: 7, fontFamily: 'Roboto-Regular', fontSize: 12, color: colors.DARK_GREY}}>{bot.totalItems}</Text>
      </View>
      <View style={{height: 1, width}} />
    </View>);
  };
  renderEmpty = () => {
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 160 }}>
      <Image source={require('../../../images/bigSmileBot.png')} />
      <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, letterSpacing: 0.3, color: colors.DARK_GREY}}>No posts yet</Text>
    </View>);
  };
  loadMore = async () => {
    const bot = this.bot;
    if (bot.posts.length) {
      if (!this.loading) {
        this.loading = true;
        await botStore.loadPosts(bot.posts[bot.posts.length - 1].id, bot);
        this.loading = false;
      }
    }
  };
  getList = () => (this.bot ? this.bot.posts.filter(post => post.content || (post.image && post.image.loaded)) : []);

  render() {
    const bot = this.bot;
    if (!bot || !bot.owner) {
      return <Screen />;
    }
    const isOwn = !bot.owner || bot.owner.isOwn;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.getList()}
          ref={r => (this.list = r)}
          // onRefresh=@TODO
          onEndReachedThreshold={1}
          onEndReached={this.loadMore}
          initialNumToRender={3}
          getItemLayout={(data, index) => ({length: 50, offset: this.headerHeight + 50 * index, index})}
          ListHeaderComponent={observer(() => this.renderHeader({bot, isOwn}))}
          ListEmptyComponent={this.renderEmpty}
          ListFooterComponent={observer(
            () => bot.posts.length > 0 && <ListFooter footerImage={require('../../../images/graphicEndPosts.png')} finished={bot.posts.length === bot.totalItems} />,
          )}
          ItemSeparatorComponent={() => <View style={{height: 20 * k, width, backgroundColor: colors.LIGHT_GREY}} />}
          renderItem={({item}) => <BotPostCard item={item} bot={bot} />}
          keyExtractor={item => item.id}
        />

        <Popover
          isVisible={this.state.isVisible}
          fromRect={this.state.buttonRect}
          contentStyle={{backgroundColor: colors.DARK_PURPLE}}
          placement='bottom'
          onClose={this.closePopover}
        >
          <Text style={styles.popoverText}>Address copied to clipboard</Text>
        </Popover>
        <AddBotPost bot={bot} />
      </View>
    );
  }
}

export default observer(BotDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY,
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
    backgroundColor: colors.WHITE,
  },
  descriptionText: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    color: locationStore.isDay ? colors.DARK_PURPLE : colors.WHITE,
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
