// from https://github.com/react-community/react-native-maps/issues/889#issuecomment-300637902

jest.mock('react-native-maps', () => {
  const React = require.requireActual('react')
  const MapView = require.requireActual('react-native-maps')

  class MockCallout extends React.Component {
    render() {
      return React.createElement('Callout', this.props, this.props.children)
    }
  }

  class MockMarker extends React.Component {
    render() {
      return React.createElement('Marker', this.props, this.props.children)
    }
  }

  class MockCircle extends React.Component {
    render() {
      return React.createElement('Circle', this.props, this.props.children)
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement('MapView', this.props, this.props.children)
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes
  MockMarker.propTypes = MapView.Marker.propTypes
  MockMapView.propTypes = MapView.propTypes
  MockMapView.Marker = MockMarker
  MockMapView.MarkerAnimated = MockMarker
  MockMapView.Callout = MockCallout
  MockMapView.Circle = MockCircle
  return MockMapView
})
