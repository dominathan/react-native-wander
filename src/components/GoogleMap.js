// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import { getUserPlaces } from '../services/apiActions';
import Button from './Button';

export class GoogleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    this.navigateToAddPlace = this.navigateToAddPlace.bind(this);
    this.loadMarkers = this.loadMarkers.bind(this);
  }

  componentDidMount() {
    getUserPlaces()
      .then((data) => {
        this.setState({
          markers: data
        });
      })
      .then(this.loadMarkers)
      .catch((err) => console.log('fuck balls: ', err));
  }

  navigateToAddPlace() {
    Actions.googlePlaces();
  }

  loadMarkers() {
    return this.state.markers.map((place) => {
      return {
        key: place.id,
        coordinate: {
          latitude: place.lat,
          longitude: place.lng
        },
        title: place.name
      };
    }).map((marker) => <MapView.Marker key={marker.key} coordinate={marker.coordinate} title={marker.title} />);
  }

  render() {
    const startingPoints = this.state.markers ? this.loadMarkers() : null;
    return (
      <View style={{ justifyContent: 'space-between' }}>
        <MapView
          initialRegion={{
            latitude: 32.784618,
            longitude: -79.940918,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ height: 350, margin: 2 }}
        >
          { startingPoints }
        </MapView>
        <View style={styles.containerStyle}>
          <Button onPress={this.navigateToAddPlace}>
            Add Place
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};
