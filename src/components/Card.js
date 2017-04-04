import React from 'react'
import { StyleSheet, TouchableOpacity, Animated, Image, View } from 'react-native'
import { k, backgroundColorCardDay, backgroundColorCardNight } from '../globals'
import { observer } from 'mobx-react/native'
import Cell from './Cell'
import autobind from 'autobind-decorator'
import location from '../store/locationStore'

@autobind
@observer
export default class Card extends React.Component {
    constructor (props) {
        super(props)
        this.state = {collapsed: this.props.collapsed, height: this.props.collapsedHeight}
    }

    expand () {
        this.setState({collapsed: false})
    }

    dismiss () {
        this.setState({collapsed: true})
    }

    componentWillReceiveProps (props) {
        if (props.collapsedHeight != this.props.collapsedHeight) {
            this.setState({collapsed: true, height: props.collapsedHeight})
        }
    }

    render () {
        const {style, children, ...props} = this.props
        const isDay = this.props.isDay === undefined ? location.isDay : this.props.isDay
        const backgroundColor = isDay ? backgroundColorCardDay : backgroundColorCardNight
        if (this.props.onPress) {
            return (
                <TouchableOpacity onPress={this.props.onPress}>
                    <View  {...this.props} style={[styles.container, this.props.style]}>
                        <View style={[styles.inner, {backgroundColor}, this.props.innerStyle]}>
                            {React.Children.map(this.props.children, child => child && props ? React.cloneElement(child, props) : child)}
                        </View>
                        {this.props.footer}
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <View  {...this.props} style={[styles.container, this.props.style]}>
                {this.state.collapsed && <View style={{height: this.state.height, overflow: 'hidden'}}>
                    <View style={[styles.inner, {backgroundColor}, this.props.innerStyle]}
                          onLayout={props => this.setState({totalHeight: props.nativeEvent.height})}>
                        {React.Children.map(children, child => child ? (props ? React.cloneElement(child, props) : child) : false)}
                    </View>
                </View>}

                {!this.state.collapsed && <View style={[styles.inner, {backgroundColor}, this.props.innerStyle]}
                                                onLayout={props => this.setState({totalHeight: props.nativeEvent.height})}>
                    {React.Children.map(children, child => child ? (props ? React.cloneElement(child, props) : child) : false)}
                </View>}

                {this.state.collapsed && <View style={{paddingTop: 4,}}><TouchableOpacity onPress={() => this.expand()}>
                    <View style={{alignItems: 'center'}}><Image
                        source={this.props.isDay ? require('../../images/group.png') : require('../../images/groupNight.png')}/></View>
                </TouchableOpacity></View>}

                {this.props.collapsed !== undefined && !this.state.collapsed &&
                <View style={{paddingTop: 4,}}><TouchableOpacity onPress={() => this.dismiss()}>
                    <View style={{alignItems: 'center'}}><Image
                        source={this.props.isDay ? require('../../images/dismiss.png') : require('../../images/dismissNight.png')}/></View>
                </TouchableOpacity></View>}
                {this.props.footer}
            </View>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 10,
    },
    inner: {
        borderColor: 'white',
        borderRadius: 2,
        shadowOffset: {height: 1, width: 0}, shadowRadius: 2, shadowOpacity: 0.12,

    }
})

Card.propTypes = {
    isDay: React.PropTypes.bool,
}
