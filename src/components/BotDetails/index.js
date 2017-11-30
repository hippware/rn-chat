// @flow

import React from 'react';
import {View, FlatList, TouchableOpacity, Clipboard, Image, StyleSheet} from 'react-native';
import {observable} from 'mobx';
import Popover from 'react-native-popover'; // eslint-disable-line
import {observer} from 'mobx-react/native';
import botFactory from '../../factory/botFactory';
import {k, width} from '../Global';
import botStore from '../../store/botStore';
import {colors} from '../../constants';
import Bot from '../../model/Bot';
import Profile from '../../model/Profile';
import BotPostCard from './BotPostCard';
import {RText, Spinner} from '../common';
import notificationStore from '../../store/notificationStore';
import AddBotPost from './AddBotPost';
import BotDetailsHeader from './BotDetailsHeader';
import {Actions} from 'react-native-router-flux';
import analyticsStore from '../../store/analyticsStore';

const SEPARATOR_HEIGHT = 20 * k;

type Props = {
  item: string,
  server: ?string,
  isNew: boolean,
  scale: number,
};

class BotDetails extends React.Component<Props> {
  loading: boolean;
  @observable bot: Bot;
  @observable owner: Profile;
  @observable numToRender: number = 8;
  list: any;
  post: any;

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
  }

  componentWillMount() {
    this.loadBot();
  }

  loadBot = async () => {
    const bot = botFactory.create({id: this.props.item, server: this.props.server});
    if (!bot) {
      // TODO: better UX for the case of a cached bot that has been deleted on the server?
      Actions.pop();
      return;
    }
    if (!this.props.isNew) {
      try {
        await botStore.download(bot);
      } catch (err) {
        // TODO: better UX for the case of a cached bot that has been deleted on the server?
        Actions.pop();
        return;
      }
    }
    this.bot = bot;
    analyticsStore.track('bot_view', {id: this.bot.id, title: this.bot.title});
  };

  _headerComponent = () => <BotDetailsHeader bot={this.bot} scale={this.props.scale} {...this.props} />;

  // workaround: we need footer to be shown to unhide last posts hidden by add post input box
  _footerComponent = () => <View style={{height: 60}} />;
  //    (this.bot.posts.length > 0 ? <ListFooter footerImage={require('../../../images/graphicEndPosts.png')} finished={this.bot.posts.length === this.bot.totalItems} /> : null);

  getData = () => (this.bot && this.props.scale > 0 ? this.bot.posts.filter(post => post.content || (post.image && post.image.loaded)) : []);

  scrollToEnd = () => {
    this.numToRender = this.getData().length;
    setTimeout(() => {
      this.list.scrollToEnd();
    }, 500);
  };

  componentWillReceiveProps(props: Props) {
    if (props.scale !== this.props.scale && this.list) {
      this.list.scrollToOffset({x: 0, y: 0, animated: false});
    }
  }

  renderItem = ({item}) => <BotPostCard item={item} bot={this.bot} />;

  renderSeparator = () => <View style={{height: SEPARATOR_HEIGHT, width, backgroundColor: colors.LIGHT_GREY}} />;

  renderEmpty = () => <Spinner style={{alignSelf: 'center', marginTop: 20 * k}} />;

  render() {
    const {bot} = this;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.getData()}
          ref={r => (this.list = r)}
          contentContainerStyle={{flexGrow: 1, paddingBottom: this.post ? this.post.imgContainerHeight : 0}}
          ListFooterComponent={this._footerComponent}
          initialNumToRender={this.numToRender}
          ListEmptyComponent={this.renderEmpty}
          ListHeaderComponent={this._headerComponent}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        {this.props.scale > 0 && <AddBotPost bot={bot} ref={a => (this.post = a)} scrollToEnd={this.scrollToEnd} />}
      </View>
    );
  }
}

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

export default observer(BotDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY,
  },
});
