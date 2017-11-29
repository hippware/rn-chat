// @flow

import React from 'react';
import {View, SectionList} from 'react-native';
import {k} from '../Global';
import {colors} from '../../constants';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {Spinner} from '../common';

type Props = {
  loadMore?: Function,
  sections: Object[],
  renderSectionHeader?: any,
  renderItem: Function,
};

@observer
class PeopleList extends React.Component<Props> {
  @observable loading: boolean = false;

  loadMorePeople = () => {
    if (!this.props.loadMore || this.loading) return;
    this.loading = true;
    this.props.loadMore().finally(() => (this.loading = false));
  };

  render() {
    return this.props.sections.length ? (
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
    ) : (
      <Spinner style={{alignSelf: 'center', marginTop: 100}} />
    );
  }
}

export default PeopleList;
