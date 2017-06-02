// @flow

import React, {PureComponent} from 'react';
import {Text, StyleSheet} from 'react-native';
import {k} from './Global';
import Screen from './Screen';
import BotButton from './BotButton';
import Bots from './BotListView';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';
import NotificationComponent from './Notification';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import {colors} from '../constants';

type Props = {
    filter: string
};

@observer
export default class BotScreen extends PureComponent {
    props: Props;
    state = {
        index: 0,
        routes: [{key: 'all', title: 'All'}, {key: 'own', title: 'My Bots'}],
    };

    _handleChangeTab = index => this.setState({index});
    _renderHeader = props => (
        <TabBar
            style={{backgroundColor: 'white'}}
            tabStyle={{height: 54 * k}}
            renderLabel={({route}) => {
                const selected = this.state.routes[this.state.index].key === route.key;
                return <Text style={selected ? styles.selectedText : styles.text}>{route.title}</Text>;
            }}
            indicatorStyle={styles.indicator}
            {...props}
        />
    );
    _renderScene = props => <Bots key={props.route.key} filter={props.route.key} />;

    render() {
        return (
            <Screen isDay={location.isDay} style={{paddingTop: 70 * k}}>
                <TabViewAnimated
                    style={styles.absolute}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
                />
                <NotificationComponent style={{position: 'absolute', top: 0}} />
                <BotButton />
            </Screen>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: colors.DARK_GREY,
        fontFamily: 'Roboto-Regular',
        fontSize: 16 * k,
    },
    selectedText: {
        color: colors.DARK_PURPLE,
        fontFamily: 'Roboto-Medium',
        fontSize: 16 * k,
        letterSpacing: 0.5,
    },
    indicator: {
        backgroundColor: colors.PINK,
        position: 'absolute',
        left: 15 * k,
        bottom: 0,
        width: 155 * k,
        height: 3 * k,
    },
});
