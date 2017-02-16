// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import { getUserPlaces, getFeed, getFriendFeed, getExpertFeed } from '../services/apiActions';
import Button from './Button';
import { Feed } from './Feed';

export class GoogleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      feed: null,
      feedReady: false
    };
    this.navigateToAddPlace = this.navigateToAddPlace.bind(this);
    this.loadMarkers = this.loadMarkers.bind(this);
    this.filterFriends = this.filterFriends.bind(this);
    this.filterExperts = this.filterExperts.bind(this);
    this.globalFilter = this.globalFilter.bind(this);
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

    this.globalFilter();
  }

  globalFilter() {
    this.setState({ feedReady: false });
    getFeed()
      .then((data) => {
        this.setState({
          feed: data || [],
          feedReady: true
        });
      })
      .catch((err) => console.error('NOO FEED', err));
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

  filterFriends() {
    this.setState({ feedReady: false });
    getFriendFeed()
      .then((data) => {
        this.setState({
          feed: data || [],
          feedReady: true
        });
      })
      .catch((err) => console.error('NOO FEED', err));
  }

  filterExperts() {
    this.setState({ feedReady: false });
    getExpertFeed()
      .then((data) => {
        this.setState({
          feed: data || [],
          feedReady: true
        });
      })
      .catch((err) => console.error('NOO FEED', err));
  }

  render() {
    const feedReady = this.state.feedReady;

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
          <Button onPress={this.filterFriends}>
            Friend Filter
          </Button>
          <Button onPress={this.filterExperts}>
            Expert Filter
          </Button>
          <Button onPress={this.globalFilter}>
            Global Filter
          </Button>
        </View>
        {feedReady && <Feed feed={this.state.feed} />}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#ddd',
  }
};
