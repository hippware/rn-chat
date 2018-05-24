// @flow

import PropTypes from 'prop-types'
import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight, ActivityIndicator} from 'react-native'

class ErrorButton extends React.Component {
  static defaultProps = {
    onErrorButtonPress: () => {},
    rowData: {},
    styles: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }

    this.onPress = this.onPress.bind(this)
  }

  componentWillMount() {
    Object.assign(styles, this.props.styles)
  }

  onPress() {
    this.setState({
      isLoading: true,
    })

    this.props.onErrorButtonPress(this.props.rowData)
  }

  render() {
    return this.state.isLoading ? (
      <View
        style={[
          styles.errorButtonContainer,
          {
            backgroundColor: 'transparent',
            borderRadius: 0,
          },
        ]}
      >
        <ActivityIndicator />
      </View>
    ) : (
      <View style={styles.errorButtonContainer}>
        <TouchableHighlight underlayColor="transparent" onPress={this.onPress}>
          <Text style={styles.errorButton}>↻</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

ErrorButton.propTypes = {
  styles: PropTypes.object,
  onErrorButtonPress: PropTypes.func,
  rowData: PropTypes.object,
}

export default ErrorButton

const styles = StyleSheet.create({
  errorButtonContainer: {
    marginLeft: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6eb',
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  errorButton: {
    fontSize: 22,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  name: {
    color: '#aaaaaa',
    fontSize: 12,
    marginLeft: 55,
    marginBottom: 5,
  },
  nameInsideBubble: {
    color: '#666666',
    marginLeft: 0,
  },
  imagePosition: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    marginLeft: 8,
    marginRight: 8,
  },
  image: {
    alignSelf: 'center',
    borderRadius: 15,
  },
  imageLeft: {},
  imageRight: {},
  spacer: {
    width: 10,
  },
  status: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'right',
    marginRight: 15,
    marginBottom: 10,
    marginTop: -5,
  },
})
