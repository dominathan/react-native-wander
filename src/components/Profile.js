import React, { Component } from 'react';
import { ListView, View, Text, Image, ScrollView, StyleSheet } from 'react-native';

import { getUserPlaces } from '../services/apiActions';
import { Map } from './map/Map';

export class Profile extends Component {

  constructor(props) {
    super(props);
    console.log("I AM ME: ", props)
    this.state = {
      markers: []
    };
  }

  componentWillMount() {
    getUserPlaces()
      .then((data) => {
        this.setState({
          markers: data
        });
      })
      .catch((err) => console.log('fuck balls: ', err));
  }

  renderFeed() {

  }

  render() {
    const { markers} = this.state
    const { person } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map markers={markers} styles={styles.map}/>
        </View>
        <View style={styles.photoContainer}>
          <Image source={{ uri: person.photo_url }} style={styles.photo} />
        </View>
        <Text>{person.first_name}</Text>
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
    top: -55
  },
  photo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignSelf: 'center'
  }
});
