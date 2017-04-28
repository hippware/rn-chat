import React, {Component} from 'react';
import {View, InteractionManager, Image, StyleSheet, Text, ListView} from 'react-native';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import {k, width, height} from './Global';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

@observer
@autobind
export default class DataListView extends Component {
    static propTypes = {
        /**
         * Is all data loaded
         */
        finished: React.PropTypes.bool.isRequired,
        /**
         * Function to load more data
         */
        loadMore: React.PropTypes.any,
        /**
         * List of items to display
         */
        list: React.PropTypes.any.isRequired,
        /**
         * Footer image
         */
        footerImage: React.PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {pull: false};
    }

    onScrollEnd() {
        console.log('SCROLL END', this.state.pull);
        this.setState({pull: false});
    }

    onScrollStart() {
        console.log('SCROLL START', this.state.pull, this.downDirection);
        if (this.downDirection && this.props.finished && !this.state.pull) {
            this.setState({pull: true});
        }
    }

    scrollTo(params) {
        this.refs.list.scrollTo(params);
    }

    async onScroll(event) {
        const currentOffset = event.nativeEvent.contentOffset.y;
        if (currentOffset != this.contentOffsetY) {
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
                renderFooter={() => {
                    return this.state.pull && this.props.finished && this.props.footerImage
                        ? <View style={{paddingTop: 10, alignItems: 'center', paddingBottom: 21}}>
                              <Image source={this.props.footerImage} />
                          </View>
                        : null;
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
