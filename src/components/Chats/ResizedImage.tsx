import React from 'react'
import {View, Image} from 'react-native'
import {observer} from 'mobx-react/native'

type Props = {
  image?: any
}
type State = {
  dwidth: number
}

@observer
export default class extends React.Component<Props, State> {
  state = {dwidth: 0}

  render() {
    return this.props.image ? (
      <View onLayout={({nativeEvent: {layout: {width}}}) => this.setState({dwidth: width})}>
        <Image
          style={{
            width: this.state.dwidth,
            height: this.props.image.height * this.state.dwidth / this.props.image.width,
          }}
          resizeMode="contain"
          source={this.props.image}
        />
      </View>
    ) : null
  }
}
