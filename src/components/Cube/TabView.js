/* @flow */

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import SceneView from './SceneView';
import withCachedChildNavigation from './withCachedChildNavigation';
import CubeView from './CubeView';

import type {
  NavigationScreenProp,
  NavigationRoute,
  NavigationAction,
  NavigationState,
  NavigationRouter,
  NavigationTabScreenOptions,
} from '../../TypeDefinition';

export type TabViewConfig = {
  tabBarComponent?: ReactClass<*>,
  tabBarPosition?: 'top' | 'bottom',
  tabBarOptions?: {},
  swipeEnabled?: boolean,
  animationEnabled?: boolean,
  lazy?: boolean,
};

export type TabScene = {
  route: NavigationRoute,
  focused: boolean,
  index: number,
  tintColor?: ?string,
};

type Props = {
  tabBarComponent?: ReactClass<*>,
  tabBarPosition?: 'top' | 'bottom',
  tabBarOptions?: {},
  swipeEnabled?: boolean,
  animationEnabled?: boolean,
  lazy?: boolean,

  screenProps?: {},
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  router: NavigationRouter<
    NavigationState,
    NavigationAction,
    NavigationTabScreenOptions
  >,
  childNavigationProps: {
    [key: string]: NavigationScreenProp<NavigationRoute, NavigationAction>,
  },
};

class TabView extends PureComponent<void, Props, void> {
  props: Props;

  _handlePageChanged = (index: number) => {
    const { navigation } = this.props;
    navigation.navigate(navigation.state.routes[index].routeName);
  };

  _renderScene = ({ route }: any) => {
    const { screenProps } = this.props;
    const childNavigation = this.props.childNavigationProps[route.key];
    const TabComponent = this.props.router.getComponentForRouteName(
      route.routeName
    );
    return (
        <SceneView
          screenProps={screenProps}
          component={TabComponent}
          navigation={childNavigation}
        />
    );
  };

  render() {
    const {
      router,
      tabBarComponent,
      tabBarPosition,
      animationEnabled,
      swipeEnabled,
      lazy,
      screenProps,
    } = this.props;

    const { state } = this.props.navigation;
    const options = router.getScreenOptions(
      this.props.childNavigationProps[state.routes[state.index].key],
      screenProps || {}
    );

    const props = {
      lazy,
      animationEnabled,
      swipeEnabled,
      renderScene: this._renderScene,
      onRequestChangeTab: this._handlePageChanged,
      navigationState: this.props.navigation.state,
      screenProps: this.props.screenProps,
      style: styles.container,
    };



    return <CubeView {...props} />;
  }
}

export default withCachedChildNavigation(TabView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  page: {
    flex: 1,
    borderWidth:2,
  },
});
