// @flow

import React from 'react';
import {View, SectionList} from 'react-native';
import {k} from '../Global';
import {colors} from '../../constants';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';

type Props = {
  loadMore?: Function,
};

@observer
class PeopleList extends React.Component {
  props: Props;
  @observable loading: boolean = false;

  loadMorePeople = () => {
    if (!this.props.loadMore || this.loading) return;
    this.loading = true;
    this.props.loadMore().finally(() => (this.loading = false));
  };

  render() {
    return (
      <SectionList
        style={{backgroundColor: 'white'}}
        keyExtractor={item => item.user}
        SectionSeparatorComponent={() => <View style={{height: k, backgroundColor: colors.WARM_GREY}} />}
        ItemSeparatorComponent={() => <View style={{height: k, marginLeft: 55 * k, backgroundColor: colors.WARM_GREY}} />}
        stickySectionHeadersEnabled
        onEndReached={this.loadMorePeople}
        onEndReachedThreshold={0.3}
        {...this.props}
      />
    );
  }
}

export default PeopleList;
