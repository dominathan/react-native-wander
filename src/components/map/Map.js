// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import MapView from 'react-native-maps';

import { getUserPlaces } from '../../services/apiActions';

export class Map extends Component {

  constructor(props) {
    super(props);
    console.log("PROPS", props)
    this.loadMarkers = this.loadMarkers.bind(this);
  }

  componentWillMount() {
  }

  loadMarkers() {
    return this.props.markers.map((place) => {
      return {
        key: place.id,
        coordinate: {
          latitude: place.lat,
          longitude: place.lng
        },
        title: place.name
      };
    }).map((marker) => {
      return (<MapView.Marker
        key={marker.key}
        coordinate={marker.coordinate}
        title={marker.title}
      />);
    });
  }

  render() {
    const startingPoints = this.props.markers.length > 0 ? this.loadMarkers() : null;
    const {mapRegion, gpsAccuracy} = this.props;
    return (
      <MapView.Animated
        style={{ height: 300, margin: 2, alignSelf: 'stretch' }}
        onRegionChange={this.props.onRegionChange}
        region={this.props.mapRegion}
      >
        { startingPoints }
      </MapView.Animated>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
