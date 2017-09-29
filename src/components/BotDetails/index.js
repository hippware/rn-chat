// @flow

import React from 'react';
import {View, FlatList, Text, Animated, Image, StyleSheet} from 'react-native';
import {observable, toJS} from 'mobx';
import Popover from 'react-native-popover';
import {observer} from 'mobx-react/native';
import Screen from '../Screen';
import botFactory from '../../factory/botFactory';
import profileFactory from '../../factory/profileFactory';
import {k, width, defaultCover} from '../Global';
import botStore from '../../store/botStore';
import {colors} from '../../constants';
import Bot from '../../model/Bot';
import Profile from '../../model/Profile';
import BotPostCard from './BotPostCard';
import ListFooter from '../ListFooter';
import AddBotPost from './AddBotPost';
import BotNavBarMixin from '../BotNavBarMixin';
import BotDetailsHeader from './BotDetailsHeader';

type Props = {
  item: string,
  isNew: boolean,
};

// class BotDetails extends React.Component {
class BotDetails extends BotNavBarMixin(React.Component) {
  props: Props;
  loading: boolean;
  @observable bot: Bot;
  @observable owner: Profile;
  @observable reverse: boolean = false;
  list: any;

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
    this.loadBot();
    this._headerComponent = observer(() => this.renderHeader({bot: this.bot, owner: this.owner}));
  }

  loadBot = async () => {
    this.bot = botFactory.create({id: this.props.item});
    if (!this.props.isNew) {
      await botStore.load(this.bot);
    }
    this.owner = profileFactory.create(this.bot.owner.user);
  };

  componentWillReceiveProps(props) {
    // disable scrolling temporary
    // setTimeout(() => {
    //   if (props.scrollToFirst && this.getList().length) {
    //     this.list.scrollToIndex({index: this.getList().length - 1, viewPosition: 0.5});
    //   }
    // });
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
    if (!this.bot.isSubscribed) {
      this.subscribe();
    }
  };

  flashPopover = (buttonRect?: Object) => {
    this.setState({isVisible: true, buttonRect});
    setTimeout(() => this.setState({isVisible: false, buttonRect: {}}), 2000);
  };

  showPopover = () => {
    this.userInfo.measure()((ox, oy, w, h, px, py) => this.flashPopover({x: px, y: py, width: w, height: h}));
  };

  renderHeader = ({bot, owner}) => {
    const isOwn = !owner || owner.isOwn;
    return (
      <View style={{flex: 1}}>
        <View style={{height: width, backgroundColor: 'white'}}>
          <TouchableWithoutFeedback onPress={this.handleImagePress}>
            {bot.image && bot.image.source ? (
              <Image style={{height: width, width}} resizeMode='contain' source={bot.image.source} />
            ) : (
              <Image style={{height: width, width}} source={defaultCover[bot.coverColor % 4]} resizeMode='contain' />
            )}
          </TouchableWithoutFeedback>
          <Animated.View pointerEvents='none' style={[{opacity: this.state.fadeAnim}, styles.botAddedContainer]}>
            <Image source={require('../../../images/iconBotAdded.png')} />
          </Animated.View>
        </View>
        <BotButtons isOwn={isOwn} bot={bot} subscribe={this.subscribe} unsubscribe={this.unsubscribe} isSubscribed={bot.isSubscribed} afterCopy={this.showPopover} />
        <UserInfoRow flashPopover={this.flashPopover} bot={bot} owner={owner} ref={r => (this.userInfo = r)} />
        {!!bot.description && (
          <View style={styles.descriptionContainer}>
            <RText numberOfLines={0} size={16} weight='Light' color={locationStore.isDay ? colors.DARK_PURPLE : colors.WHITE}>
              {bot.description}
            </RText>
          </View>
        )}
        <View style={{height: 8.5, width}} />
        <View style={{height: 45, width, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
          <Image style={{marginLeft: 14, width: 14, height: 14}} source={require('../../../images/postsIcon.png')} />
          <RText size={15} color={colors.DARK_PURPLE} style={{marginLeft: 7, letterSpacing: 0.3}}>
            Posts
          </RText>

          <RText size={12} color={colors.DARK_GREY} style={{marginLeft: 7}}>
            {bot.totalItems}
          </RText>
        </View>
        <View style={{height: 1, width}} />
      </View>
    );
  };
  renderEmpty = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 160}}>
        <Image source={require('../../../images/bigSmileBot.png')} />
        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, letterSpacing: 0.3, color: colors.DARK_GREY}}>No posts yet</Text>
      </View>
    );
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

  render() {
    // console.log('& ', this.props.item);
    const bot = this.bot;
    if (!bot) {
      return <Screen />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.bot ? this.bot.posts.filter(post => post.content || (post.image && post.image.loaded)).reverse() : []}
          ref={r => (this.list = r)}
          contentContainerStyle={{paddingBottom: this.post ? this.post.imgContainerHeight : 0}}
          // onRefresh=@TODO
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMore}
          initialNumToRender={3}
          ListEmptyComponent={this.renderEmpty}
          ListHeaderComponent={() => <BotDetailsHeader botId={bot.id} flashPopover={this.flashPopover} />}
          ListFooterComponent={observer(
            () => this.bot.posts.length > 0 && <ListFooter footerImage={require('../../../images/graphicEndPosts.png')} finished={bot.posts.length === bot.totalItems} />,
          )}
          ItemSeparatorComponent={() => <View style={{height: 20 * k, width, backgroundColor: colors.LIGHT_GREY}} />}
          renderItem={({item}) => <BotPostCard item={item} bot={bot} />}
          keyExtractor={item => item.id}
        />
        <AddBotPost bot={bot} ref={a => (this.post = a)} />
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
});
