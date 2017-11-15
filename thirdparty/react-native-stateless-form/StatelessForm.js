// @flow

// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


export default class StatelessForm extends Component {

  static defaultProps = {
    style: {},
  }

  componentDidMount() {
    this.willFocusInput = false
  }

  // childrenWithProps() {
  //   let nextInput = null
  //   let inputCount = 0
  //   return React.Children.map(this.props.children, (child) => child).reverse().map((child) => {
  //     console.log('& map', child)
  //     if (child.type.propTypes && child.type.propTypes.value && child.type.propTypes.valid) {
  //       inputCount++
  //       const input = React.cloneElement(child, {
  //         ref: `input${inputCount}`,
  //         nextInput: nextInput,
  //         onNextInputFocus: this.handleNextInputFocus.bind(this),
  //         onFocus: this.handleFocus.bind(this),
  //         onBlur: this.handleBlur.bind(this),
  //       })
  //       nextInput = input
  //       return input
  //     } else {
  //       return child
  //     }
  //   }).reverse()
  // }

  handleNextInputFocus(nextInput, currentInput) {
    console.log('& handle next input focus');
    if (nextInput) {
      const input = this.refs[nextInput.ref]
      this.willFocusInput = true
      // input.focus()
    } else {
      currentInput.blur()
    }
  }

  handleBlur() {
    // if (!this.willFocusInput) {
    //   this.scrollView.scrollTo({y: 0})
    // }
    // this.willFocusInput = false
  }

  handleFocus(scrollTo) {
    // this.willFocusInput = false
    // this.scrollView.scrollTo({y: scrollTo})
  }

  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='always'
        {...this.props}
        ref={r => this.scrollView = r}
        style={[{
          flex: 1,
          alignSelf: 'stretch',
        }, this.props.style]}
      >
        {/* {this.childrenWithProps()} */}
        {this.props.children}
        { Platform.OS === 'android' && <View style={{height: 500}} /> }
      </KeyboardAwareScrollView>
    );
  }
}

// StatelessForm.propTypes = {
//   style: PropTypes.oneOfType([
//     PropTypes.object,
//     PropTypes.arrayOf(PropTypes.object),
//   ]),
// }
