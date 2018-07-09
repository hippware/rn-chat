import React from 'react'
import {View, SectionList} from 'react-native'
import {k} from '../Global'
import {colors} from '../../constants'
import {observer} from 'mobx-react/native'
import {RText} from '../common'

type Props = {
  loadMore: any
  sections: any[]
  renderSectionHeader?: any
  renderItem: any
  ListHeaderComponent?: any
  ListFooterComponent?: any
}

@observer
class PeopleList extends React.Component<Props> {
  render() {
    const SL = SectionList as any
    return this.props.sections.length ? (
      <SL
        style={{backgroundColor: 'white'}}
        keyExtractor={item => item.id}
        SectionSeparatorComponent={() => (
          <View style={{height: k, backgroundColor: colors.WARM_GREY}} />
        )}
        ItemSeparatorComponent={() => (
          <View style={{height: k, marginLeft: 55 * k, backgroundColor: colors.WARM_GREY}} />
        )}
        stickySectionHeadersEnabled
        onEndReached={this.props.loadMore}
        onEndReachedThreshold={0.3}
        {...this.props}
      />
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <RText size={18} color={colors.PINKISH_GREY}>
          No Results Found
        </RText>
      </View>
    )
  }
}

export default PeopleList
