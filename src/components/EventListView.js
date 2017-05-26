import React, {Component} from 'react';
import {View} from 'react-native';
import {colors} from '../constants';
import {k} from './Global';
import {observer} from 'mobx-react/native';

import EventCard from './EventCard';
import model from '../model/model';
import location from '../store/locationStore';
import eventStore from '../store/eventStore';
import FilterTitle from './FilterTitle';
import DataListView from './DataListView';

import autobind from 'autobind-decorator';

@observer
@autobind
export default class EventList extends Component {
    constructor(props) {
        super(props);
        this.contentOffsetY = 0;
        this.state = {displayArea: {}, buttonRect: {}, isVisible: false};
    }

    scrollTo(data) {
        this.refs.list.scrollTo(data);
    }

    onLayout({nativeEvent}) {
        this.width = nativeEvent.layout.width;
        this.height = nativeEvent.layout.height;
    }

    render() {
        this.loading = false;
        const backgroundColor = location.isDay ? colors.backgroundColorDay : colors.backgroundColorNight;
        const list = model.events.list.map(x => x);
        return (
            <View style={{flex: 1, backgroundColor}}>
                <DataListView
                    onLayout={this.onLayout.bind(this)}
                    ref='list'
                    enableEmptySections
                    {...this.props}
                    style={{paddingTop: 70 * k}}
                    list={list}
                    finished={model.events.finished}
                    loadMore={eventStore.loadMore}
                    footerImage={require('../../images/graphicEndHome.png')}
                    renderRow={(row, i) => <EventCard key={i + row.event.id} item={row} />}
                />
                <FilterTitle
                    onPress={() => {
                        this.refs.list.scrollTo({x: 0, y: 0});
                    }}
                />
            </View>
        );
    }
}
