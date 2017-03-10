// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View } from 'react-native';

import GOOGLE_API_KEY from '../../config/google';
import { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete';
import { CommentBox } from './CommentBox';

const charleston = { description: 'Home', geometry: { lat: 32.7765, lng: 79.9311 } };

export class GooglePlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentAndPhotoBox: false,
      place: {}
    };
    this.handleAddPlace = this.handleAddPlace.bind(this);
  }

  handleAddPlace(place) {
    this.setState({
      place: place,
      showCommentAndPhotoBox: true,
    });
  }

  render() {
    const { showCommentAndPhotoBox, place } = this.state;

    return (
      <View style={styles.container}>
        {!showCommentAndPhotoBox && <GooglePlacesAutocomplete
          placeholder='Bar, Restaurant, Place of Interest'
          minLength={2}
          onPress={(data, details) => { // 'details' is provided when fetchDetails = true
            console.log('GOOGLE DATA', data);
            console.log('GOOGLE DETAILS', details);
          }}
          query={{
           // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_API_KEY,
            language: 'en' // language of the results
          }}
          predefinedPlaces={[charleston]}
          handleAddPlace={this.handleAddPlace}
        />}
        { showCommentAndPhotoBox && <CommentBox place={place} /> }
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 65,
    flex: 1,
  }
};
