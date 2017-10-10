// @flow

import React from 'react';
import {View, FlatList, Text, Animated, Image, StyleSheet} from 'react-native';
import {observable, toJS} from 'mobx';
import Popover from 'react-native-popover';
import {observer} from 'mobx-react/native';
import Screen from '../Screen';
import botFactory from '../../factory/botFactory';
import profileFactory from '../../factory/profileFactory';
import {k, width, height as screenHeight} from '../Global';
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

const SEPARATOR_HEIGHT = 20 * k;

// class BotDetails extends React.Component {
class BotDetails extends BotNavBarMixin(React.Component) {
  props: Props;
  loading: boolean;
  @observable bot: Bot;
  @observable owner: Profile;
  list: any;
  postHeights: Object = {};
  headerHeight: number = 0;
  listHeight: number = 0;

  constructor(props: Props) {
    super(props);
    this.loading = false;
    this.state = {
      fadeAnim: new Animated.Value(0),
      showNavBar: true,
      navBarHeight: new Animated.Value(70),
    };
  }

  _headerComponent = () => <BotDetailsHeader botId={this.bot && this.bot.id} flashPopover={this.flashPopover} onLayout={this.onHeaderLayout} />;

  _footerComponent = () =>
    (this.bot.posts.length > 0 ? <ListFooter footerImage={require('../../../images/graphicEndPosts.png')} finished={this.bot.posts.length === this.bot.totalItems} /> : null);

  componentWillMount() {
    this.loadBot();
  }

  loadBot = async () => {
    this.bot = botFactory.create({id: this.props.item});
    if (!this.props.isNew) {
      await botStore.load(this.bot);
    }
    this.owner = profileFactory.create(this.bot.owner.user);
  };

  flashPopover = (buttonRect?: Object) => {
    this.setState({isVisible: true, buttonRect});
    setTimeout(() => this.setState({isVisible: false, buttonRect: {}}), 2000);
  };
  renderEmpty = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 160}}>
        <Image source={require('../../../images/bigSmileBot.png')} />
        <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, letterSpacing: 0.3, color: colors.DARK_GREY}}>No posts yet</Text>
      </View>
    );
  };
  // loadMore = async () => {
  //   const bot = this.bot;
  //   if (bot.posts.length) {
  //     if (!this.loading) {
  //       this.loading = true;
  //       await botStore.loadPosts(bot.posts[bot.posts.length - 1].id, bot);
  //       this.loading = false;
  //     }
  //   }
  // };
  onPostLayout = (id: string, height: number): void => {
    // console.log('& opl', id, height);
    this.postHeights[id] = height;
  };

  onHeaderLayout = (height) => {
    // console.log('& header height', height);
    this.headerHeight = height;
  };

  getData = () => (this.bot ? this.bot.posts.filter(post => post.content || (post.image && post.image.loaded)) : []);

  scrollToEnd = () => {
    setTimeout(() => {
      // this.list.scrollToItem({item});
      const rowHeights = Object.values(this.postHeights).reduce((sum, value) => value + SEPARATOR_HEIGHT + sum, 0);
      // const posts = this.getData();
      // const lastPostId = posts[posts.length - 1].id;
      // const lastRowHeight = this.postHeights[lastPostId];
      const offset = this.headerHeight + rowHeights - this.listHeight;
      // console.log('& offset is ', offset);
      this.list.scrollToOffset({offset});
    }, 500);
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
          onLayout={({nativeEvent: {layout: {height}}}) => (this.listHeight = height)}
          style={{marginBottom: 50 * k}}
          data={this.getData()}
          ref={r => (this.list = r)}
          contentContainerStyle={{paddingBottom: this.post ? this.post.imgContainerHeight : 0}}
          // NOTE: below not necessary if we load all posts
          // onEndReachedThreshold={0.5}
          // onEndReached={this.loadMore}
          // ListFooterComponent={this._footerComponent}
          initialNumToRender={8}
          ListEmptyComponent={this.renderEmpty}
          ListHeaderComponent={this._headerComponent}
          ItemSeparatorComponent={() => <View style={{height: SEPARATOR_HEIGHT, width, backgroundColor: colors.LIGHT_GREY}} />}
          renderItem={({item}) => <BotPostCard item={item} bot={bot} onLayout={this.onPostLayout} />}
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
        <AddBotPost bot={bot} ref={a => (this.post = a)} scrollToEnd={this.scrollToEnd} />
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
