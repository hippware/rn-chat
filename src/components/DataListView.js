// @flow

import React, {Component} from 'react';
import {View, Image, StyleSheet, ListView} from 'react-native';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import {height} from './Global';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

type Props = {
    finished: boolean,
    loadMore: Function,
    list: any,
    footerImage: any,
    onScroll?: Function,
    style?: any
};

type State = {
    pull: boolean
};

@observer
@autobind
export default class DataListView extends Component {
    props: Props;
    state: State;

    loading: boolean;
    contentOffsetY: boolean;
    downDirection: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {pull: false};
    }

    onScrollEnd() {
        this.setState({pull: false});
    }

    onScrollStart() {
        if (this.downDirection && this.props.finished && !this.state.pull) {
            this.setState({pull: true});
        }
    }

    scrollTo(params: any) {
        this.refs.list.scrollTo(params);
    }

    async onScroll(event: Object) {
        const currentOffset = event.nativeEvent.contentOffset.y;
        if (currentOffset !== this.contentOffsetY) {
            this.downDirection = currentOffset < this.contentOffsetY;
            this.contentOffsetY = currentOffset;
        }
        if (
            this.props.loadMore &&
            !this.props.finished &&
            !this.loading &&
            this.contentOffsetY + height + 200 >= event.nativeEvent.contentSize.height
        ) {
            this.loading = true;
            await this.props.loadMore();
            this.loading = false;
        }
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    }

    renderFooter = () => {
        return this.state.pull && this.props.finished && this.props.footerImage
            ? <View style={{paddingTop: 10, alignItems: 'center', paddingBottom: 21}}>
                  <Image source={this.props.footerImage} />
              </View>
            : null;
    };

    render() {
        const dataSource = ds.cloneWithRows(this.props.list.map(x => x));
        return (
            <ListView
                ref='list'
                enableEmptySections
                scrollEventThrottle={1}
                {...this.props}
                style={[styles.container, this.props.style]}
                dataSource={dataSource}
                onScroll={this.onScroll}
                onScrollBeginDrag={this.onScrollStart}
                onScrollEndDrag={this.onScrollEnd}
                renderFooter={this.renderFooter}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
