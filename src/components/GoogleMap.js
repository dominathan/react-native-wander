// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
// import GOOGLE_API_KEY from '../../config/google';
import Button from './Button';

export class GoogleMap extends Component {

  constructor(props) {
    super(props);
    this.navigateToAddPlace = this.navigateToAddPlace.bind(this);
  }

  navigateToAddPlace() {
    Actions.googlePlaces();
  }

  render() {
    return (
      <View style={{ justifyContent: 'space-between' }}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ height: 350, margin: 2 }}
        />
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
