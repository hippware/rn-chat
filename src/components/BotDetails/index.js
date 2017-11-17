// @flow

import React from 'react';
import {View, FlatList, TouchableOpacity, Clipboard, Text, Animated, Image, StyleSheet} from 'react-native';
import {observable} from 'mobx';
import Popover from 'react-native-popover'; // eslint-disable-line
import {observer} from 'mobx-react/native';
import Screen from '../Screen';
import botFactory from '../../factory/botFactory';
import profileFactory from '../../factory/profileFactory';
import {k, width} from '../Global';
import botStore from '../../store/botStore';
import {colors} from '../../constants';
import Bot from '../../model/Bot';
import Profile from '../../model/Profile';
import BotPostCard from './BotPostCard';
import RText from '../common/RText';
import notificationStore from '../../store/notificationStore';
import AddBotPost from './AddBotPost';
import BotDetailsHeader from './BotDetailsHeader';
import {Actions} from 'react-native-router-flux';
import analyticsStore from '../../store/analyticsStore';

type Props = {
  item: string,
  server: ?string,
  isNew: boolean,
};

const SEPARATOR_HEIGHT = 20 * k;

const Header = observer(({bot, scale}) => {
  const map = scale === 0;
  return (
    <TouchableOpacity
      onLongPress={() => {
        Clipboard.setString(bot.address);
        notificationStore.flash('Address copied to clipboard 👍');
      }}
      // @TODO: need a way to call scrollToEnd on a ref in the mixin implementer
      onPress={() => scale === 0 && Actions.refresh({scale: 0.5})}
    >
      <RText
        numberOfLines={map ? 1 : 2}
        // must wait for solution to https://github.com/facebook/react-native/issues/14981
        // adjustsFontSizeToFit
        minimumFontScale={0.8}
        weight='Medium'
        size={18}
        color={colors.DARK_PURPLE}
        style={{
          textAlign: 'center',
        }}
      >
        {bot.title}
      </RText>
      {map && (
        <RText minimumFontScale={0.6} numberOfLines={1} weight='Light' size={14} color={colors.DARK_PURPLE} style={{textAlign: 'center'}}>
          {bot.address}
        </RText>
      )}
    </TouchableOpacity>
  );
});

class BotDetails extends React.Component {
  props: Props;
  loading: boolean;
  @observable bot: Bot;
  @observable owner: Profile;
  list: any;

  static renderTitle = ({item, server, scale}) => {
    const bot = observable(botFactory.create({id: item, server}));
    return <Header bot={bot} scale={scale} />;
  };

  static rightButton = ({item, server}) => {
    const bot = botFactory.create({id: item, server});
    if (!bot) return null;
    const isOwn = !bot.owner || bot.owner.isOwn;
    return isOwn || bot.isPublic ? (
      <TouchableOpacity onPress={() => Actions.botShareSelectFriends({botId: item})} style={{marginRight: 20 * k}}>
        <Image source={require('../../../images/shareIcon.png')} />
      </TouchableOpacity>
    ) : null;
  };

  constructor(props: Props) {
    super(props);
    this.loading = false;
    this.state = {
      numToRender: 8,
      fadeAnim: new Animated.Value(0),
      showNavBar: true,
      navBarHeight: new Animated.Value(70),
    };
  }

  componentWillMount() {
    this.loadBot();
  }

  loadBot = async () => {
    this.bot = botFactory.create({id: this.props.item, server: this.props.server});
    if (!this.bot) {
      // TODO: better UX for the case of a cached bot that has been deleted on the server?
      Actions.pop();
      return;
    }
    if (!this.props.isNew) {
      try {
        await botStore.download(this.bot);
      } catch (err) {
        // TODO: better UX for the case of a cached bot that has been deleted on the server?
        Actions.pop();
        return;
      }
    }
    analyticsStore.track('bot_view', {id: this.bot.id, title: this.bot.title});
  };

  _headerComponent = () => <BotDetailsHeader bot={this.bot} scale={this.props.scale} flashPopover={this.flashPopover} {...this.props} />;

  // workaround: we need footer to be shown to unhide last posts hidden by add post input box
  _footerComponent = () => <View style={{height: 60}} />;
  //    (this.bot.posts.length > 0 ? <ListFooter footerImage={require('../../../images/graphicEndPosts.png')} finished={this.bot.posts.length === this.bot.totalItems} /> : null);

  flashPopover = (buttonRect?: Object) => {
    this.setState({isVisible: true, buttonRect});
    setTimeout(() => this.setState({isVisible: false, buttonRect: {}}), 2000);
  };
  renderEmpty = () => {
    return (
      this.bot &&
      this.props.scale > 0 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 160}}>
          <Image source={require('../../../images/bigSmileBot.png')} />
          <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, letterSpacing: 0.3, color: colors.DARK_GREY}}>No posts yet</Text>
        </View>
      )
    );
  };

  getData = () => (this.bot && this.props.scale > 0 ? this.bot.posts.filter(post => post.content || (post.image && post.image.loaded)) : []);

  scrollToEnd = () => {
    this.setState({numToRender: this.getData().length});
    setTimeout(() => {
      this.list.scrollToEnd();
    }, 500);
  };

  componentWillReceiveProps(props: Props) {
    if (props.scale !== this.props.scale && this.list) {
      this.list.scrollToOffset({x: 0, y: 0, animated: false});
    }
    return true;
  }

  render() {
    // console.log('& ', this.props.item);
    const bot = this.bot;
    if (!bot || (!bot.title && bot.loading)) {
      return <Screen />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.getData()}
          ref={r => (this.list = r)}
          contentContainerStyle={{flexGrow: 1, paddingBottom: this.post ? this.post.imgContainerHeight : 0}}
          // NOTE: below not necessary if we load all posts
          // onEndReachedThreshold={0.5}
          // onEndReached={this.loadMore}
          ListFooterComponent={this._footerComponent}
          initialNumToRender={this.state.numToRender}
          ListEmptyComponent={this.renderEmpty}
          ListHeaderComponent={this._headerComponent}
          ItemSeparatorComponent={() => <View style={{height: SEPARATOR_HEIGHT, width, backgroundColor: colors.LIGHT_GREY}} />}
          renderItem={({item}) => <BotPostCard item={item} bot={bot} />}
          keyExtractor={item => item.id}
          // getItemLayout={(data, index) => {
          //   // console.log('& getItemLayout', index, data);
          //   return {
          //     offset: 1000,
          //     length: 20,
          //     index,
          //   };
          // }}
        />
        {this.props.scale > 0 && <AddBotPost bot={bot} ref={a => (this.post = a)} scrollToEnd={this.scrollToEnd} />}
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
