import React from 'react'
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
    Dimensions
}
    from 'react-native'

import autobind from 'autobind-decorator'
import { observer } from 'mobx-react/native'
import { observable, when } from 'mobx'
import statem from '../../gen/state'
import bot from '../store/botStore'
import Bot, { VISIBILITY_FRIENDS, VISIBILITY_OWNER, VIS } from '../model/Bot'
import SaveButton from './SaveButton'
import botFactory from '../factory/botFactory'
import botStore from '../store/botStore'
import { k } from './Global'
import NavTitle from './NavTitle'
import Screen from './Screen'
import Card from './Card'
import Cell from './Cell'
import model from '../model/model'
import location from '../store/locationStore'
import Separator from './Separator'
import notification from '../store/notificationStore'
import Notification from '../model/Notification'
import ShowNotification from './Notification'
import { Actions } from 'react-native-router-native'
import RadioButton from 'react-native-radio-button'
import RadioButtons from 'react-native-radio-buttons'

class OwnRadioButton extends React.Component {
    render () {
        return <RadioButton
            size={11.5}
            innerColor="rgb(254,92,108)"
            outerColor="rgb(155,155,155)"
            animation={'bounceIn'}
            isSelected={this.props.selected}
            onPress={this.props.onPress}
        />
    }
}
@autobind
@observer
export default class RadioButtonList extends React.Component {
    constructor (props) {
        super(props)
        let value = props.selectedOption
        if (props.values && props.selectedValue !== undefined) {
            value = props.options[props.values.indexOf(props.selectedValue)]
        }
        this.state = {selectedOption: value}
    }

    componentWillReceiveProps (props) {
        let value = props.selectedOption
        if (props.values && props.selectedValue !== undefined) {
            value = props.options[props.values.indexOf(props.selectedValue)]
        }
        this.setState({selectedOption: value})
    }

    render () {
        function setSelectedOption (selectedOption) {
            this.setState({
                selectedOption
            })
            let value = selectedOption
            if (this.props.values) {
                const index = this.props.options.indexOf(selectedOption)
                value = this.props.values[index]
            }
            this.props.onSelect(value, selectedOption)
        }

        function renderOption (option, selected, onSelect, index) {
            const style = {
                fontFamily: 'Roboto-Regular',
                fontSize: 15,
                color: selected ? (location.isDay ? 'rgb(63,50,77)' : 'white') : 'rgb(155,155,155)'
            }

            return (
                <View key={index}>
                    <Cell onPress={onSelect}>
                        <OwnRadioButton selected={selected} onPress={onSelect}/>
                        <View style={{paddingLeft: 10, paddingRight: 10, flex: 1}}>
                            <Text numberOfLines={1} style={style}>{option}</Text>
                        </View>
                    </Cell>
                    <Separator width={1} key={'sep' + index}/>
                </View>

            )
        }

        function renderContainer (optionNodes) {
            return <Card>{optionNodes}</Card>
        }

        return <RadioButtons
            options={ this.props.options }
            onSelection={ setSelectedOption.bind(this) }
            selectedOption={this.state.selectedOption }
            renderOption={ renderOption }
            renderContainer={ renderContainer }
        />

    }
}