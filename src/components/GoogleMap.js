// https://github.com/FaridSafi/react-native-google-places-autocomplete
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
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
      feedReady: false,
      selectedFilter: 'feed'
    };
    this.navigateToAddPlace = this.navigateToAddPlace.bind(this);
    this.loadMarkers = this.loadMarkers.bind(this);
    this.filterFriends = this.filterFriends.bind(this);
    this.filterExperts = this.filterExperts.bind(this);
    this.globalFilter = this.globalFilter.bind(this);
  }

  componentWillMount() {
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
    }).map((marker) => {
      return (<MapView.Marker
        key={marker.key}
        coordinate={marker.coordinate}
        title={marker.title}
      />);
    });
  }

  selectedFilterChange(val) {
    this.setState({
      selectedFilter: val
    });
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

    const startingPoints = this.state.markers.length > 0 ? this.loadMarkers() : null;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 32.784618,
            longitude: -79.940918,
            latitudeDelta: 0.0922 * 1.5,
            longitudeDelta: 0.0421 * 1.5,
          }}
          style={{ height: 350, margin: 2 }}
        >
          { startingPoints }
        </MapView>
        <View style={styles.publicPrivateContainer}>
          <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('feed')}>
            <Text style={this.state.selectedFilter == 'feed' ? styles.selectedFilter : styles.filters}>FEED</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('top')}>
            <Text style={this.state.selectedFilter == 'top' ? styles.selectedFilter : styles.filters}>TOP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => this.selectedFilterChange('filter')}>
            <Text style={this.state.selectedFilter == 'filter' ? styles.selectedFilterButton : styles.filterButtonText}>FILTER</Text>
          </TouchableOpacity>
        </View>
        {feedReady && <Feed feed={this.state.feed} />}

        <TouchableOpacity style={styles.addPlaceButton}>
          <Icon
            raised
            name='add'
            color='#FFF'
            containerStyle={{backgroundColor:'#4296CC'}}
            onPress={this.navigateToAddPlace}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addPlaceButton: {
    position: 'absolute',
    bottom: 10,
    right: 12
  },
  publicPrivateContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 45,
    borderBottomWidth: 0.4,
    borderBottomColor: '#8D8F90',
  },
  filters: {
    marginRight: 10,
    marginLeft: 25,
    alignSelf: 'center',
    color: '#8D8F90',
    paddingTop: 12
  },
  selectedFilter: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    paddingTop: 12,
    marginRight: 10,
    marginLeft: 25,
  },
  selectedFilterButton: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    marginLeft: 25,
  },
  filterButton: {
    alignSelf: 'center',
    position: 'absolute',
    right: 15,
    top: 12
  },
  filterButtonText: {
    color: '#8D8F90',
  }
});
