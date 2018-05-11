import React from 'react'
import {Marker} from 'react-native-maps'
import {observer} from 'mobx-react/native'
import {k} from '../Global'
import {View} from 'react-native'
import {colors} from '../../constants'
import {RText} from '../common'

type Props = {
  coordinate: any
  onPress: any
  pointCount: number
}

@observer
export default class BotMarker extends React.Component<Props> {
  mounted = false
  state = {tracking: true}

  componentDidMount() {
    this.mounted = true
    setTimeout(() => this.mounted && this.setState({tracking: false}), 1000)
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate(_0, previousState) {
    if (previousState.tracking && !this.state.tracking) {
      return
    }
    if (!previousState.tracking && this.state.tracking) {
      return
    }
    if (this.mounted && !this.state.tracking) {
      this.setState({tracking: true})
      setTimeout(() => this.mounted && this.setState({tracking: false}), 500)
    }
  }

  render() {
    const {coordinate, onPress, pointCount} = this.props
    return (
      <Marker coordinate={coordinate} onPress={onPress} tracksViewChanges={this.state.tracking}>
        <View
          style={{
            height: 40 * k,
            width: 40 * k,
            borderRadius: 8 * k,
            borderColor: colors.WHITE,
            backgroundColor: colors.PINK,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RText size={20} color={colors.WHITE}>
            {pointCount}
          </RText>
        </View>
      </Marker>
    )
  }
}
