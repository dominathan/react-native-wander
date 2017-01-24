// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GOOGLE_API_KEY from '../../config/google';

const charleston = { description: 'Home', geometry: { lat: 32.7765, lng: 79.9311 } };

export class GooglePlaces extends Component {
  render() {
    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
          }}
          query={{
           // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_API_KEY,
            language: 'en' // language of the results
          }}
          predefinedPlaces={[charleston]}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 65
  }
};
