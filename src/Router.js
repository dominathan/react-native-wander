import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';

import GoogleMap from './components/GoogleMap';
import GooglePlaces from './components/GooglePlaces';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key="googleMap" component={GoogleMap} title="Google Map" />
          <Scene key="googlePlaces" component={GooglePlaces} title="Google Places" />
        </Scene>
      </Router>
    );
  }
}

export default RouterComponent;
