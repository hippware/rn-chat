import React from 'react';
import autobind from 'autobind-decorator';
import botStore from '../store/botStore';
import {observer} from 'mobx-react/native';
import {height} from './Global';
import {ScrollView, View, Image} from 'react-native';

@autobind
@observer
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async loadMoreImages() {
        if (botStore.bot && botStore.bot.imagesCount && botStore.bot._images.length && botStore.bot.imagesCount > botStore.bot._images.length) {
            if (!this.loading) {
                this.loading = true;
                await botStore.loadImages(botStore.bot._images[botStore.bot._images.length - 1].item);
                this.loading = false;
            }
        }
    }

    onScrollStart() {
        // display 'no more images'
        if (botStore.bot.imagesCount > 0 && botStore.bot.imagesCount === botStore.bot._images.length) {
            this.setState({showNoMoreImages: true});
        }
    }

    onScrollEnd() {
        this.setState({showNoMoreImages: false});
    }

    onScroll(event) {
        if (event.nativeEvent.contentOffset.y + height + 200 >= event.nativeEvent.contentSize.height) {
            this.loadMoreImages();
        }
    }
    render() {
        return (
            <ScrollView
                onScrollEndDrag={this.onScrollEnd}
                onScrollBeginDrag={this.onScrollStart}
                onScroll={this.onScroll}
                scrollEventThrottle={1}
                {...this.props}
            >
                {this.props.children}
                {this.state.showNoMoreImages &&
                    <View
                        style={{
                            paddingTop: 10,
                            alignItems: 'center',
                            paddingBottom: 21,
                        }}
                    >
                        <Image source={require('../../images/graphicEndPhotos.png')} />
                    </View>}
            </ScrollView>
        );
    }
}
