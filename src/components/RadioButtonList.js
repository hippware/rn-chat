import React from 'react';
import {
    View,
    Alert,
    TouchableWithoutFeedback,
    Slider,
    Image,
    StyleSheet,
    TextInput,
    ListView,
    InteractionManager,
    Animated,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';

import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import Card from './Card';
import Cell from './Cell';
import location from '../store/locationStore';
import Separator from './Separator';
import RadioButton from 'react-native-radio-button';
import RadioButtons from 'react-native-radio-buttons';
import {colors} from '../constants';

class OwnRadioButton extends React.Component {
    render() {
        return (
            <RadioButton
                size={11.5}
                innerColor='rgb(254,92,108)'
                outerColor=colors.DARK_GREY
                animation={'bounceIn'}
                isSelected={this.props.selected}
                onPress={this.props.onPress}
            />
        );
    }
}
@autobind
@observer
export default class RadioButtonList extends React.Component {
    constructor(props) {
        super(props);
        let value = props.selectedOption;
        if (props.values && props.selectedValue !== undefined) {
            value = props.options[props.values.indexOf(props.selectedValue)];
        }
        this.state = {selectedOption: value};
    }

    componentWillReceiveProps(props) {
        let value = props.selectedOption;
        if (props.values && props.selectedValue !== undefined) {
            value = props.options[props.values.indexOf(props.selectedValue)];
        }
        this.setState({selectedOption: value});
    }

    render() {
        function setSelectedOption(selectedOption) {
            this.setState({
                selectedOption,
            });
            let value = selectedOption;
            if (this.props.values) {
                const index = this.props.options.indexOf(selectedOption);
                value = this.props.values[index];
            }
            this.props.onSelect(value, selectedOption);
        }

        function renderOption(option, selected, onSelect, index) {
            const style = {
                fontFamily: 'Roboto-Regular',
                fontSize: 15,
                color: selected ? (location.isDay ? colors.DARK_PURPLE : 'white') : colors.DARK_GREY,
            };

            return (
                <View key={index}>
                    <Cell onPress={onSelect}>
                        <OwnRadioButton selected={selected} onPress={onSelect} />
                        <View style={{paddingLeft: 10, paddingRight: 10, flex: 1}}>
                            <Text numberOfLines={1} style={style}>{option}</Text>
                        </View>
                    </Cell>
                    <Separator width={1} key={'sep' + index} />
                </View>
            );
        }

        function renderContainer(optionNodes) {
            return <Card>{optionNodes}</Card>;
        }

        return (
            <RadioButtons
                options={this.props.options}
                onSelection={setSelectedOption.bind(this)}
                selectedOption={this.state.selectedOption}
                renderOption={renderOption}
                renderContainer={renderContainer}
            />
        );
    }
}
