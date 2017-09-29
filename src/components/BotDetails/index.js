// @flow

import React from 'react';
import {View, FlatList, Text, Animated, Image, StyleSheet} from 'react-native';
import {observable, toJS} from 'mobx';
import Popover from 'react-native-popover';
import {observer} from 'mobx-react/native';
import Screen from '../Screen';
import botFactory from '../../factory/botFactory';
import {k, width} from '../Global';
import botStore from '../../store/botStore';
import {colors} from '../../constants';
import Bot from '../../model/Bot';
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
    // console.log('& cwm botdetails', this.props.item);
    this.bot = botFactory.create({id: this.props.item});
    if (!this.props.isNew) {
      botStore.load(this.bot);
    }
  }

  componentWillReceiveProps(props) {
    // disable scrolling temporary
    // setTimeout(() => {
    //   if (props.scrollToFirst && this.getList().length) {
    //     this.list.scrollToIndex({index: this.getList().length - 1, viewPosition: 0.5});
    //   }
    // });
  }

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
