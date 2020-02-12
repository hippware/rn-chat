import React, {Component} from 'react'
import {Text} from 'react-native'
import moment from 'moment'

type Props = {
  time: Date
  hideAgo?: boolean
}

export default class TimeAgo extends Component<Props> {
  state: {timer: null | number; text: string} = {timer: null, text: ''}

  static defaultProps = {
    hideAgo: false,
  }

  componentDidMount() {
    this.createTimer()
  }

  createTimer = () => {
    this.setState({
      // raise timer randomly to avoid typical texts 11s, 21s, etc.
      timer: setTimeout(() => {
        this.update()
      }, 7000 + Math.random() * 7000),
    })
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearTimeout(this.state.timer)
    }
  }

  update = () => {
    const {time, hideAgo} = this.props
    const text = moment(time).fromNow(hideAgo)
    // update state only if text is changed (to avoid frequent re-render)
    if (text !== this.state.text) {
      this.setState({text})
    }
    this.createTimer()
  }

  render() {
    return <Text {...this.props}>{this.state.text}</Text>
  }
}
