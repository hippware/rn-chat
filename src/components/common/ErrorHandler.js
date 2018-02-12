// @flow

import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import {settings} from '../../globals';

import {Client, Configuration} from 'bugsnag-react-native';

const config = new Configuration();
config.notifyReleaseStages = ['testflight', 'production'];
const bsClient = new Client(config);

@inject('wocky')
@observer
class ErrorHandler extends React.Component<{}> {
  @observable error;
  @observable errorInfo;
  @observable report;

  componentDidCatch(error, errorInfo) {
    this.error = error;
    this.errorInfo = errorInfo;

    try {
      const {profile} = this.props.wocky;
      bsClient.setUser(profile.id, profile.displayName, profile.email);
    } catch (err) {
      // intentionally swallow these errors to prevent crashes before bugsnag sending
    }
    bsClient.notify(error, (report) => {
      // metadata gets discarded like in https://github.com/bugsnag/bugsnag-react-native/issues/132
      report.metadata = errorInfo;
    });

    // TODO: better way of handling errors in production?
    if (!settings.isStaging) {
      throw error;
    }
  }

  render() {
    return this.error && settings.isStaging ? (
      <View style={{flex: 1}}>
        <ScrollView style={{paddingTop: 40}}>
          <Text>Oops! there was an unexpected error. It has been reported to Bugsnag. Try killing and reloading the app.</Text>
          <Text style={{marginTop: 20}}>{this.error.toString()}</Text>
          <Text style={{marginTop: 20}}>{this.errorInfo.componentStack}</Text>
        </ScrollView>
      </View>
    ) : (
      this.props.children
    );
  }
}

export default ErrorHandler;
