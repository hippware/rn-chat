import React, {ReactElement} from 'react'
import {View, FlatList, FlatListProps, Animated} from 'react-native'
import {width, height, k} from '../Global'
import {TouchThroughView} from 'react-native-touch-through-view'
import BottomPopup from '../BottomPopup'
import {TouchThroughWrapper} from 'react-native-touch-through-view'
import {inject} from 'mobx-react'

interface IProps<T> extends FlatListProps<T> {
  headerInner?: ReactElement<any>
  isActive: boolean
  scrollY?: Animated.Value
}

// todo: hookify this (see commented example below) after we've migrated away from `inject`.
// This one is complicated because we need to use forwardRef + inject
// https://github.com/mobxjs/mobx-react/issues/717
// https://mobx-react.js.org/recipes-inject

@inject('scrollY')
export default class DraggablePopupList<T> extends React.Component<IProps<T>> {
  list: any

  render() {
    const {headerInner, style, isActive, ...listProps} = this.props
    const Wrapper = isActive ? TouchThroughWrapper : View
    return (
      <Wrapper style={{width, height}}>
        <FlatList
          ref={r => (this.list = r)}
          bounces={false}
          keyboardDismissMode="on-drag"
          {...listProps}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.props.scrollY!}}}])}
          scrollEventThrottle={60}
          style={[{flex: 1}, style]}
          ListHeaderComponent={<DraggablePopupListHeader {...this.props} />}
          showsVerticalScrollIndicator={false}
        />
      </Wrapper>
    )
  }

  scrollToIndex = (...args) => this.list.scrollToIndex(...args)

  scrollToOffset = ({offset, animated}) => this.list.scrollToOffset({offset, animated})
}

// // todo: how to properly type this?
// const DraggablePopupList = inject('scrollY')((props: IProps<any>, ref) => {
//   const list = useRef<FlatList<any>>(null)

//   useImperativeHandle(ref, () => ({
//     scrollToIndex: args => list.current!.scrollToIndex(args),
//     scrollToOffset: ({offset, animated}) => list.current!.scrollToOffset({offset, animated}),
//   }))

//   const {headerInner, style, isActive, ...listProps} = props
//   const Wrapper = isActive ? TouchThroughWrapper : View
//   return (
//     <Wrapper style={{width, height}}>
//       <FlatList
//         ref={list}
//         bounces={false}
//         keyboardDismissMode="on-drag"
//         {...listProps}
//         onScroll={Animated.event([{nativeEvent: {contentOffset: {y: props.scrollY!}}}])}
//         scrollEventThrottle={60}
//         style={[{flex: 1}, style]}
//         ListHeaderComponent={<DraggablePopupListHeader {...props} />}
//         showsVerticalScrollIndicator={false}
//       />
//     </Wrapper>
//   )
// })

// export default forwardRef(DraggablePopupList.wrappedComponent as any)

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
