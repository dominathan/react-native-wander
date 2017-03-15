import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { getUserPlaces } from '../services/apiActions';
import { Map } from './map/Map';

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [],
      favorites: [],
      person: this.props.person || null
    };

  }

  componentWillMount() {
    this.userPlaces();
  }

  userPlaces() {
    getUserPlaces(this.state.person)
      .then((data) => {
        this.setState({
          markers: data.places,
          favorites: data.favorites
        });
      })
      .catch((err) => console.log('fuck balls: ', err));
  }

  renderFeed() {

  }

  render() {
    const { markers, person } = this.state;

    return (
       <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map markers={markers} styles={styles.map} />
        </View>
        { person && <View style={styles.photoContainer}>
          <Image source={{ uri: person.photo_url }} style={styles.photo} />
        </View> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  mapContainer: {
    flex: 1,
  },
  photoContainer: {
    flex: 1,
    position: 'relative',
    top: -70,
  },
  photo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#FFF'
  }
});
