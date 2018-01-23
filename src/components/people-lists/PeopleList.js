// @flow

import React from 'react';
import {View, SectionList} from 'react-native';
import {k} from '../Global';
import {colors} from '../../constants';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {RText} from '../common';

type Props = {
  loadMore?: Function,
  sections: Object[],
  renderSectionHeader?: any,
  renderItem: Function,
};

@observer
class PeopleList extends React.Component<Props> {
  loadMorePeople = () => {
    this.props.loadMore();
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
        <RText size={18} color={colors.PINKISH_GREY}>
          No Results Found
        </RText>
      </View>
    );
  }
}

export default PeopleList;
