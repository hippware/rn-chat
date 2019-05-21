import React, {ReactElement} from 'react'
import {View, FlatList, FlatListProps, Animated} from 'react-native'
import {width, height, k} from '../Global'
import {TouchThroughView} from 'react-native-touch-through-view'
import BottomPopup from '../BottomPopup'
import NavBarHeader, {NavConfig} from '../custom-navigators/NavBarHeader'
import {TouchThroughWrapper} from 'react-native-touch-through-view'

interface IProps<T> extends FlatListProps<T> {
  headerInner?: ReactElement<any>
  fadeNavConfig?: NavConfig
  isActive: boolean
}

export default class DraggablePopupList<T> extends React.Component<IProps<T>> {
  list: any
  scrollY = new Animated.Value(0)

  render() {
    const {headerInner, fadeNavConfig, style, isActive, ...listProps} = this.props
    const opacity = this.scrollY.interpolate({
      inputRange: [0, height / 2 - 80, height / 2],
      outputRange: [0, 0, 1],
    })
    const Wrapper = isActive ? TouchThroughWrapper : View
    return (
      <Wrapper style={{width, height}}>
        <FlatList
          ref={r => (this.list = r)}
          bounces={false}
          keyboardDismissMode="on-drag"
          ListFooterComponent={<View style={{backgroundColor: 'white', height: 250}} />}
          {...listProps}
          style={[{flex: 1}, style]}
          ListHeaderComponent={<DraggablePopupListHeader {...this.props} />}
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

  scrollToIndex = (...args) => this.list.scrollToIndex(...args)

  scrollToOffset = ({offset, animated}) => this.list.scrollToOffset({offset, animated})
}

/**
 * This list header wrapper ensures that the user can "touch through" to the map behind the list
 */
const DraggablePopupListHeader = ({headerInner, isActive}: IProps<any>) => {
  const Filler = isActive ? TouchThroughView : View
  return (
    <>
      <Filler style={{width, height: height / 2}} />
      <BottomPopup>
        <View
          style={{flex: 1, paddingHorizontal: 20 * k, backgroundColor: 'white', marginTop: 10 * k}}
        >
          {headerInner}
        </View>
      </BottomPopup>
    </>
  )
}
