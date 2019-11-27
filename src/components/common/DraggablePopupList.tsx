import React, {ReactElement} from 'react'
import {View, FlatListProps, Animated} from 'react-native'
import {width, height, k} from '../Global'
import {TouchThroughView} from 'react-native-touch-through-view'
import BottomPopup from '../BottomPopup'
import {TouchThroughWrapper} from 'react-native-touch-through-view'
import {inject} from 'mobx-react'
import {FlatList} from 'react-native-gesture-handler'

interface IProps<T> extends FlatListProps<T> {
  headerInner?: ReactElement<any>
  isActive: boolean
  scrollY?: Animated.Value
  preview?: boolean
}

// todo: hookify this (see commented example below) after we've migrated away from `inject`.
// This one is complicated because we need to use forwardRef + inject
// https://github.com/mobxjs/mobx-react/issues/717
// https://mobx-react.js.org/recipes-inject

class DraggablePopupList<T> extends React.Component<IProps<T>> {
  list: any
  popupRef: any

  render() {
    const {headerInner, style, isActive, preview, ...listProps} = this.props

    // we have to switch this based on the active screen because of an Android-specific bug/feature in TouchThroughView
    const Wrapper = isActive ? TouchThroughWrapper : View
    const Filler = isActive ? TouchThroughView : View

    return (
      <Wrapper style={{width, height}}>
        <FlatList
          shouldActivateOnStart
          // disallowInterruption?: boolean;
          ref={r => (this.list = r)}
          bounces={false}
          keyboardDismissMode="on-drag"
          {...listProps}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.props.scrollY!}}}], {
            useNativeDriver: true,
          })} // send the scrollY state "up" so we can deal with it in SplitRenderer and NavBarHeader
          waitFor={this.popupRef}
          scrollEventThrottle={20}
          style={[{flex: 1}, style]}
          ListFooterComponent={() => <View style={{height: 20}} />}
          ListHeaderComponent={
            // This list header wrapper ensures that the user can "touch through" to the map behind the list
            <>
              <Filler
                style={{
                  width,
                  height: preview ? height - 170 : height / 2,
                }}
              />
              <BottomPopup
                preview={preview}
                flatlistRef={this.list}
                ref={r => (this.popupRef = r)}
                scrollY={this.props.scrollY}
              >
                <View
                  style={{
                    flex: preview ? 0 : 1,
                    paddingHorizontal: 20 * k,
                    backgroundColor: 'white',
                    marginTop: 10 * k,
                  }}
                >
                  {headerInner}
                </View>
              </BottomPopup>
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </Wrapper>
    )
  }

  scrollToIndex = (...args) => this.list.scrollToIndex(...args)

  scrollToOffset = ({offset, animated}) => this.list.scrollToOffset({offset, animated})
}

export default inject('scrollY')(DraggablePopupList)
