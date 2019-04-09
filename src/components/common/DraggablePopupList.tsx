import React, {ReactElement} from 'react'
import {View, FlatList, FlatListProps, Animated} from 'react-native'
import {width, height, k} from '../Global'
import {TouchThroughView} from 'react-native-touch-through-view'
import BottomPopup from '../BottomPopup'
import NavBarHeader, {NavConfig} from '../custom-navigators/NavBarHeader'
import {TouchThroughWrapper} from 'react-native-touch-through-view'

interface IProps<T> extends FlatListProps<T> {
  headerInner?: ReactElement<any>
  // fadeNavHeader?: ReactElement<any>
  fadeNavConfig?: NavConfig
  offset?: number
}

export default class DraggablePopupList<T> extends React.Component<IProps<T>> {
  list: any
  scrollY = new Animated.Value(0)

  render() {
    const {headerInner, fadeNavConfig, style, offset, ...listProps} = this.props
    const opacity = this.scrollY.interpolate({
      inputRange: [0, height / 2 - 80, height / 2],
      outputRange: [0, 0, 1],
    })
    const Wrapper = offset ? View : TouchThroughWrapper
    return (
      <Wrapper style={{width, height}}>
        <FlatList
          ref={r => (this.list = r)}
          bounces={false}
          keyboardDismissMode="on-drag"
          ListFooterComponent={<View style={{backgroundColor: 'white', height: 250}} />}
          {...listProps}
          style={[{flex: 1}, style]}
          ListHeaderComponent={
            <DraggablePopupListHeader inner={this.props.headerInner} offset={offset} />
          }
          showsVerticalScrollIndicator={false}
        />
        {fadeNavConfig && (
          <Animated.View style={{opacity, position: 'absolute', top: 0, right: 0, left: 0}}>
            <NavBarHeader config={fadeNavConfig} />
          </Animated.View>
        )}
      </Wrapper>
    )
  }

  scrollToEnd = () => this.list.scrollToEnd()

  scrollToOffset = ({offset, animated}) => this.list.scrollToOffset({offset, animated})
}

/**
 * This list header wrapper ensures that the user can "touch through" to the map behind the list
 */
const DraggablePopupListHeader = ({inner, offset}) => (
  <View>
    {offset ? (
      <View style={{width, height: offset}} />
    ) : (
      <TouchThroughView style={{width, height: height / 2}} />
    )}
    <BottomPopup>
      <View
        style={{flex: 1, paddingHorizontal: 20 * k, backgroundColor: 'white', marginTop: 10 * k}}
      >
        {inner}
      </View>
    </BottomPopup>
  </View>
)
