import React from 'react';
import {TextInput} from 'react-native';

export default class AutoExpandingTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: props.value || '', height: 0};
    }

    componentWillReceiveProps(props) {
        if (props.value !== undefined) {
            this.setState({text: props.value});
        }
        if (props.value === '') {
            this.setState({height: 0});
        }
    }

    render() {
        return (
            <TextInput
                {...this.props}
                multiline
                onChange={event => {
                    this.setState({
                        text: event.nativeEvent.text,
                        height: event.nativeEvent.contentSize.height,
                    });
                }}
                style={[this.props.style, {height: Math.max(this.props.height || 35, this.state.height)}]}
                value={this.state.text}
            />
        );
    }
}
