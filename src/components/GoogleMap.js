// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import MapView from 'react-native-maps';
// import GOOGLE_API_KEY from '../../config/google';

export class GoogleMap extends Component {
  render() {
    return (
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ height: 350, margin: 2 }}
      />
    );
  }
}
