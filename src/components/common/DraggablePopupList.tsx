import React, {ReactElement} from 'react'
import {View, FlatList, FlatListProps} from 'react-native'
import {width, height, k} from '../Global'
import {TouchThroughView} from 'react-native-touch-through-view'
import BottomPopup from '../BottomPopup'

interface IProps<T> extends FlatListProps<T> {
  headerInner?: ReactElement<any>
}

export default class DraggablePopupList extends React.Component<IProps<any>> {
  list: any

  render() {
    const {headerInner, style, ...listProps} = this.props
    return (
      <View style={{width, height}}>
        <FlatList
          ref={r => (this.list = r)}
          bounces={false}
          keyboardDismissMode="on-drag"
          {...listProps}
          style={[{flex: 1}, style]}
          ListHeaderComponent={<DraggablePopupListHeader inner={this.props.headerInner} />}
        />
      </View>
    )
  }

  scrollToEnd = () => this.list.scrollToEnd()

  scrollToOffset = ({offset, animated}) => this.list.scrollToOffset({offset, animated})
}

export const DraggablePopupListHeader = ({inner}) => (
  <View>
    <TouchThroughView style={{width, height: height / 2 - 30}} />
    <BottomPopup>
      <View
        style={{flex: 1, paddingHorizontal: 20 * k, backgroundColor: 'white', marginTop: 10 * k}}
      >
        {inner}
      </View>
    </BottomPopup>
  </View>
)
